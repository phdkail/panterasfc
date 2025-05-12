const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

// Definimos la ruta base del proyecto y la ruta del archivo Excel
const BASE_PATH = path.resolve(__dirname, '..', '..');
const EXCEL_FILE_PATH = path.join(BASE_PATH, 'data', 'PanterasFC.xlsx');

console.log('Ruta base del proyecto:', BASE_PATH);
console.log('Ruta absoluta del archivo Excel:', EXCEL_FILE_PATH);

// Verificar que el archivo existe al inicio
if (!fs.existsSync(EXCEL_FILE_PATH)) {
  console.error('❌ ERROR: El archivo no existe en la ruta:', EXCEL_FILE_PATH);
  throw new Error(`El archivo no existe en la ruta: ${EXCEL_FILE_PATH}`);
} else {
  console.log('✅ Archivo Excel encontrado correctamente');
}

// =====================================================
// FUNCIONES AUXILIARES
// =====================================================

// Función para obtener el valor de la celda, considerando fórmulas
const getCellValue = (cell) => {
  try {
    console.log('\n🔍 DEBUG CELDA:');
    console.log('Celda:', cell);
    console.log('Tipo de celda:', cell ? cell.type : 'null');
    console.log('Valor crudo:', cell ? cell.value : 'null');
    
    if (!cell) {
      return null;
    }
    
    // Intentar obtener el resultado de la fórmula
    if (cell.formula) {
      console.log('Es una fórmula:', cell.formula);
      console.log('Resultado de la fórmula:', cell.result);
      return cell.result;
    }
    
    // Si es un objeto con resultado, usamos ese
    if (typeof cell.value === 'object' && cell.value !== null && 'result' in cell.value) {
      console.log('Es un objeto con resultado:', cell.value.result);
      return cell.value.result;
    }
    
    // Si es un valor directo, lo usamos
    console.log('Valor directo:', cell.value);
    return cell.value;
  } catch (error) {
    console.error('Error al leer el valor de la celda:', error);
    return null;
  }
};

// =====================================================
// PESTAÑA ESTADÍSTICAS
// =====================================================

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

    console.log('\nRuta absoluta del archivo:', EXCEL_FILE_PATH);

    // Verificar que el archivo existe y es accesible
    if (!fs.existsSync(EXCEL_FILE_PATH)) {
      throw new Error(`El archivo no existe en la ruta: ${EXCEL_FILE_PATH}`);
    }
    
    try {
      fs.accessSync(EXCEL_FILE_PATH, fs.constants.R_OK);
      console.log('El archivo es accesible para lectura');
    } catch (err) {
      throw new Error(`No se tienen permisos de lectura para el archivo: ${EXCEL_FILE_PATH}`);
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);
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
              orden: rowCount, // Usamos el número de fila como orden
              nombre: String(nombre),
              chaleco: String(chaleco),
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

// =====================================================
// PESTAÑA JORNADAS
// =====================================================

