import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) {
      setNewsletterStatus('error');
      return;
    }

    // Crear el enlace mailto para enviar la suscripción
    const subject = encodeURIComponent('Nueva suscripción al newsletter - Padelmania');
    const body = encodeURIComponent(
      `Nueva suscripción al newsletter:\n\n` +
      `Email: ${newsletterEmail}\n` +
      `Fecha: ${new Date().toLocaleString('es-AR')}\n\n` +
      `Por favor, agregar este email a la lista de suscriptores.`
    );
    
    const mailtoLink = `mailto:padelmaniasierras@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Mostrar mensaje de éxito
    setNewsletterStatus('success');
    setNewsletterEmail('');
    
    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
      setNewsletterStatus('');
    }, 5000);
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Products Section */}
      <ProductGrid 
        title="Productos Destacados"
        showFilters={false}
        limit={8}
      />
      
      {/* About Preview Section */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Más que una tienda, una filosofía
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-8">
              En Padelmania entendemos que el pádel es más que un deporte: es una conexión 
              con la naturaleza, con tu energía interior y con el bienestar que buscás en 
              cada punto. Nuestros productos están diseñados para acompañarte en ese viaje.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-navy" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-2">Calidad Premium</h3>
                <p className="text-gray-300">
                  Productos seleccionados con los más altos estándares de calidad
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-navy" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-2">Excelencia</h3>
                <p className="text-gray-300">
                  Comprometidos con la mejor calidad en cada producto
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-mint rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-navy" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl mb-2">Garantía Total</h3>
                <p className="text-gray-300">
                  Respaldamos la calidad de todos nuestros productos
                </p>
              </div>
            </div>
            
            <a
              href="/about"
              className="btn-secondary inline-block"
            >
              Conocé nuestra historia
            </a>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy mb-4">
              Mantente conectado con Padelmania
            </h2>
            <p className="text-gray-600 mb-8">
              Recibí ofertas exclusivas, tips de entrenamiento y las últimas novedades 
              del mundo del pádel directamente en tu email.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 input-base"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Suscribirme
              </button>
            </form>
            
            {newsletterStatus === 'success' && (
              <p className="text-sm text-green-600 mt-4 font-medium">
                ✓ ¡Gracias por suscribirte! Te contactaremos pronto.
              </p>
            )}
            
            {newsletterStatus === 'error' && (
              <p className="text-sm text-red-600 mt-4 font-medium">
                Por favor, ingresá un email válido.
              </p>
            )}
            
            {!newsletterStatus && (
              <p className="text-sm text-gray-500 mt-4">
                Te podés desuscribir en cualquier momento. Leé nuestra política de privacidad.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;