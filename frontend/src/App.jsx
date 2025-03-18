import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Banner from "./components/Banner"; // 🔹 Importamos el componente Banner

import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import ContactCard from "./pages/ContactCard";
import Miembros from "./pages/Miembros";
import Jornadas from "./pages/Jornadas";
import Estadisticas from "./pages/Estadisticas";

import "./App.css";
import "./styles/banner.css";
import "./styles/navbar.css";
import "./styles/footer.css";
import "./styles/nosotros.css";
import "./styles/miembros.css";
import "./styles/jornadas.css";
import "./styles/estadisticas.css";
import "./styles/contactCard.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Banner /> {/* 🔹 Añadido el Banner aquí para que esté en todas las páginas */}

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/miembros" element={<Miembros />} />
            <Route path="/jornadas" element={<Jornadas />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/contacto" element={<ContactCard />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