const readExcelJornadas = async () => {
  try {
    console.log('Iniciando lectura de jornadas...');
    console.log('Ruta del archivo:', EXCEL_FILE_PATH);
    
    if (!fs.existsSync(EXCEL_FILE_PATH)) {
      console.error('El archivo no existe en la ruta:', EXCEL_FILE_PATH);
      throw new Error('Archivo no encontrado');
    }

    console.log('Archivo encontrado, intentando leer...');
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);
    console.log('Archivo leído correctamente');

    const worksheet = workbook.getWorksheet('Jornadas');
    if (!worksheet) {
      console.error('No se encontró la hoja Jornadas');
      throw new Error('Hoja no encontrada');
    }
    console.log('Hoja Jornadas encontrada');

    // Log de los encabezados
    console.log('\nEncabezados de la hoja:');
    const headers = worksheet.getRow(1).values;
    console.log(headers);

    const jornadas = [];
    let rowCount = 0;

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        rowCount++;
        try {
          const numero = getCellValue(row.getCell('C'));
          const fecha = getCellValue(row.getCell('D'));
          const hora = getCellValue(row.getCell('E'));
          const lugar = getCellValue(row.getCell('F'));
          const mvp = getCellValue(row.getCell('G'));
          const goleador = getCellValue(row.getCell('H'));
          const direccion = getCellValue(row.getCell('J'));

          // Formatear la fecha a dd/mm/aaaa
          const formatearFecha = (fecha) => {
            if (!fecha) return '';
            const d = new Date(fecha);
            // Ajustar la fecha para compensar la zona horaria
            d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
            const dia = d.getDate().toString().padStart(2, '0');
            const mes = (d.getMonth() + 1).toString().padStart(2, '0');
            const año = d.getFullYear();
            return `${dia}/${mes}/${año}`;
          };

          // Formatear la hora a formato 24h
          const formatearHora = (hora) => {
            console.log('\n🔍 DEBUG HORA:');
            console.log('Valor crudo de hora:', hora);
            
            if (!hora) return '';
            
            // Si es un string, remover el apóstrofe inicial si existe
            if (typeof hora === 'string') {
                // Remover el apóstrofe inicial si existe
                const horaLimpia = hora.startsWith("'") ? hora.substring(1) : hora;
                console.log('Hora después de remover apóstrofe:', horaLimpia);
                
                // Verificar si es un formato de hora válido (HH:mm)
                const match = horaLimpia.match(/^(\d{1,2}):(\d{2})$/);
                if (match) {
                    const [_, horas, minutos] = match;
                    return `${horas.padStart(2, '0')}:${minutos}`;
                }
            }
            
            return '';
          };

          // Extraer el texto de un objeto
          const extraerTexto = (valor) => {
            if (!valor) return '';
            // Si es un objeto con hyperlink, ignorar el hyperlink y usar el valor real
            if (typeof valor === 'object' && valor !== null) {
              // Si tiene un valor directo, usarlo
              if (valor.value !== undefined) {
                return String(valor.value);
              }
              // Si no tiene valor directo, intentar obtener el texto
              if (valor.text !== undefined) {
                return String(valor.text);
              }
              return '';
            }
            return String(valor);
          };

          const jornada = {
            id: rowNumber - 1,
            numero: String(numero || ''),
            fecha: formatearFecha(fecha),
            hora: formatearHora(hora),
            lugar: String(lugar || ''),
            mvp: String(mvp || ''),
            goleador: String(goleador || ''),
            direccion: extraerTexto(direccion),
            esPasada: new Date(fecha) < new Date()
          };

          jornadas.push(jornada);

          // Log específico para la jornada 15
          if (String(numero) === '15') {
            console.log('\n🔍 DATOS CRUDOS DE LA JORNADA 15:');
            console.log('========================================');
            console.log('Fila número:', rowNumber);
            console.log('Valores crudos de las celdas:');
            console.log('C (Número):', numero);
            console.log('D (Fecha):', fecha);
            console.log('E (Hora):', hora);
            console.log('F (Lugar):', lugar);
            console.log('G (MVP):', mvp);
            console.log('H (Goleador):', goleador);
            console.log('J (Dirección):', direccion);
            console.log('========================================');
            console.log('✅ JORNADA 15 PROCESADA:');
            console.log('========================================');
            console.log(JSON.stringify(jornada, null, 2));
            console.log('========================================');
          }
        } catch (error) {
          console.error(`Error al procesar la fila ${rowNumber}:`, error);
        }
      }
    });

    console.log('\n=== RESUMEN FINAL ===');
    console.log(`Se procesaron ${rowCount} filas`);
    console.log(`Se encontraron ${jornadas.length} jornadas`);
    console.log('Enviando', jornadas.length, 'jornadas');

    return jornadas;
  } catch (error) {
    console.error('Error al leer las jornadas:', error);
    throw error;
  }
};

// =====================================================
// PESTAÑA PLANTILLA (LISTA)
// =====================================================

async function readExcelJugadores() {
  try {
    console.log('\n=== INICIO DE LECTURA DE JUGADORES ===');
    console.log('Hoja de trabajo: Lista');
    console.log('Columnas a leer:');
    console.log('- Columna E: Chaleco (ID)');
    console.log('- Columna D: Apodo');
    console.log('- Columna T: Posición');
    console.log('- Columna S: Pierna');
    console.log('- Columna U: Equipo Nacional');
    console.log('- Columna V: Equipo Internacional');

    console.log('\nRuta absoluta del archivo:', EXCEL_FILE_PATH);

    // Verificar que el archivo existe y es accesible
    if (!fs.existsSync(EXCEL_FILE_PATH)) {
      throw new Error(`El archivo no existe en la ruta: ${EXCEL_FILE_PATH}`);
    }
    
    try {
      fs.accessSync(EXCEL_FILE_PATH, fs.constants.R_OK);
      console.log('El archivo es accesible para lectura');
    } catch (err) {
      throw new Error(`No se tienen permisos de lectura para el archivo: ${EXCEL_FILE_PATH}`);
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);
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
            chaleco: `N° Camiseta: ${getCellValue(row.getCell('E')) || '--'}`,
            apodo: getCellValue(row.getCell('D')) || '--',
            posicion: `Posición: ${getCellValue(row.getCell('T')) || '--'}`,
            pierna: `Pierna Dominante: ${getCellValue(row.getCell('S')) || '--'}`,
            equipoNacional: `Equipo Nacional: ${getCellValue(row.getCell('U')) || '--'}`,
            equipoInternacional: `Equipo Internacional: ${getCellValue(row.getCell('V')) || '--'}`,
            imagen: `/assets/jugadores/${getCellValue(row.getCell('E')) || 0}.png`
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

// =====================================================
// EXPORTACIÓN DE FUNCIONES
// =====================================================

module.exports = {
  readExcelStats,
  readExcelJornadas,
  readExcelJugadores
};
