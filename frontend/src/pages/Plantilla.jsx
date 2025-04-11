import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import { Typography, Grid, Box, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

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
        const response = await fetch('http://localhost:8000/api/jugadores', {
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
                         (filter === 'goleadores' && jugador.golesAcumulados > 0) ||
                         (filter === 'asistentes' && jugador.asistenciasAcumuladas > 0);

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mb-4"></div>
          <p className="text-gray-600">Cargando datos de los jugadores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
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
              <option value="goleadores">Goleadores</option>
              <option value="asistentes">Asistentes</option>
            </select>
          </div>
        </div>

        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="porteros">Porteros</TabsTrigger>
            <TabsTrigger value="defensas">Defensas</TabsTrigger>
            <TabsTrigger value="mediocentros">Mediocentros</TabsTrigger>
            <TabsTrigger value="delanteros">Delanteros</TabsTrigger>
          </TabsList>

          <TabsContent value="todos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJugadores.map((jugador) => (
                <Card key={jugador.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={jugador.imagen} alt={jugador.apodo} />
                      <AvatarFallback>{jugador.apodo[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{jugador.apodo}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">#{jugador.chaleco}</Badge>
                        <Badge variant="secondary">{jugador.posicion}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pierna:</span>
                        <span>{jugador.pierna}</span>
                      </div>
                      {jugador.equipoNacional && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Selección:</span>
                          <span>{jugador.equipoNacional}</span>
                        </div>
                      )}
                      {jugador.equipoInternacional && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Club:</span>
                          <span>{jugador.equipoInternacional}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-200 my-2" />
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-sm text-muted-foreground">Partidos</div>
                          <div className="font-bold">{jugador.partidosAcumulados}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Goles</div>
                          <div className="font-bold">{jugador.golesAcumulados}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Asistencias</div>
                          <div className="font-bold">{jugador.asistenciasAcumuladas}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {['porteros', 'defensas', 'mediocentros', 'delanteros'].map((posicion) => (
            <TabsContent key={posicion} value={posicion}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJugadores
                  .filter(jugador => jugador.posicion.toLowerCase() === posicion)
                  .map((jugador) => (
                    <Card key={jugador.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={jugador.imagen} alt={jugador.apodo} />
                          <AvatarFallback>{jugador.apodo[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-xl">{jugador.apodo}</CardTitle>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">#{jugador.chaleco}</Badge>
                            <Badge variant="secondary">{jugador.posicion}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Pierna:</span>
                            <span>{jugador.pierna}</span>
                          </div>
                          {jugador.equipoNacional && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Selección:</span>
                              <span>{jugador.equipoNacional}</span>
                            </div>
                          )}
                          {jugador.equipoInternacional && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Club:</span>
                              <span>{jugador.equipoInternacional}</span>
                            </div>
                          )}
                          <div className="border-t border-gray-200 my-2" />
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <div className="text-sm text-muted-foreground">Partidos</div>
                              <div className="font-bold">{jugador.partidosAcumulados}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Goles</div>
                              <div className="font-bold">{jugador.golesAcumulados}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Asistencias</div>
                              <div className="font-bold">{jugador.asistenciasAcumuladas}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {filteredJugadores.length === 0 && (
          <div className="text-center py-12">
            <p className={cn(
              "text-gray-500 dark:text-gray-400 text-lg"
            )}>
              No se encontraron jugadores que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plantilla; 