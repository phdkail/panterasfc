import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Bienvenido a Panteras FC</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Nuestra Plantilla</h2>
          <p className="text-gray-600">Conoce a nuestros jugadores y su trayectoria en el equipo.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Próximos Partidos</h2>
          <p className="text-gray-600">Mantente al tanto de nuestros próximos encuentros.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Estadísticas</h2>
          <p className="text-gray-600">Sigue el rendimiento del equipo y los jugadores.</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 