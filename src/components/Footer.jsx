import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/padelmania.sierras',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.342-1.297c-.894-.808-1.297-1.781-1.297-2.919c0-1.297.49-2.448 1.297-3.342c.808-.894 1.781-1.297 2.919-1.297c1.297 0 2.448.49 3.342 1.297c.894.808 1.297 1.781 1.297 2.919c0 1.297-.49 2.448-1.297 3.342c-.808.894-1.781 1.297-2.919 1.297zm7.83 0c-1.297 0-2.448-.49-3.342-1.297c-.894-.808-1.297-1.781-1.297-2.919c0-1.297.49-2.448 1.297-3.342c.808-.894 1.781-1.297 2.919-1.297c1.297 0 2.448.49 3.342 1.297c.894.808 1.297 1.781 1.297 2.919c0 1.297-.49 2.448-1.297 3.342c-.808.894-1.781 1.297-2.919 1.297z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/5492261400285',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.48C18.26 1.22 15.24 0 12.05 0 5.46 0 .12 5.34.12 11.93c0 2.11.55 4.15 1.59 5.96L0 24l6.19-1.63c1.75.96 3.74 1.47 5.76 1.47 6.59 0 11.93-5.34 11.93-11.93 0-3.19-1.22-6.21-3.48-8.47M12.05 21.78c-1.78 0-3.52-.48-5.04-1.38l-.36-.22-3.76.99 1.01-3.69-.24-.38c-.99-1.57-1.51-3.38-1.51-5.24 0-5.42 4.41-9.83 9.83-9.83 2.63 0 5.1 1.02 6.96 2.88 1.86 1.86 2.88 4.33 2.88 6.96 0 5.42-4.41 9.83-9.83 9.83M17.47 14.37c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.24-.24-.58-.49-.5-.68-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.28.3-1.06 1.04-1.06 2.53s1.08 2.94 1.23 3.14c.15.2 2.11 3.22 5.11 4.52.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35"/>
        </svg>
      )
    }
  ];

  const footerSections = [
    {
      title: 'Productos',
      links: [
        { name: 'Pelotas', href: '/shop?category=pelotas' },
        { name: 'Grips', href: '/shop?category=grips' },
        { name: 'Accesorios', href: '/shop?category=accesorios' },
        { name: 'Ofertas', href: '/shop?discount=true' }
      ]
    }
  ];

  const trustBadges = [
    {
      icon: '🚚',
      title: 'Envíos RÁPIDOS',
      description: '3-5 días hábiles'
    },
    {
      icon: '✅',
      title: 'Garantía OFICIAL',
      description: 'Productos originales'
    },
    {
      icon: '🔒',
      title: 'Pago 100% seguro',
      description: 'Datos protegidos'
    }
  ];

  return (
    <footer className="bg-navy text-white">
      {/* Trust badges */}
      <div className="border-b border-gray-600">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center justify-center space-x-3 text-center">
                <div className="text-3xl">{badge.icon}</div>
                <div>
                  <h4 className="font-semibold text-mint">{badge.title}</h4>
                  <p className="text-sm text-gray-300">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Logo */}
          <Link to="/" className="mb-6">
            <img 
              src="/assets/logo.png" 
              alt="Padelmania Logo" 
              className="h-20 w-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'block';
              }}
            />
            <div 
              className="hidden text-2xl font-bold text-mint"
              style={{ display: 'none' }}
            >
              Padelmania
            </div>
          </Link>
          
          {/* Texto descriptivo */}
          <p className="text-gray-300 text-lg mb-8">
            En Padelmania creemos que cada punto es una oportunidad para cuidar tu rendimiento y tu bienestar. Productos de pádel con enfoque en la naturaleza del juego.
          </p>

          {/* Social links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-mint transition-colors"
                aria-label={`Seguinos en ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Next section preview */}
      <div className="border-t border-gray-600">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-mint">
              <span className="text-2xl">🌱</span>
              <span className="font-medium">Tips de pádel y bienestar — Próximamente</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Contenido exclusivo sobre técnicas, nutrición y bienestar para jugadores
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-600">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              © {currentYear} Padelmania. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;