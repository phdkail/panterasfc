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
        const response = await axios.get('/api/stats', {
          timeout: 30000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && Array.isArray(response.data)) {
          console.log('Datos recibidos:', response.data.length, 'estadísticas');
          setJugadores(response.data);
        } else {
          console.error('Formato de datos inválido:', response.data);
          setError('Formato de datos inválido recibido del servidor');
        }
      } catch (error) {
        console.error('Error detallado:', error);
        if (error.code === 'ECONNABORTED') {
          setError('La solicitud tardó demasiado en responder. Por favor, intente nuevamente.');
        } else if (error.response) {
          setError(`Error del servidor: ${error.response.status} - ${error.response.data?.message || 'Error desconocido'}`);
        } else if (error.request) {
          setError('No se pudo conectar con el servidor. Verifica que esté corriendo.');
        } else {
          setError('Error al cargar las estadísticas: ' + error.message);
        }
      } finally {
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
    .filter(jugador => {
      const nombre = String(jugador.chaleco || '');
      const chaleco = String(jugador.nombre || '');
      const busqueda = filtro.toLowerCase();
      return nombre.toLowerCase().includes(busqueda) || chaleco.toLowerCase().includes(busqueda);
    })
    .sort((a, b) => {
      const factor = orden.direccion === 'asc' ? 1 : -1;
      const valorA = Number(a[orden.campo] || 0);
      const valorB = Number(b[orden.campo] || 0);
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
                className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer w-16"
                onClick={() => handleOrdenar('orden')}
              >
                # {orden.campo === 'orden' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer w-48"
                onClick={() => handleOrdenar('chaleco')}
              >
                Nombre {orden.campo === 'chaleco' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer w-48"
                onClick={() => handleOrdenar('nombre')}
              >
                N° Camiseta {orden.campo === 'nombre' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer w-24"
                onClick={() => handleOrdenar('partidosAcumulados')}
              >
                PJ {orden.campo === 'partidosAcumulados' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer w-24"
                onClick={() => handleOrdenar('golesAcumulados')}
              >
                G {orden.campo === 'golesAcumulados' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer w-24"
                onClick={() => handleOrdenar('asistenciasAcumuladas')}
              >
                A {orden.campo === 'asistenciasAcumuladas' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer w-24"
                onClick={() => handleOrdenar('tta')}
              >
                TTA {orden.campo === 'tta' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer w-24"
                onClick={() => handleOrdenar('ttr')}
              >
                TTR {orden.campo === 'ttr' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer w-24"
                onClick={() => handleOrdenar('mvps')}
              >
                MVP {orden.campo === 'mvps' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer w-24"
                onClick={() => handleOrdenar('media')}
              >
                Media {orden.campo === 'media' && (orden.direccion === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {jugadoresFiltrados.map((jugador, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {jugador.orden}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {String(jugador.chaleco || '')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {String(jugador.nombre || '')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {Number(jugador.partidosAcumulados || 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {Number(jugador.golesAcumulados || 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {Number(jugador.asistenciasAcumuladas || 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {Number(jugador.tta || 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {Number(jugador.ttr || 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {Number(jugador.mvps || 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {Number(jugador.media || 0).toFixed(2)}
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