import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Estadisticas = () => {
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [orden, setOrden] = useState({
    campo: 'partidosAcumulados',
    direccion: 'desc'
  });

  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('Iniciando petición a la API...');
        const response = await axios.get('http://localhost:3001/api/stats', {
          timeout: 10000, // 10 segundos de timeout
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Respuesta recibida:', {
          status: response.status,
          statusText: response.statusText,
          data: response.data
        });
        
        if (!response.data || response.data.length === 0) {
          throw new Error('No se encontraron datos de estadísticas');
        }
        
        // Transformar los datos para asegurar que todos los valores numéricos sean números
        const datosTransformados = response.data.map(jugador => {
          console.log('Procesando jugador:', jugador);
          return {
            ...jugador,
            orden: Number(jugador.orden) || 0,
            partidosAcumulados: Number(jugador.partidosAcumulados) || 0,
            golesAcumulados: Number(jugador.golesAcumulados) || 0,
            asistenciasAcumuladas: Number(jugador.asistenciasAcumuladas) || 0,
            tta: Number(jugador.tta) || 0,
            ttr: Number(jugador.ttr) || 0,
            mvps: Number(jugador.mvps) || 0,
            media: Number(jugador.media) || 0
          };
        });
        
        console.log('Datos transformados:', datosTransformados);
        setJugadores(datosTransformados);
        setLoading(false);
      } catch (error) {
        console.error('Error detallado:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: error.config
        });
        
        let mensajeError = 'Error al cargar las estadísticas. ';
        if (error.response) {
          // El servidor respondió con un código de error
          mensajeError += `Error ${error.response.status}: ${error.response.data?.message || 'Error del servidor'}`;
        } else if (error.request) {
          // La petición fue hecha pero no se recibió respuesta
          mensajeError += 'No se pudo conectar con el servidor. Verifica que esté corriendo.';
        } else {
          // Error al configurar la petición
          mensajeError += error.message;
        }
        
        setError(mensajeError);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleOrdenar = (campo) => {
    setOrden({
      campo,
      direccion: orden.campo === campo && orden.direccion === 'asc' ? 'desc' : 'asc'
    });
  };

  const jugadoresFiltrados = jugadores
    .filter(jugador => 
      jugador.nombre?.toLowerCase().includes(filtro.toLowerCase()) ||
      jugador.chaleco?.toString().toLowerCase().includes(filtro.toLowerCase())
    )
    .sort((a, b) => {
      const factor = orden.direccion === 'asc' ? 1 : -1;
      const valorA = a[orden.campo] || 0;
      const valorB = b[orden.campo] || 0;
      return (valorA - valorB) * factor;
    });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Estadísticas</h1>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Estadísticas</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <p className="mt-2 text-sm">Por favor, verifica que el servidor esté corriendo y que el archivo Excel esté en la ubicación correcta.</p>
        </div>
      )}
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por Nombre, N° Camiseta,..."
          className="w-full p-2 border rounded"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleOrdenar('orden')}
              >
                Orden {orden.campo === 'orden' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleOrdenar('nombre')}
              >
                Nombre {orden.campo === 'nombre' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleOrdenar('chaleco')}
              >
                Chaleco {orden.campo === 'chaleco' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleOrdenar('partidosAcumulados')}
              >
                Partidos {orden.campo === 'partidosAcumulados' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleOrdenar('golesAcumulados')}
              >
                Goles {orden.campo === 'golesAcumulados' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleOrdenar('asistenciasAcumuladas')}
              >
                Asistencias {orden.campo === 'asistenciasAcumuladas' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleOrdenar('tta')}
              >
                TTA {orden.campo === 'tta' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleOrdenar('ttr')}
              >
                TTR {orden.campo === 'ttr' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleOrdenar('mvps')}
              >
                MVPs {orden.campo === 'mvps' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleOrdenar('media')}
              >
                Media {orden.campo === 'media' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {jugadoresFiltrados.map((jugador, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {jugador.orden}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {jugador.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {jugador.chaleco}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {jugador.partidosAcumulados}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {jugador.golesAcumulados}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {jugador.asistenciasAcumuladas}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {jugador.tta}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {jugador.ttr}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {jugador.mvps}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {jugador.media}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Estadisticas; 