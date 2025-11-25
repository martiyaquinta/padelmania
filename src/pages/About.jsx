import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-natural-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-navy to-mint text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestra historia
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Padelmania nació de la pasión por conectar el deporte, la naturaleza 
              y el bienestar en una experiencia única que transforme cada partido 
              en un momento de plenitud.
            </p>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-navy mb-6">
                  Más que una tienda, una filosofía
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    En 2025, un grupo de apasionados por el pádel se dio cuenta de que 
                    faltaba algo en el mercado: productos que no solo fueran de calidad, 
                    sino que también respetaran el medio ambiente y promovieran un 
                    bienestar integral.
                  </p>
                  <p>
                    Así nació Padelmania, con la misión de ofrecer productos de pádel 
                    que conecten a los jugadores con la esencia natural del deporte. 
                    Cada producto que seleccionamos cuenta una historia de sustentabilidad, 
                    innovación y respeto por el juego.
                  </p>
                  <p>
                    Creemos que el pádel es más que golpear una pelota: es una oportunidad 
                    de conectar con tu energía interior, de cuidar tu cuerpo y de 
                    disfrutar cada momento en la cancha con productos que potencien 
                    tu rendimiento sin comprometer el planeta.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="/assets/images/about-team.jpg"
                  alt="Equipo Padelmania"
                  className="w-full rounded-2xl shadow-lg"
                  onError={(e) => {
                    e.target.src = '/assets/images/placeholder-about.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-mint bg-opacity-20 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">🌱</div>
                    <p className="font-semibold text-lg">
                      Cuidando cada detalle
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy text-center mb-12">
              Nuestros valores
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-navy" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-navy mb-4">Energía Natural</h3>
                <p className="text-gray-600 leading-relaxed">
                  Promovemos productos que potencien tu energía natural sin 
                  artificialidades, conectándote con la esencia pura del juego.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-navy" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 3.314-2.686 6-6 6a6 6 0 01-5.668-7.973z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-navy mb-4">Sustentabilidad</h3>
                <p className="text-gray-600 leading-relaxed">
                  Cada producto que elegimos respeta el medio ambiente, porque 
                  cuidar el planeta es parte de nuestro compromiso contigo.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-navy" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-navy mb-4">Bienestar Integral</h3>
                <p className="text-gray-600 leading-relaxed">
                  No solo vendemos productos, promovemos un estilo de vida que 
                  cuida tu cuerpo, mente y espíritu a través del pádel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de selección */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy text-center mb-12">
              Cómo seleccionamos nuestros productos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  1
                </div>
                <h3 className="font-semibold text-navy mb-3">Investigación</h3>
                <p className="text-sm text-gray-600">
                  Analizamos cada producto en profundidad: materiales, 
                  fabricación y impacto ambiental.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  2
                </div>
                <h3 className="font-semibold text-navy mb-3">Pruebas</h3>
                <p className="text-sm text-gray-600">
                  Nuestro equipo de jugadores profesionales prueba 
                  cada producto en condiciones reales.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  3
                </div>
                <h3 className="font-semibold text-navy mb-3">Certificación</h3>
                <p className="text-sm text-gray-600">
                  Verificamos que cumplan nuestros estándares de 
                  calidad, sustentabilidad y rendimiento.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  4
                </div>
                <h3 className="font-semibold text-navy mb-3">Aprobación</h3>
                <p className="text-sm text-gray-600">
                  Solo llegan a nuestra tienda los productos que 
                  superan todos nuestros filtros de calidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips section preview */}
      <section className="py-16 bg-mint bg-opacity-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">🌱</div>
            <h2 className="text-3xl font-bold text-navy mb-4">
              Tips de pádel y bienestar
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Próximamente lanzaremos nuestra sección de contenido exclusivo con 
              consejos de entrenamiento, nutrición y bienestar para jugadores de 
              todos los niveles.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-3">🏃‍♂️</div>
                <h3 className="font-semibold text-navy mb-2">Entrenamiento</h3>
                <p className="text-sm text-gray-600">
                  Rutinas y ejercicios específicos para mejorar tu técnica
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-3">🥗</div>
                <h3 className="font-semibold text-navy mb-2">Nutrición</h3>
                <p className="text-sm text-gray-600">
                  Alimentación consciente para potenciar tu rendimiento
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-3">🧘‍♀️</div>
                <h3 className="font-semibold text-navy mb-2">Bienestar</h3>
                <p className="text-sm text-gray-600">
                  Técnicas de relajación y mindfulness para el deporte
                </p>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              Suscribite a nuestro newsletter para ser el primero en conocer 
              cuando esté disponible este contenido.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Únete a la comunidad Padelmania
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              Descubrí cómo nuestros productos pueden transformar tu experiencia 
              en la cancha y conectarte con una forma más consciente de jugar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="btn-secondary"
              >
                Explorar productos
              </Link>
              <Link
                to="/contact"
                className="bg-white bg-opacity-10 border-2 border-white text-white px-6 py-3 rounded-2xl font-medium hover:bg-white hover:text-navy transition-all duration-300"
              >
                Contactanos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;