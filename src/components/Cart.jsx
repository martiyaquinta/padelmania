import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartProvider';
import { formatCurrency } from '../utils/currency';
import Modal from './Modal';
import { WHATSAPP_NUMBER, WHATSAPP_CONFIG } from '../config/whatsapp';

const Cart = ({ isOpen, onClose }) => {
  const { 
    items, 
    itemCount, 
    total, 
    updateQuantity, 
    removeFromCart, 
    clearCart
  } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    // Generar mensaje para WhatsApp con el resumen del pedido
    let mensaje = '*🛒 Nuevo Pedido - Padelmania*\n\n';
    mensaje += '*Productos:*\n';
    
    items.forEach((item, index) => {
      mensaje += `${index + 1}. ${item.title}\n`;
      mensaje += `   • Cantidad: ${item.quantity}\n`;
      mensaje += `   • Precio: ${formatCurrency(item.price)}\n`;
      mensaje += `   • Subtotal: ${formatCurrency(item.price * item.quantity)}\n\n`;
    });
    
    mensaje += `*Total: ${formatCurrency(total)}*\n`;
    
    // Agregar info de envío si está configurado
    if (WHATSAPP_CONFIG.includeShippingInfo) {
      if (total >= 50000) {
        mensaje += `*Envío: GRATIS* ✅\n`;
      } else {
        mensaje += `*Envío: A coordinar*\n`;
      }
    }
    
    mensaje += `\n${WHATSAPP_CONFIG.footerText}`;
    
    // Codificar el mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Crear URL de WhatsApp
    const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeCodificado}`;
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(urlWhatsApp, '_blank');
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

            {/* Información de pago */}
            <div className="bg-mint bg-opacity-20 p-4 rounded-xl mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-navy" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium text-navy">Pago por transferencia</span>
              </div>
              <p className="text-sm text-navy">
                Coordiná el pago por WhatsApp con transferencia bancaria
              </p>
            </div>

            {/* Envío */}
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-gray-600">Envío</span>
              <span className="text-green-600 font-medium">
                {total >= 50000 ? 'GRATIS' : 'A coordinar'}
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
                className="w-full btn-primary py-4 text-lg font-semibold flex items-center justify-center space-x-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Pedir por WhatsApp</span>
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