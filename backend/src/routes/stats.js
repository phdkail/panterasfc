const express = require('express');
const router = express.Router();
const { readExcelStats } = require('../services/excelService');

router.get('/stats', async (req, res) => {
  try {
    const stats = await readExcelStats();
    res.json(stats);
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

module.exports = router; 