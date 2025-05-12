import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box, CircularProgress, Alert } from '@mui/material';
import { Search, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

const Plantilla = () => {
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('todos');

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        console.log('Intentando conectar con el backend...');
        const response = await fetch('/api/jugadores', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        console.log('Respuesta recibida:', response.status);
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Datos recibidos:', data);
        setJugadores(data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError(`Error al cargar los datos: ${err.message}`);
        setLoading(false);
      }
    };

    fetchJugadores();
  }, []);

  const filteredJugadores = jugadores.filter(jugador => {
    // Manejo seguro de búsqueda
    const searchTermLower = searchTerm.toLowerCase();
    const apodo = jugador.apodo?.toLowerCase() || '';
    const chaleco = jugador.chaleco?.toString().toLowerCase() || '';
    const posicion = jugador.posicion?.toLowerCase() || '';
    const pierna = jugador.pierna?.toLowerCase() || '';
    const equipoNacional = jugador.equipoNacional?.toLowerCase() || '';
    const equipoInternacional = jugador.equipoInternacional?.toLowerCase() || '';
    
    const matchesSearch = apodo.includes(searchTermLower) || 
                         chaleco.includes(searchTermLower) ||
                         posicion.includes(searchTermLower) ||
                         pierna.includes(searchTermLower) ||
                         equipoNacional.includes(searchTermLower) ||
                         equipoInternacional.includes(searchTermLower);
    
    // Manejo seguro de filtro por posición
    const matchesFilter = filter === 'todos' || 
                         (filter === 'Porteros' && posicion.includes('portero')) ||
                         (filter === 'Defensas' && posicion.includes('defensa')) ||
                         (filter === 'Mediocampistas' && posicion.includes('mediocampista')) ||
                         (filter === 'Delanteros' && posicion.includes('delantero'));

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <div className={cn(
      "min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className={cn(
            "text-4xl font-bold text-gray-900 dark:text-white mb-4"
          )}>
            Nuestra Plantilla
          </h1>
          <p className={cn(
            "text-lg text-gray-600 dark:text-gray-400"
          )}>
            Conoce a los talentosos jugadores que forman parte de Panteras FC
          </p>
        </div>

        {/* Filtros y búsqueda */}
        <div className={cn(
          "mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center"
        )}>
          <div className="relative w-full sm:w-96">
            <div className={cn(
              "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            )}>
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className={cn(
                "block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600",
                "rounded-md leading-5 bg-white dark:bg-gray-800",
                "placeholder-gray-500 dark:placeholder-gray-400",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                "sm:text-sm"
              )}
              placeholder="Buscar por nombre, número, posición, pierna o equipo..."
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className={cn(
                "block w-full pl-3 pr-10 py-2 text-base",
                "border border-gray-300 dark:border-gray-600",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                "sm:text-sm rounded-md bg-white dark:bg-gray-800"
              )}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="Porteros">Porteros</option>
              <option value="Defensas">Defensas</option>
              <option value="Mediocampistas">Mediocampistas</option>
              <option value="Delanteros">Delanteros</option>
            </select>
          </div>
        </div>

        <Grid container spacing={4} className="justify-center">
          {filteredJugadores.map((jugador) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={jugador.id} className="flex justify-center">
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-[300px] h-[500px] flex flex-col">
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex flex-col items-center space-y-4 h-full">
                    <div className="flex-shrink-0">
                      <img
                        src={jugador.imagen}
                        alt={jugador.apodo}
                        className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                        onError={(e) => {
                          e.target.src = '/assets/jugadores/default.png';
                        }}
                      />
                    </div>
                    <Typography variant="h5" component="h2" className="text-center font-bold text-gray-800 dark:text-white">
                      {jugador.apodo || '--'}
                    </Typography>
                    <div className="w-full space-y-2 flex-grow flex flex-col justify-center">
                      <Typography className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">• N° Camiseta: </span> {jugador.chaleco.replace('N° Camiseta: ', '') || '--'}
                      </Typography>
                      <Typography className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">• Posición: </span> {jugador.posicion.replace('Posición: ', '') || '--'}
                      </Typography>
                      <Typography className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">• Pierna Dominante: </span> {jugador.pierna.replace('Pierna Dominante: ', '') || '--'}
                      </Typography>
                      <Typography className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">• Equipo Nacional: </span> {jugador.equipoNacional.replace('Equipo Nacional: ', '') || '--'}
                      </Typography>
                      <Typography className="text-gray-700 dark:text-gray-300">
                        <span className="font-bold">• Equipo Internacional: </span> {jugador.equipoInternacional.replace('Equipo Internacional: ', '') || '--'}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredJugadores.length === 0 && (
          <Box textAlign="center" py={4}>
            <Typography variant="body1" color="textSecondary">
              No se encontraron jugadores que coincidan con tu búsqueda.
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
};

export default Plantilla; 