import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Banner from './components/layout/Banner';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import ContactCard from './pages/ContactCard';
import Jornadas from './pages/Jornadas';
import Estadisticas from './pages/Estadisticas';
import Plantilla from './pages/Plantilla';
import Resultados from './pages/Resultados';
import './styles/variables.css';
import './styles/radix.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Banner />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<ContactCard />} />
            <Route path="/jornadas" element={<Jornadas />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/plantilla" element={<Plantilla />} />
            <Route path="/resultados" element={<Resultados />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
