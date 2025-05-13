import React from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  createRoutesFromElements,
  Route,
  Outlet,
  Navigate
} from 'react-router-dom';
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

// Layout component que envuelve todas las rutas
const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Banner />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Crear el router con las nuevas características
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/contacto" element={<ContactCard />} />
      <Route path="/jornadas" element={<Jornadas />} />
      <Route path="/estadisticas" element={<Estadisticas />} />
      <Route path="/plantilla" element={<Plantilla />} />
      <Route path="/resultados" element={<Resultados />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
