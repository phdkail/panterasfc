const express = require('express');
const cors = require('cors');
const path = require('path');
const { getJornadas, getStats, getJugadores } = require('./services/excelService');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://panterasfc.vercel.app', 'https://www.panterasfc.vercel.app']
    : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.get('/api/jornadas', async (req, res) => {
  try {
    const jornadas = await getJornadas();
    res.json(jornadas);
  } catch (error) {
    console.error('Error al obtener jornadas:', error);
    res.status(500).json({ error: 'Error al obtener las jornadas' });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas' });
  }
});

app.get('/api/jugadores', async (req, res) => {
  try {
    const jugadores = await getJugadores();
    res.json(jugadores);
  } catch (error) {
    console.error('Error al obtener jugadores:', error);
    res.status(500).json({ error: 'Error al obtener los jugadores' });
  }
});

// Servir archivos estáticos en producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
}

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

// Iniciar servidor solo si no estamos en Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
  });
}

// Exportar para Vercel
module.exports = app; 