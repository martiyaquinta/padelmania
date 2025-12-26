import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartProvider';
import { formatCurrency, calculateDiscount } from '../utils/currency';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart, getProductQuantity } = useCart();
  
  const discountInfo = calculateDiscount(product.price, product.oldPrice);
  const isProductInCart = isInCart(product.id);
  const quantityInCart = getProductQuantity(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const getStockStatus = () => {
    if (product.stock === 0) return { text: 'Sin stock', color: 'text-red-500' };
    return { text: 'En stock', color: 'text-green-500' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="card p-4 group relative overflow-hidden">
      {/* Badge de descuento */}
      {discountInfo.hasDiscount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold z-10">
          -{discountInfo.discountPercentage}%
        </div>
      )}

      {/* Imagen del producto */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square mb-4 bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = '/assets/images/placeholder-product.jpg';
            }}
          />
          
          {/* Overlay con botón de vista rápida */}
          <div className="absolute inset-0 bg-navy bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <span className="bg-white text-navy px-4 py-2 rounded-lg font-medium shadow-lg">
                Ver detalles
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Información del producto */}
      <div className="space-y-3">
        {/* Categoría */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 capitalize">
            {product.category}
          </span>
          <span className={`text-sm font-medium ${stockStatus.color}`}>
            {stockStatus.text}
          </span>
        </div>

        {/* Título */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-navy hover:text-mint transition-colors duration-300 line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-mint bg-opacity-20 text-navy px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {product.tags.length > 2 && (
              <span className="text-xs text-gray-400">
                +{product.tags.length - 2} más
              </span>
            )}
          </div>
        )}

        {/* Precio */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-navy">
              {formatCurrency(product.price)}
            </span>
            {discountInfo.hasDiscount && (
              <span className="text-lg text-gray-400 line-through">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-2 pt-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-white border-2 border-navy text-navy px-4 py-2 rounded-xl font-medium text-center hover:bg-navy hover:text-white transition-all duration-300"
          >
            Ver
          </Link>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'btn-primary hover:shadow-lg'
            }`}
            aria-label={`Agregar ${product.title} al carrito`}
          >
            {product.stock === 0 ? 'Sin stock' : 'Agregar'}
          </button>
        </div>

        {/* Indicador de producto en carrito */}
        {isProductInCart && (
          <div className="flex items-center justify-center space-x-2 text-mint text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>En tu carrito ({quantityInCart})</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;