const express = require('express');
const router = express.Router();
const { readExcelStats, readExcelJornadas, readExcelJugadores } = require('../services/excelService');

// Ruta para obtener estadísticas
router.get('/stats', async (req, res) => {
  try {
    console.log('Solicitud recibida para obtener estadísticas');
    const stats = await readExcelStats();
    console.log(`Enviando ${stats.length} estadísticas`);
    res.json(stats);
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas' });
  }
});

// Ruta para obtener jornadas
router.get('/jornadas', async (req, res) => {
  try {
    console.log('Solicitud recibida para obtener jornadas');
    const jornadas = await readExcelJornadas();
    console.log(`Enviando ${jornadas.length} jornadas`);
    res.json(jornadas);
  } catch (error) {
    console.error('Error al obtener jornadas:', error);
    res.status(500).json({ error: 'Error al obtener las jornadas' });
  }
});

// Ruta para obtener jugadores
router.get('/jugadores', async (req, res) => {
  try {
    console.log('Solicitud recibida para obtener jugadores');
    const jugadores = await readExcelJugadores();
    console.log(`Enviando ${jugadores.length} jugadores`);
    res.json(jugadores);
  } catch (error) {
    console.error('Error al obtener jugadores:', error);
    res.status(500).json({ error: 'Error al obtener los jugadores' });
  }
});

module.exports = router; 