import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Extraer parámetros de búsqueda de la URL
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    
    setSearchQuery(search);
  }, [searchParams]);

  const category = searchParams.get('category') || null;

  return (
    <div className="min-h-screen bg-natural-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              {category ? (
                <>Productos de <span className="capitalize">{category}</span></>
              ) : searchQuery ? (
                <>Resultados para "{searchQuery}"</>
              ) : (
                'Nuestra Tienda'
              )}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {category ? (
                `Descubrí toda nuestra selección de ${category} diseñados para mejorar tu rendimiento en la cancha.`
              ) : searchQuery ? (
                'Encontrá exactamente lo que buscás en nuestra colección de productos de pádel.'
              ) : (
                'Explorá nuestra colección completa de productos de pádel premium. Desde pelotas hasta accesorios, todo lo que necesitás para elevar tu juego.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid 
        title=""
        showFilters={true}
        category={category}
        searchQuery={searchQuery}
      />

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy mb-2">Envío gratis</h3>
              <p className="text-sm text-gray-600">En compras superiores a $50.000</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy mb-2">Garantía oficial</h3>
              <p className="text-sm text-gray-600">Productos 100% originales</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy mb-2">Atención personalizada</h3>
              <p className="text-sm text-gray-600">Chat en vivo y WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-navy text-center mb-8">
            Explorá por categorías
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/shop?category=pelotas"
              className="group card p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">🎾</div>
              <h3 className="font-semibold text-navy mb-2 group-hover:text-mint transition-colors">
                Pelotas
              </h3>
              <p className="text-sm text-gray-600">
                Premium y eco-friendly para todos los niveles
              </p>
            </a>
            
            <a
              href="/shop?category=grips"
              className="group card p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold text-navy mb-2 group-hover:text-mint transition-colors">
                Grips
              </h3>
              <p className="text-sm text-gray-600">
                Control y absorción para tu mejor agarre
              </p>
            </a>
            
            <a
              href="/shop?category=accesorios"
              className="group card p-6 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">🧢</div>
              <h3 className="font-semibold text-navy mb-2 group-hover:text-mint transition-colors">
                Accesorios
              </h3>
              <p className="text-sm text-gray-600">
                Gorras, muñequeras y más para completar tu equipo
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;