import React from 'react';
import { Link } from 'react-router-dom';
import { smoothScrollTo } from '../utils/helpers';

const HeroSection = () => {
  const handleCTAClick = () => {
    // Intentar hacer scroll al shop si estamos en home
    const shopSection = document.getElementById('shop-section');
    if (shopSection) {
      smoothScrollTo('shop-section', 80);
    } else {
      // Si no hay sección shop en la página, navegar a /shop
      window.location.href = '/shop';
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/hero-padel-outdoor.jpg"
          alt="Pádel al aire libre"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback gradient si no se encuentra la imagen
            e.target.style.display = 'none';
            e.target.parentElement.classList.add('hero-gradient');
          }}
        />
        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-navy bg-opacity-40"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          {/* Título principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Sentí la conexión entre{' '}
            <span className="text-gradient bg-gradient-to-r from-mint to-white bg-clip-text text-transparent">
              energía, juego y naturaleza
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed">
            En Padelmania creemos que cada punto es una oportunidad para cuidar tu rendimiento y tu bienestar.
          </p>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleCTAClick}
              className="btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Descubrí nuestros productos
            </button>
            
            <Link
              to="/about"
              className="btn-secondary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Conocé nuestra historia
            </Link>
          </div>

          {/* Indicadores de características */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4">
              <div className="w-8 h-8 bg-mint rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-navy" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium">Calidad Premium</span>
            </div>

            <div className="flex items-center justify-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4">
              <div className="w-8 h-8 bg-mint rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-navy" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <span className="font-medium">Envío Rápido</span>
            </div>

            <div className="flex items-center justify-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4">
              <div className="w-8 h-8 bg-mint rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-navy" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium">Energía Natural</span>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;