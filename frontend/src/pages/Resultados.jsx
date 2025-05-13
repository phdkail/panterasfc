import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { fetchWithErrorHandling } from '../lib/api';

const Resultados = () => {
  const [jornadas, setJornadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWithErrorHandling('/api/jornadas');
        // Filtrar solo las jornadas pasadas
        const jornadasPasadas = data.filter(j => j.esPasada);
        setJornadas(jornadasPasadas);
      } catch (err) {
        console.error('Error al cargar los resultados:', err);
        setError('Error al cargar los resultados. Por favor, intente nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchResultados();
  }, []);

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

  const getImagenesJornada = (numeroJornada) => {
    const imagenes = [];
    const prefijos = ['flyer', 'foto', 'formacion', 'resultados'];
    
    prefijos.forEach(prefijo => {
      const numero = numeroJornada >= 15 ? numeroJornada : 'xx';
      imagenes.push({
        nombre: `${numero}${prefijo}.png`,
        prefijo: prefijo
      });
    });

    return imagenes;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha por confirmar';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Fecha por confirmar';
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h4" className="text-3xl font-bold mb-8">
        Resultados
      </Typography>
      
      {jornadas.length === 0 ? (
        <Typography variant="body1" className="text-gray-600">
          No hay resultados disponibles
        </Typography>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {jornadas.map((jornada) => {
            const imagenes = getImagenesJornada(jornada.numero);
            return (
              <div key={jornada.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                      <p><span className="font-semibold">Fecha:</span> {formatDate(jornada.fecha)}</p>
                      <p><span className="font-semibold">Hora:</span> {jornada.hora}</p>
                      <p><span className="font-semibold">Lugar:</span> {jornada.lugar}</p>
                      <p><span className="font-semibold">MVP:</span> {jornada.mvp || 'No asignado'}</p>
                      <p><span className="font-semibold">Goleador:</span> {jornada.goleador || 'No asignado'}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Resultados; 