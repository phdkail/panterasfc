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
        const response = await fetch('http://localhost:3001/api/jugadores', {
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
    const matchesSearch = jugador.apodo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         jugador.chaleco.toString().includes(searchTerm);
    
    const matchesFilter = filter === 'todos' || 
                         (filter === 'porteros' && jugador.posicion.toLowerCase() === 'portero') ||
                         (filter === 'defensas' && jugador.posicion.toLowerCase() === 'defensa') ||
                         (filter === 'mediocentros' && jugador.posicion.toLowerCase() === 'mediocentro') ||
                         (filter === 'delanteros' && jugador.posicion.toLowerCase() === 'delantero');

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
              placeholder="Buscar por nombre o chaleco..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <option value="porteros">Porteros</option>
              <option value="defensas">Defensas</option>
              <option value="mediocentros">Mediocentros</option>
              <option value="delanteros">Delanteros</option>
            </select>
          </div>
        </div>

        <Grid container spacing={3}>
          {filteredJugadores.map((jugador) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={jugador.id}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="flex flex-col items-center">
                    <img
                      src={jugador.imagen}
                      alt={jugador.apodo}
                      className="w-32 h-32 rounded-full object-cover mb-4"
                      onError={(e) => {
                        e.target.src = '/assets/jugadores/default.png';
                      }}
                    />
                    <Typography variant="h6" component="h2" className="text-center">
                      {jugador.apodo}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      #{jugador.chaleco}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {jugador.posicion}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {jugador.pierna}
                    </Typography>
                    {jugador.equipoNacional && (
                      <Typography variant="body2" color="textSecondary">
                        {jugador.equipoNacional}
                      </Typography>
                    )}
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