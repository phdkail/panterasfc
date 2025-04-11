import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box, CircularProgress, Alert } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configurar el ícono del marcador
const icon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Coordenadas de Arena 7
const ARENA7_COORDS = [19.4326, -99.1332]; // Reemplazar con las coordenadas reales

const Jornadas = () => {
  const [jornadas, setJornadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJornadas = async () => {
      try {
        console.log('Iniciando carga de jornadas...');
        const response = await fetch('http://localhost:3001/api/jornadas');
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log('Jornadas recibidas:', data);
        setJornadas(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar jornadas:', error);
        setError('Error al cargar las jornadas. Por favor, intente nuevamente.');
        setLoading(false);
      }
    };

    fetchJornadas();
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
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Próximos Partidos
      </Typography>
      <Grid container spacing={2}>
        {jornadas.map((jornada) => (
          <Grid item xs={12} md={6} key={jornada.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Jornada {jornada.numero}
                </Typography>
                <Typography variant="body1">
                  Fecha: {jornada.fecha}
                </Typography>
                <Typography variant="body1">
                  Hora: {jornada.hora}
                </Typography>
                <Typography variant="body1">
                  Lugar: {jornada.lugar}
                </Typography>
                <Typography variant="body1">
                  {jornada.local} vs {jornada.visitante}
                </Typography>
                {jornada.lugar === 'Arena 7' && (
                  <Box mt={2} height="200px">
                    <MapContainer
                      center={[19.4326, -99.1332]}
                      zoom={15}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[19.4326, -99.1332]}>
                        <Popup>Arena 7</Popup>
                      </Marker>
                    </MapContainer>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Jornadas; 