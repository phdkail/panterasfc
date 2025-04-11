const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

// Función para obtener el valor de la celda, considerando fórmulas
const getCellValue = (cell) => {
  try {
    if (!cell) {
      return null;
    }
    
    // Intentar obtener el resultado de la fórmula
    if (cell.formula) {
      return cell.result;
    }
    
    // Si es un objeto con resultado, usamos ese
    if (typeof cell.value === 'object' && cell.value !== null && 'result' in cell.value) {
      return cell.value.result;
    }
    
    // Si es un valor directo, lo usamos
    return cell.value;
  } catch (error) {
    console.error('Error al leer el valor de la celda:', error);
    return null;
  }
};

async function readExcelStats() {
  try {
    console.log('\n=== INICIO DE LECTURA DE ESTADÍSTICAS ===');
    console.log('Hoja de trabajo: Estadisticas');
    console.log('Columnas a leer:');
    console.log('- Columna C: Chaleco');
    console.log('- Columna D: Nombre');
    console.log('- Columna E: Partidos Acumulados');
    console.log('- Columna F: Goles Acumulados');
    console.log('- Columna G: Asistencias Acumuladas');
    console.log('- Columna H: TTA');
    console.log('- Columna I: TTR');
    console.log('- Columna J: MVPs');
    console.log('- Columna L: Media');

    const filePath = path.resolve(__dirname, '../../data/PanterasFC.xlsx');
    console.log('\nRuta absoluta del archivo:', filePath);

    // Verificar que el archivo existe y es accesible
    if (!fs.existsSync(filePath)) {
      throw new Error(`El archivo no existe en la ruta: ${filePath}`);
    }
    
    try {
      fs.accessSync(filePath, fs.constants.R_OK);
      console.log('El archivo es accesible para lectura');
    } catch (err) {
      throw new Error(`No se tienen permisos de lectura para el archivo: ${filePath}`);
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    console.log('Archivo Excel leído correctamente');

    // Listar todas las hojas disponibles
    const hojas = workbook.worksheets.map(ws => ws.name);
    console.log('\nHojas disponibles:', hojas);

    const worksheet = workbook.getWorksheet('Estadisticas');
    if (!worksheet) {
      throw new Error('No se encontró la hoja "Estadisticas" en el archivo Excel');
    }
    console.log('Hoja "Estadisticas" encontrada');

    // Imprimir los encabezados para verificar
    const headers = worksheet.getRow(1).values;
    console.log('\nEncabezados de la hoja Estadisticas:', headers);

    const jugadores = [];
    let rowCount = 0;

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Saltar la fila de encabezados
        rowCount++;
        try {
          const nombre = getCellValue(row.getCell('D'));
          const chaleco = getCellValue(row.getCell('C'));
          
          // Solo procesar filas que tengan nombre y chaleco válidos
          if (nombre && chaleco) {
            const jugador = {
              orden: getCellValue(row.getCell('A')) || 0,
              nombre: String(nombre), // Aseguramos que sea string
              chaleco: String(chaleco), // Aseguramos que sea string
              partidosAcumulados: Number(getCellValue(row.getCell('E')) || 0),
              golesAcumulados: Number(getCellValue(row.getCell('F')) || 0),
              asistenciasAcumuladas: Number(getCellValue(row.getCell('G')) || 0),
              tta: Number(getCellValue(row.getCell('H')) || 0),
              ttr: Number(getCellValue(row.getCell('I')) || 0),
              mvps: Number(getCellValue(row.getCell('J')) || 0),
              media: Number(getCellValue(row.getCell('L')) || 0)
            };
            
            jugadores.push(jugador);
            // Imprimir los primeros 10 jugadores para verificar
            if (rowCount <= 10) {
              console.log(`\nJugador ${rowCount}:`, jugador);
            }
          }
        } catch (error) {
          console.error(`Error al procesar la fila ${rowNumber}:`, error);
        }
      }
    });

    console.log('\n=== RESUMEN FINAL ===');
    console.log(`Se procesaron ${rowCount} filas`);
    console.log(`Se encontraron ${jugadores.length} jugadores con estadísticas`);
    if (jugadores.length > 0) {
      console.log('\nPrimer jugador de ejemplo:', jugadores[0]);
    }

    return jugadores;
  } catch (error) {
    console.error('\n=== ERROR DETALLADO ===');
    console.error('Error al leer las estadísticas del Excel:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    throw error;
  }
}

