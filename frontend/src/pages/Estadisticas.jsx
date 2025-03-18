import "../styles/estadisticas.css"; // Importamos estilos

export default function Estadisticas() {
  return (
    <div className="estadisticas-container">
      <h1 className="titulo-construccion">Página en construcción</h1>
      <img
        src={`${import.meta.env.BASE_URL}images/enconstruccion.jpg`}
        alt="Página en construcción"
        className="enconstruccion-img"
      />
    </div>
  );
}
