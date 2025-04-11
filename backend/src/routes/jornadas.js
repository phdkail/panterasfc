const express = require('express');
const router = express.Router();
const excelService = require('../services/excelService');

router.get('/', async (req, res) => {
  try {
    console.log('Solicitud recibida para obtener jornadas');
    const jornadas = await excelService.readExcelJornadas();
    console.log('Jornadas obtenidas:', jornadas);
    res.json(jornadas);
  } catch (error) {
    console.error('Error al obtener jornadas:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 