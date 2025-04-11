import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Resultados = () => {
  const [jornadasPasadas] = useState([
    {
      id: 15,
      fecha: '2024-03-15',
      hora: '20:00',
      lugar: 'Arena 7',
      mvp: 'Juan Pérez',
      goleador: 'Carlos Gómez',
      imagenes: [
        '15foto.png',
        '15formacion.png',
        '15resultados.png',
        '15flyer.png'
      ]
    },
    {
      id: 16,
      fecha: '2024-03-16',
      hora: '21:00',
      lugar: 'Arena 7',
      mvp: 'Luis Martínez',
      goleador: 'Pedro Sánchez',
      imagenes: [
        '16foto.png',
        '16formacion.png',
        '16resultados.png',
        '16flyer.png'
      ]
    },
    // Agregar más jornadas pasadas hasta la 24
  ]);

  const [proximasJornadas] = useState([
    {
      id: 25,
      fecha: '2024-04-01',
      hora: '20:00',
      lugar: 'Arena 7',
      mvp: 'Próximamente',
      goleador: 'Próximamente',
      imagenes: [
        'xxfoto.png',
        'xxformacion.png'
      ]
    },
    // Agregar más jornadas próximas
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Resultados</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Jornadas Pasadas</h2>
        <div className="grid grid-cols-1 gap-8">
          {jornadasPasadas.map((jornada) => (
            <div key={jornada.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Jornada {jornada.id}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Carousel
                      showArrows={true}
                      showThumbs={false}
                      infiniteLoop={true}
                      autoPlay={true}
                      interval={5000}
                    >
                      {jornada.imagenes.map((imagen, index) => (
                        <div key={index}>
                          <img
                            src={`/assets/resultados/${imagen}`}
                            alt={`Jornada ${jornada.id} - Imagen ${index + 1}`}
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                  <div className="space-y-4">
                    <p><span className="font-semibold">Fecha:</span> {jornada.fecha}</p>
                    <p><span className="font-semibold">Hora:</span> {jornada.hora}</p>
                    <p><span className="font-semibold">Lugar:</span> {jornada.lugar}</p>
                    <p><span className="font-semibold">MVP:</span> {jornada.mvp}</p>
                    <p><span className="font-semibold">Goleador:</span> {jornada.goleador}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">Próximos Partidos</h2>
        <div className="grid grid-cols-1 gap-8">
          {proximasJornadas.map((jornada) => (
            <div key={jornada.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Jornada {jornada.id}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Carousel
                      showArrows={true}
                      showThumbs={false}
                      infiniteLoop={true}
                      autoPlay={true}
                      interval={5000}
                    >
                      {jornada.imagenes.map((imagen, index) => (
                        <div key={index}>
                          <img
                            src={`/assets/resultados/${imagen}`}
                            alt={`Jornada ${jornada.id} - Imagen ${index + 1}`}
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                  <div className="space-y-4">
                    <p><span className="font-semibold">Fecha:</span> {jornada.fecha}</p>
                    <p><span className="font-semibold">Hora:</span> {jornada.hora}</p>
                    <p><span className="font-semibold">Lugar:</span> {jornada.lugar}</p>
                    <p><span className="font-semibold">MVP:</span> {jornada.mvp}</p>
                    <p><span className="font-semibold">Goleador:</span> {jornada.goleador}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resultados; 