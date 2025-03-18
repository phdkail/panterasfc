import { useState } from "react";
import jornadas from "../data/jornadas"; // Importar los datos
import "../styles/jornadas.css"; // Importar los estilos
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaFutbol, FaMedal } from "react-icons/fa"; // Íconos adicionales

export default function Jornadas() {
  const [order, setOrder] = useState("default");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const sortedJornadas = [...jornadas].sort((a, b) => {
    if (order === "fecha") return b.id - a.id; // Ordenar por fecha
    return 0;
  });

  const openImage = (image, index) => {
    setSelectedImage(image);
    setImageIndex(index);
  };

  const closeImage = () => setSelectedImage(null);

  const nextImage = () => {
    const nextIndex = (imageIndex + 1) % sortedJornadas[0].images.length;
    setSelectedImage(sortedJornadas[0].images[nextIndex]);
    setImageIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (imageIndex - 1 + sortedJornadas[0].images.length) % sortedJornadas[0].images.length;
    setSelectedImage(sortedJornadas[0].images[prevIndex]);
    setImageIndex(prevIndex);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: false
  };

  return (
    <div className="jornadas-container">
      <h1 className="tituloJornadas">Jornadas</h1>

      <div className="filters">
        <label>Ordenar por: </label>
        <select onChange={(e) => setOrder(e.target.value)} value={order}>
          <option value="default">Por defecto</option>
          <option value="fecha">Más recientes</option>
        </select>
      </div>

      <div className="jornadas-cards">
        {sortedJornadas.map((event) => (
          <div className="jornadas-card" key={event.id}>
            <div className="slider-container">
              <Slider {...sliderSettings}>
                {[event.flyer, event.formacion, event.resultados, event.equipoAmarillo, event.equipoAzul, event.equipoRosado, event.foto].map((img, index) => (
                  <div key={index}>
                    <img
                      src={img}
                      alt={`${event.nombre} - Imagen ${index + 1}`}
                      onClick={() => openImage(img, index)}
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <h2>{event.edicion}</h2>
            <p><strong>Lugar:</strong> {event.lugar}</p>
            <p><strong>Fecha:</strong> {event.fecha}</p>
            <p><FaFutbol /> <strong>Goleador:</strong> {event.goleador.nombre} ({event.goleador.equipo})</p>
            <p><FaMedal /> <strong>Mejor Jugador:</strong> {event.mejorJugador.nombre} ({event.mejorJugador.equipo})</p>
          </div>
        ))}
      </div>

    </div>
  );
}