const readExcelJornadas = async () => {
  try {
    console.log('Intentando leer el archivo Excel para jornadas...');
    const filePath = path.join(__dirname, '../../data/PanterasFC.xlsx');
    console.log('Ruta absoluta del archivo:', filePath);

    // Verificar que el archivo existe y es accesible
    fs.accessSync(filePath, fs.constants.R_OK);
    console.log('El archivo es accesible para lectura');

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    
    console.log('Archivo Excel leído exitosamente');
    const worksheet = workbook.getWorksheet('Jornadas');
    
    if (!worksheet) {
      throw new Error('No se encontró la hoja "Jornadas" en el archivo Excel');
    }

    console.log('Hoja "Jornadas" encontrada');
    const jornadas = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Saltar encabezados
      
      try {
        const jornada = {
          id: rowNumber,
          numero: getCellValue(row.getCell('A')),
          fecha: getCellValue(row.getCell('B')),
          hora: getCellValue(row.getCell('C')),
          lugar: getCellValue(row.getCell('D')),
          local: getCellValue(row.getCell('E')),
          visitante: getCellValue(row.getCell('F')),
          mvp: getCellValue(row.getCell('G')),
          goleador: getCellValue(row.getCell('H'))
        };
        
        jornadas.push(jornada);
      } catch (error) {
        console.error(`Error al procesar la fila ${rowNumber}:`, error);
      }
    });

    console.log(`Se encontraron ${jornadas.length} jornadas`);
    return jornadas;
  } catch (error) {
    console.error('Error al leer las jornadas del Excel:', error);
    throw error;
  }
};

async function readExcelJugadores() {
  try {
    console.log('\n=== INICIO DE LECTURA DE JUGADORES ===');
    console.log('Hoja de trabajo: Lista');
    console.log('Columnas a leer:');
    console.log('- Columna E: Chaleco (ID)');
    console.log('- Columna D: Apodo');
    console.log('- Columna T: Posición');
    console.log('- Columna U: Pierna');
    console.log('- Columna V: Equipo Nacional');

    const filePath = path.resolve(__dirname, '../../data/PanterasFC.xlsx');
    console.log('\nRuta absoluta del archivo:', filePath);

    // Verificar que el archivo existe y es accesible
    if (!fs.existsSync(filePath)) {
      throw new Error(`El archivo no existe en la ruta: ${filePath}`);
    }
    
    try {
      fs.accessSync(filePath, fs.constants.R_OK);
      console.log('El archivo es accesible para lectura');
    } catch (err) {
      throw new Error(`No se tienen permisos de lectura para el archivo: ${filePath}`);
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    console.log('Archivo Excel leído correctamente');

    // Listar todas las hojas disponibles
    const hojas = workbook.worksheets.map(ws => ws.name);
    console.log('\nHojas disponibles:', hojas);

    const worksheet = workbook.getWorksheet('Lista');
    if (!worksheet) {
      throw new Error('No se encontró la hoja "Lista" en el archivo Excel');
    }
    console.log('Hoja "Lista" encontrada');

    // Imprimir los encabezados para verificar
    const headers = worksheet.getRow(1).values;
    console.log('\nEncabezados de la hoja Lista:', headers);

    const jugadores = [];
    let rowCount = 0;

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Saltar la fila de encabezados
        rowCount++;
        try {
          const jugador = {
            chaleco: getCellValue(row.getCell('E')) || 0, // Columna E: Chaleco (usado como ID)
            apodo: getCellValue(row.getCell('D')) || '', // Columna D: Apodo
            posicion: getCellValue(row.getCell('T')) || '', // Columna T: Posición
            pierna: getCellValue(row.getCell('U')) || '', // Columna U: Pierna
            equipoNacional: getCellValue(row.getCell('V')) || '', // Columna V: Equipo Nacional
            imagen: `/assets/jugadores/${getCellValue(row.getCell('E')) || 0}.png` // Ruta de la imagen basada en el chaleco
          };
          
          // Solo agregar jugadores que tengan al menos un dato
          if (Object.values(jugador).some(val => val !== null && val !== undefined && val !== '')) {
            jugadores.push(jugador);
            // Imprimir los primeros 10 jugadores para verificar
            if (rowCount <= 10) {
              console.log(`\nJugador ${rowCount}:`, jugador);
            }
          }
        } catch (error) {
          console.error(`Error al procesar la fila ${rowNumber}:`, error);
        }
      }
    });

    console.log('\n=== RESUMEN FINAL ===');
    console.log(`Se procesaron ${rowCount} filas`);
    console.log(`Se encontraron ${jugadores.length} jugadores`);
    if (jugadores.length > 0) {
      console.log('\nPrimer jugador de ejemplo:', jugadores[0]);
    }

    return jugadores;
  } catch (error) {
    console.error('\n=== ERROR DETALLADO ===');
    console.error('Error al leer los jugadores del Excel:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    throw error;
  }
}

module.exports = {
  readExcelStats,
  readExcelJornadas,
  readExcelJugadores
};
