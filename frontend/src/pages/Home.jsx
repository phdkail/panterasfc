import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Card, CardContent, Typography, Grid, Box, CircularProgress, Alert, Tooltip } from '@mui/material';
import { Trophy, Users, Calendar, BarChart2, ArrowRight, Star, TrendingUp, Award, Target } from 'lucide-react';

const Home = () => {
  const [jornadas, setJornadas] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jugadoresDestacadosPorMedia, setJugadoresDestacadosPorMedia] = useState([]);
  const [jugadoresDestacadosPorMVPs, setJugadoresDestacadosPorMVPs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        
        // Fetch jornadas, stats y jugadores con manejo de errores individual
        const fetchWithErrorHandling = async (endpoint) => {
          const response = await fetch(`${API_BASE_URL}${endpoint}`);
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          const data = await response.json();
          if (!data || (Array.isArray(data) && data.length === 0)) {
            console.warn(`No se encontraron datos en ${endpoint}`);
            return [];
          }
          return data;
        };

        const [jornadasData, statsData, jugadoresData] = await Promise.allSettled([
          fetchWithErrorHandling('/api/jornadas'),
          fetchWithErrorHandling('/api/stats'),
          fetchWithErrorHandling('/api/jugadores')
        ]);

        // Manejar resultados de las promesas
        setJornadas(jornadasData.status === 'fulfilled' ? jornadasData.value : []);
        setStats(statsData.status === 'fulfilled' ? statsData.value : []);
        setJugadores(jugadoresData.status === 'fulfilled' ? jugadoresData.value : []);

        // Verificar si tenemos datos suficientes
        if (jornadasData.status === 'rejected' || statsData.status === 'rejected' || jugadoresData.status === 'rejected') {
          console.warn('Algunas llamadas a la API fallaron:', {
            jornadas: jornadasData.status,
            stats: statsData.status,
            jugadores: jugadoresData.status
          });
        }

        // Procesar datos solo si tenemos stats
        if (statsData.status === 'fulfilled' && statsData.value.length > 0) {
          const jugadoresPorMedia = [...statsData.value]
            .filter(stat => stat.media > 0)
            .sort((a, b) => b.media - a.media)
            .slice(0, 4)
            .map(stat => ({
              numeroChaleco: stat.nombre,
              apodo: stat.chaleco,
              media: stat.media,
              mvps: stat.mvps || 0,
              posicion: stat.posicion || 'Sin posición'
            }));

          const jugadoresPorMVPs = [...statsData.value]
            .filter(stat => stat.mvps >= 0)
            .sort((a, b) => b.mvps - a.mvps)
            .slice(0, 4)
            .map(stat => ({
              numeroChaleco: stat.nombre,
              apodo: stat.chaleco,
              media: stat.media,
              mvps: stat.mvps || 0,
              posicion: stat.posicion || 'Sin posición'
            }));

          setJugadoresDestacadosPorMedia(jugadoresPorMedia);
          setJugadoresDestacadosPorMVPs(jugadoresPorMVPs);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError('Error al cargar los datos. Por favor, intente nuevamente más tarde.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Funciones de utilidad para estadísticas
  const getTop5Stats = (statKey, label) => {
    return stats
      .sort((a, b) => b[statKey] - a[statKey])
      .slice(0, 5)
      .map((stat, index) => ({
        chaleco: stat.chaleco,
        valor: stat[statKey],
        label,
        rank: index + 1
      }));
  };

  const getPlantillaStats = () => {
    // Inicializamos el contador
    const stats = {
      zurdos: 0,
      diestros: 0,
      posiciones: {
        'Portero': 0,
        'Defensa': 0,
        'Mediocampista': 0,
        'Delantero': 0
      }
    };

    // Contamos cada jugador
    jugadores.forEach(jugador => {
      // Extraer el valor de la pierna dominante (eliminar el prefijo "Pierna Dominante: ")
      const pierna = jugador.pierna.replace('Pierna Dominante: ', '').trim();
      
      // Conteo por pierna dominante
      if (pierna === 'Zurdo') {
        stats.zurdos++;
      } else if (pierna === 'Diestro') {
        stats.diestros++;
      }

      // Extraer la posición (eliminar el prefijo "Posición: ")
      const posicion = jugador.posicion.replace('Posición: ', '').trim();
      
      // Conteo por posición
      if (stats.posiciones.hasOwnProperty(posicion)) {
        stats.posiciones[posicion]++;
      }
    });

    // Verificamos que tengamos datos
    console.log('Estadísticas de plantilla:', stats);
    console.log('Total jugadores:', jugadores.length);
    console.log('Jugadores zurdos:', jugadores.filter(j => j.pierna.replace('Pierna Dominante: ', '').trim() === 'Zurdo').length);
    console.log('Jugadores diestros:', jugadores.filter(j => j.pierna.replace('Pierna Dominante: ', '').trim() === 'Diestro').length);

    return stats;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha por confirmar';
    // Si la fecha es específicamente para la jornada 33
    if (dateString === '14/05/2025') return '14 de mayo de 2025';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Fecha por confirmar';
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const proximosPartidos = jornadas.filter(j => !j.esPasada).slice(0, 3);
  const ultimosResultados = jornadas.filter(j => j.esPasada).slice(0, 3);
  const plantillaStats = getPlantillaStats();

  // Obtener top 5 en diferentes categorías
  const topGoleadores = getTop5Stats('golesAcumulados', 'goles');
  const topAsistencias = getTop5Stats('asistenciasAcumuladas', 'asistencias');
  const topMVPs = getTop5Stats('mvps', 'MVPs');
  const topPartidos = getTop5Stats('partidosAcumulados', 'partidos');
  const topMedia = getTop5Stats('media', 'puntos');

  // Log para verificar los datos que tenemos
  console.log('Jugadores destacados por media:', jugadoresDestacadosPorMedia);
  console.log('Jugadores destacados por MVPs:', jugadoresDestacadosPorMVPs);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Bienvenido a Panteras FC</h1>
            <p className="text-xl mb-8">La garra felina que domina la cancha 🐾🔥</p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/jornadas"
                className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Ver Próximos Partidos
              </Link>
              <Link
                to="/plantilla"
                className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Conoce Nuestra Plantilla
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Próximos Partidos */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold flex items-center">
              <Calendar className="mr-2" />
              Próximos Partidos
            </h2>
            <Link to="/jornadas" className="text-primary hover:text-primary-dark flex items-center transition-all duration-300 hover:scale-105">
              Ver todos <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proximosPartidos.map((jornada) => (
              <Card 
                key={jornada.id} 
                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent>
                  <Typography variant="h6" className="font-bold mb-2">
                    Jornada {jornada.numero}
                  </Typography>
                  <div className="space-y-2">
                    <p><span className="font-semibold">Fecha:</span> {formatDate(jornada.fecha)}</p>
                    <p><span className="font-semibold">Hora:</span> {jornada.hora}</p>
                    <p><span className="font-semibold">Lugar:</span> {jornada.lugar}</p>
                    <p><span className="font-semibold">Dirección:</span> {jornada.direccion}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Estadísticas Destacadas */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold flex items-center">
              <BarChart2 className="mr-2" />
              Estadísticas Destacadas
            </h2>
            <Link to="/estadisticas" className="text-primary hover:text-primary-dark flex items-center transition-all duration-300 hover:scale-105">
              Ver todas <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
          
          {/* Top 5 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Goleadores', icon: Target, data: getTop5Stats('golesAcumulados', 'goles'), color: 'bg-primary' },
              { title: 'Asistencias', icon: TrendingUp, data: getTop5Stats('asistenciasAcumuladas', 'asistencias'), color: 'bg-secondary' },
              { title: 'MVPs', icon: Star, data: getTop5Stats('mvps', 'MVPs'), color: 'bg-accent' },
              { title: 'Más Partidos', icon: Calendar, data: getTop5Stats('partidosAcumulados', 'partidos'), color: 'bg-gray-800' },
              { title: 'Mejor Media', icon: Award, data: getTop5Stats('media', 'puntos'), color: 'bg-green-600' }
            ].map((category, idx) => (
              <Card key={idx} className={`${category.color} text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <category.icon className="mr-2" />
                    <Typography variant="h6">{category.title}</Typography>
                  </div>
                  <div className="space-y-2">
                    {category.data.map((stat, index) => (
                      <div key={stat.chaleco} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
                            {index + 1}
                          </span>
                          <span>{stat.chaleco}</span>
                        </div>
                        <span className="font-bold">{stat.valor} {stat.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Estadísticas de Plantilla */}
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent>
              <Typography variant="h6" className="font-bold mb-4 flex items-center">
                <Users className="mr-2" />
                Información de la Plantilla
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pierna Dominante */}
                <div>
                  <Typography variant="subtitle1" className="font-semibold mb-4">Pierna Dominante</Typography>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                      <Typography variant="h4" className="font-bold text-primary mb-1">
                        {jugadores.filter(j => j.pierna?.includes('Zurdo')).length}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Zurdos
                      </Typography>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                      <Typography variant="h4" className="font-bold text-primary mb-1">
                        {jugadores.filter(j => j.pierna?.includes('Diestro')).length}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Diestros
                      </Typography>
                    </div>
                  </div>
                </div>

                {/* Posiciones */}
                <div>
                  <Typography variant="subtitle1" className="font-semibold mb-4">Posiciones</Typography>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries({
                      'Portero': jugadores.filter(j => j.posicion?.includes('Portero')).length,
                      'Defensa': jugadores.filter(j => j.posicion?.includes('Defensa')).length,
                      'Mediocampista': jugadores.filter(j => j.posicion?.includes('Mediocampista')).length,
                      'Delantero': jugadores.filter(j => j.posicion?.includes('Delantero')).length
                    }).map(([pos, count]) => (
                      <div key={pos} className="bg-gray-100 rounded-lg p-4 text-center">
                        <Typography variant="h4" className="font-bold text-primary mb-1">
                          {count}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          {pos}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Plantilla Destacada */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold flex items-center">
              <Users className="mr-2" />
              Jugadores Destacados
            </h2>
            <Link to="/plantilla" className="text-primary hover:text-primary-dark flex items-center transition-all duration-300 hover:scale-105">
              Ver plantilla completa <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>

          {/* Jugadores por Media */}
          <div className="mb-12">
            <Typography variant="h6" className="font-semibold mb-4 flex items-center text-primary">
              <Award className="mr-2" />
              Mejor Media
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {jugadoresDestacadosPorMedia.map((jugador) => (
                <Card 
                  key={jugador.numeroChaleco} 
                  className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
                >
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <Tooltip title={`${jugador.apodo} - N° Camiseta: ${jugador.numeroChaleco}`}>
                        <div className="relative">
                          <img
                            src={`/assets/jugadores/${jugador.numeroChaleco}.png`}
                            alt={`${jugador.apodo} - N° ${jugador.numeroChaleco}`}
                            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary hover:border-accent transition-colors duration-300"
                            onError={(e) => {
                              e.target.src = '/assets/jugadores/default.png';
                            }}
                          />
                          <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                            {Number(jugador.media).toFixed(1)}
                          </div>
                        </div>
                      </Tooltip>
                      <Typography variant="h6" className="font-bold text-center">
                        {jugador.apodo}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 text-center mb-2">
                        N° Camiseta: {jugador.numeroChaleco}
                      </Typography>
                      <div className="grid grid-cols-2 gap-4 text-center w-full mt-2">
                        <Tooltip title="Media">
                          <div className="bg-gray-100 rounded-lg p-2">
                            <Typography variant="caption" className="block text-gray-500">Media</Typography>
                            <Typography variant="body2" className="font-bold text-primary">
                              {Number(jugador.media).toFixed(2)}
                            </Typography>
                          </div>
                        </Tooltip>
                        <Tooltip title="MVPs">
                          <div className="bg-gray-100 rounded-lg p-2">
                            <Typography variant="caption" className="block text-gray-500">MVPs</Typography>
                            <Typography variant="body2" className="font-bold text-accent">
                              {jugador.mvps || "0"}
                            </Typography>
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Jugadores por MVPs */}
          <div>
            <Typography variant="h6" className="font-semibold mb-4 flex items-center text-accent">
              <Star className="mr-2" />
              Más MVPs
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {jugadoresDestacadosPorMVPs.map((jugador) => (
                <Card 
                  key={jugador.numeroChaleco} 
                  className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
                >
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <Tooltip title={`${jugador.apodo} - N° Camiseta: ${jugador.numeroChaleco}`}>
                        <div className="relative">
                          <img
                            src={`/assets/jugadores/${jugador.numeroChaleco}.png`}
                            alt={`${jugador.apodo} - N° ${jugador.numeroChaleco}`}
                            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-accent hover:border-primary transition-colors duration-300"
                            onError={(e) => {
                              e.target.src = '/assets/jugadores/default.png';
                            }}
                          />
                          <div className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                            {jugador.mvps || "0"}
                          </div>
                        </div>
                      </Tooltip>
                      <Typography variant="h6" className="font-bold text-center">
                        {jugador.apodo}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 text-center mb-2">
                        N° Camiseta: {jugador.numeroChaleco}
                      </Typography>
                      <div className="grid grid-cols-2 gap-4 text-center w-full mt-2">
                        <Tooltip title="MVPs">
                          <div className="bg-gray-100 rounded-lg p-2">
                            <Typography variant="caption" className="block text-gray-500">MVPs</Typography>
                            <Typography variant="body2" className="font-bold text-accent">
                              {jugador.mvps || "0"}
                            </Typography>
                          </div>
                        </Tooltip>
                        <Tooltip title="Media">
                          <div className="bg-gray-100 rounded-lg p-2">
                            <Typography variant="caption" className="block text-gray-500">Media</Typography>
                            <Typography variant="body2" className="font-bold text-primary">
                              {Number(jugador.media).toFixed(2)}
                            </Typography>
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Últimos Resultados */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold flex items-center">
              <Trophy className="mr-2" />
              Últimos Resultados
            </h2>
            <Link to="/resultados" className="text-primary hover:text-primary-dark flex items-center transition-all duration-300 hover:scale-105">
              Ver todos los resultados <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ultimosResultados.map((jornada) => (
              <Card 
                key={jornada.id} 
                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent>
                  <Typography variant="h6" className="font-bold mb-2">
                    Jornada {jornada.numero}
                  </Typography>
                  <div className="space-y-2">
                    <p><span className="font-semibold">Fecha:</span> {formatDate(jornada.fecha)}</p>
                    <p><span className="font-semibold">MVP:</span> {jornada.mvp}</p>
                    <p><span className="font-semibold">Goleador:</span> {jornada.goleador}</p>
                    <div className="mt-4 h-64">
                      <Carousel
                        showArrows={true}
                        showThumbs={false}
                        infiniteLoop={true}
                        autoPlay={true}
                        interval={5000}
                        className="rounded-lg overflow-hidden h-full"
                      >
                        {['flyer', 'foto', 'formacion', 'resultados'].map((tipo) => (
                          <div key={tipo} className="h-full">
                            <img
                              src={`/assets/resultados/${jornada.numero >= 15 ? jornada.numero : 'xx'}${tipo}.png`}
                              alt={`Jornada ${jornada.numero} - ${tipo}`}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.src = `/assets/resultados/xx${tipo}.png`;
                              }}
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 