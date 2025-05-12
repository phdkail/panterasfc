import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={cn(
      "bg-white dark:bg-gray-900 shadow-md fixed w-full z-50"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="/images/logo.png"
                alt="Panteras FC"
              />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Panteras FC
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link
              to="/"
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Inicio
            </Link>
            <Link
              to="/nosotros"
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Nosotros
            </Link>
            <Link
              to="/plantilla"
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Plantilla
            </Link>
            <Link
              to="/eventos"
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Eventos
            </Link>
            <Link
              to="/jornadas"
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Jornadas
            </Link>
            <Link
              to="/estadisticas"
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Estadísticas
            </Link>
            <Link
              to="/contacto"
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contacto
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "sm:hidden",
          isOpen ? "block" : "hidden"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
          >
            Inicio
          </Link>
          <Link
            to="/nosotros"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
          >
            Nosotros
          </Link>
          <Link
            to="/plantilla"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
          >
            Plantilla
          </Link>
          <Link
            to="/jornadas"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
          >
            Jornadas
          </Link>
          <Link
            to="/estadisticas"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
          >
            Estadísticas
          </Link>
          <Link
            to="/contacto"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
