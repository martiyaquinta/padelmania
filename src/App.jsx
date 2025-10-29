import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ChatBot from './components/ChatBot';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <CartProvider>
      <div className="App min-h-screen flex flex-col">
        {/* Header */}
        <Header onCartOpen={handleCartOpen} />
        
        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* 404 Route */}
            <Route path="*" element={
              <div className="min-h-screen bg-natural-white flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h1 className="text-2xl font-bold text-navy mb-2">
                    Página no encontrada
                  </h1>
                  <p className="text-gray-600 mb-6">
                    La página que buscás no existe o ha sido movida.
                  </p>
                  <div className="space-x-4">
                    <a href="/" className="btn-primary">
                      Volver al inicio
                    </a>
                    <a href="/shop" className="btn-secondary">
                      Ver productos
                    </a>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Cart Modal */}
        <Cart isOpen={isCartOpen} onClose={handleCartClose} />
        
        {/* ChatBot */}
        <ChatBot />
      </div>
    </CartProvider>
  );
}

export default App;