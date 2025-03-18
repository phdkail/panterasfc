import { useState, useEffect } from "react";
import "../styles/imageCarousel.css"; // Importamos los estilos

// Rutas de las imágenes desde public/images
const images = [
  "/images/resultados/15flyer.png",
  "/images/resultados/15foto.png",
  "/images/resultados/16flyer.png",
  "/images/resultados/16foto.png",
  "/images/resultados/17flyer.png",
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambia la imagen automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Función para avanzar a la siguiente imagen
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Función para retroceder a la imagen anterior
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container">
      {/* Botón para ir a la imagen anterior */}
      <button className="carousel-btn prev" onClick={prevImage}>
        ❮
      </button>

      {/* Imagen del carrusel */}
      <div className="carousel-image">
        <img src={images[currentIndex]} alt={`Imagen ${currentIndex + 1}`} />
      </div>

      {/* Botón para ir a la siguiente imagen */}
      <button className="carousel-btn next" onClick={nextImage}>
        ❯
      </button>
    </div>
  );
}
