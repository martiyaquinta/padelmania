import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartProvider';

const Header = ({ onCartOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const menuItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Tienda', href: '/shop' },
    { label: 'Acerca de', href: '/about' },
    { label: 'Contacto', href: '/contact' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Barra superior de anuncio */}
      <div className="bg-navy text-white py-2 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium">
            🚚 Hasta 6 cuotas sin interés — Envío gratis desde $50.000
          </p>
        </div>
      </div>

      {/* Header principal */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/assets/logo.png" 
              alt="Padelmania Logo" 
              className="h-10 w-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'block';
              }}
            />
            <div 
              className="hidden bg-navy text-white px-3 py-2 rounded-lg font-bold text-xl"
              style={{ display: 'none' }}
            >
              Padelmania
            </div>
          </Link>

          {/* Buscador - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full input-base pl-10 pr-4"
                  aria-label="Buscar productos"
                />
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-navy hover:text-mint transition-colors duration-300 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Acciones */}
          <div className="flex items-center space-x-4">
            {/* Carrito */}
            <button
              onClick={onCartOpen}
              className="relative p-2 text-navy hover:text-mint transition-colors duration-300"
              aria-label={`Abrir carrito (${itemCount} ${itemCount === 1 ? 'item' : 'items'})`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.08 5.42a1 1 0 00.95 1.25h9.26a1 1 0 00.95-1.25L15 13M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6"/>
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-mint text-navy text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* Menú hamburguesa - Mobile */}
            <button
              className="md:hidden p-2 text-navy hover:text-mint transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Buscador Mobile */}
        <div className="md:hidden mt-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full input-base pl-10 pr-4"
                aria-label="Buscar productos"
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>
        </div>

        {/* Menú Mobile */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-sand-gray">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-navy hover:text-mint transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;