import { Link } from "react-router-dom";
import bannerImg from "/src/assets/logo.png";

export default function Banner() {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1>Panteras FC</h1>
        <p>¡Bienvenidos!</p>
        <Link to="/nosotros">
          <button>Conoce Más</button>
        </Link>
      </div>

      <img src={bannerImg} alt="Banner" />
    </div>
  );
}
