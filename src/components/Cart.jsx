import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartProvider';
import { formatCurrency } from '../utils/currency';
import Modal from './Modal';

const Cart = ({ isOpen, onClose }) => {
  const { 
    items, 
    itemCount, 
    total, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getInstallmentInfo 
  } = useCart();

  const installmentInfo = getInstallmentInfo();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    // Aquí iría la integración con el sistema de pagos
    alert('¡Funcionalidad de checkout en desarrollo! 🚧\n\nEsta es una demostración. En un entorno real, aquí se integraría con:\n- MercadoPago\n- Stripe\n- PayPal\n- O la pasarela de pagos preferida');
  };

  const EmptyCart = () => (
    <div className="p-6 text-center">
      <div className="text-6xl mb-4">🛒</div>
      <h3 className="text-xl font-semibold text-navy mb-2">
        Tu carrito está vacío
      </h3>
      <p className="text-gray-600 mb-6">
        Descubrí nuestros productos y empezá a armar tu pedido
      </p>
      <Link
        to="/shop"
        onClick={onClose}
        className="btn-primary inline-block"
      >
        Ver productos
      </Link>
    </div>
  );

  const CartItem = ({ item }) => (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-100">
      {/* Imagen */}
      <Link 
        to={`/product/${item.id}`}
        onClick={onClose}
        className="flex-shrink-0"
      >
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-16 h-16 object-cover rounded-lg"
          onError={(e) => {
            e.target.src = '/assets/images/placeholder-product.jpg';
          }}
        />
      </Link>

      {/* Información del producto */}
      <div className="flex-1 min-w-0">
        <Link 
          to={`/product/${item.id}`}
          onClick={onClose}
          className="block"
        >
          <h4 className="font-medium text-navy hover:text-mint transition-colors truncate">
            {item.title}
          </h4>
        </Link>
        <p className="text-sm text-gray-500 capitalize">
          {item.category}
        </p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="font-semibold text-navy">
            {formatCurrency(item.price)}
          </span>
          {item.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatCurrency(item.oldPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Controles de cantidad */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          aria-label="Disminuir cantidad"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <span className="w-8 text-center font-medium">
          {item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          aria-label="Aumentar cantidad"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {/* Botón eliminar */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        aria-label={`Eliminar ${item.title} del carrito`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Carrito de compras ${itemCount > 0 ? `(${itemCount})` : ''}`}
      size="md"
      className="max-h-[90vh]"
    >
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {/* Items del carrito */}
          <div className="max-h-96 overflow-y-auto">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Resumen */}
          <div className="p-6 bg-gray-50">
            {/* Subtotal */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-navy">
                {formatCurrency(total)}
              </span>
            </div>

            {/* Información de cuotas */}
            <div className="bg-mint bg-opacity-20 p-4 rounded-xl mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-navy" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium text-navy">Cuotas sin interés</span>
              </div>
              <p className="text-sm text-navy">
                {installmentInfo.description}
              </p>
            </div>

            {/* Envío */}
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-gray-600">Envío</span>
              <span className="text-green-600 font-medium">
                {total >= 50000 ? 'GRATIS' : 'Calculá en checkout'}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold text-navy border-t pt-4">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>

            {/* Acciones */}
            <div className="mt-6 space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full btn-primary py-4 text-lg font-semibold"
              >
                Finalizar compra
              </button>
              
              <div className="flex space-x-3">
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="flex-1 text-center bg-white border-2 border-navy text-navy px-4 py-3 rounded-xl font-medium hover:bg-navy hover:text-white transition-all duration-300"
                >
                  Seguir comprando
                </Link>
                
                <button
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de que querés vaciar el carrito?')) {
                      clearCart();
                    }
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="text-xs text-gray-600">
                  <div className="text-mint text-lg mb-1">🚚</div>
                  <span>Envío rápido</span>
                </div>
                <div className="text-xs text-gray-600">
                  <div className="text-mint text-lg mb-1">🔒</div>
                  <span>Compra segura</span>
                </div>
                <div className="text-xs text-gray-600">
                  <div className="text-mint text-lg mb-1">✅</div>
                  <span>Garantía oficial</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;