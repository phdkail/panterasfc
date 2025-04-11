import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre Nosotros */}
          <div>
            <h3 className="text-lg font-bold mb-4">Sobre Nosotros</h3>
            <p className="text-gray-300">
              Panteras FC!! <br />Bienvenidos a la garra felina🐾🔥!!
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/nosotros" className="text-gray-300 hover:text-accent transition-colors">Nosotros</a></li>
              <li><a href="/plantilla" className="text-gray-300 hover:text-accent transition-colors">Plantilla</a></li>
              <li><a href="/jornadas" className="text-gray-300 hover:text-accent transition-colors">Jornadas</a></li>
              <li><a href="/estadisticas" className="text-gray-300 hover:text-accent transition-colors">Estadísticas</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={20} />
                <span className="text-gray-300">phdkail@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={20} />
                <span className="text-gray-300">+51 986 741 150</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-lg font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/phdnavi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-accent transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="https://twitter.com/k4iL" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-accent transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/in/k4iL/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-accent transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://www.instagram.com/phdkail" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-accent transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Kail. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 