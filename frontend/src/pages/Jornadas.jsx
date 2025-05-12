import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert,
  Divider
} from '@mui/material';

const Jornadas = () => {
  const [jornadas, setJornadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJornadas = async () => {
      try {
        console.log('🔍 INICIANDO BÚSQUEDA DE JORNADAS...');
        const response = await fetch('/api/jornadas', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        console.log('📡 Estado de la respuesta:', response.status);
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📦 DATOS RECIBIDOS:', JSON.stringify(data, null, 2));
        
        if (!Array.isArray(data)) {
          throw new Error('Los datos recibidos no son un array');
        }
        
        setJornadas(data);
        setLoading(false);
      } catch (error) {
        console.error('❌ ERROR AL CARGAR JORNADAS:', error);
        setError(`Error al cargar las jornadas: ${error.message}`);
        setLoading(false);
      }
    };

    fetchJornadas();
  }, []);

  const getImagenesJornada = (numeroJornada) => {
    const imagenes = [];
    const prefijos = ['flyer', 'formacion', 'resultados', 'amarillo', 'azul', 'rosado', 'foto'];
    
    prefijos.forEach(prefijo => {
      const numero = numeroJornada >= 15 ? numeroJornada : 'xx';
      imagenes.push({
        nombre: `${numero}${prefijo}.png`,
        prefijo: prefijo
      });
    });

    return imagenes;
  };

  const getHoraCorrecta = (hora) => {
    // Convertir la hora a un formato consistente
    const horaNum = parseInt(hora.split(':')[0]);
    return horaNum >= 19 ? '20:00' : '19:00';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
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

  const jornadasPasadas = jornadas.filter(j => j.esPasada);
  const proximosPartidos = jornadas.filter(j => !j.esPasada);

  const renderJornadaCard = (jornada) => {
    const imagenes = getImagenesJornada(jornada.numero);

    return (
      <div key={jornada.id} className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="p-6">
          <Typography variant="h5" className="text-xl font-semibold mb-4">
            Jornada {jornada.numero}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Carousel
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                className="rounded-lg overflow-hidden"
              >
                {imagenes.map((imagen, index) => (
                  <div key={index} className="h-[400px]">
                    <img
                      src={`/assets/resultados/${imagen.nombre}`}
                      alt={`Jornada ${jornada.numero} - ${imagen.prefijo}`}
                      className="w-full h-full object-contain bg-gray-100"
                      onError={(e) => {
                        e.target.src = `/assets/resultados/xx${imagen.prefijo}.png`;
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                <span className="font-semibold">Fecha:</span> {jornada.fecha}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Hora:</span> {jornada.hora}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Lugar:</span> {jornada.lugar}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">MVP:</span> {jornada.mvp || 'Por definir'}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Goleador:</span> {jornada.goleador || 'Por definir'}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Dirección:</span> {jornada.direccion}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h4" className="text-3xl font-bold mb-8">
        Jornadas
      </Typography>

      {/* Sección de Partidos Pasados */}
      <div className="mb-12">
        <Typography variant="h5" className="text-2xl font-semibold mb-6">
          Partidos Pasados
        </Typography>
        {jornadasPasadas.length > 0 ? (
          jornadasPasadas.map(renderJornadaCard)
        ) : (
          <Typography variant="body1" className="text-gray-600">
            No hay partidos pasados disponibles
          </Typography>
        )}
      </div>

      <Divider sx={{ my: 4 }} />

      {/* Sección de Próximos Partidos */}
      <div>
        <Typography variant="h5" className="text-2xl font-semibold mb-6">
          Próximos Partidos
        </Typography>
        {proximosPartidos.length > 0 ? (
          proximosPartidos.map(renderJornadaCard)
        ) : (
          <Typography variant="body1" className="text-gray-600">
            No hay próximos partidos disponibles
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Jornadas; 