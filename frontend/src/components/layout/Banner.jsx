import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="relative overflow-hidden mt-[64px]">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/assets/banner.jpg")' }}
      >
        {/* Capa de oscuridad y gradiente */}
        <div className="absolute inset-0 bg-black bg-opacity-60 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative flex flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Panteras FC
          </h1>

          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            Garra Felina🐾🔥
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent hover:bg-accent-light text-primary font-bold px-8 py-3 rounded-full text-lg transition-all duration-300 shadow-lg"
          >
            <Link to="#nosotros">
              Conócenos
            </Link>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
