import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartProvider';
import { formatCurrency, calculateDiscount, calculateInstallments } from '../utils/currency';
import { getRecommendedProducts } from '../utils/helpers';
import ProductCard from './ProductCard';
import productsData from '../data/products.json';

const ProductDetail = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showLightbox, setShowLightbox] = useState(false);
  const [aiDescription, setAiDescription] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  
  const { addToCart, isInCart, getProductQuantity } = useCart();
  
  const discountInfo = calculateDiscount(product.price, product.oldPrice);
  const installmentInfo = calculateInstallments(product.price);
  const isProductInCart = isInCart(product.id);
  const quantityInCart = getProductQuantity(product.id);
  const recommendedProducts = getRecommendedProducts(
    productsData.products, 
    product.id, 
    product.category, 
    3
  );

  const getStockStatus = () => {
    if (product.stock === 0) return { text: 'Sin stock', color: 'text-red-500', available: false };
    if (product.stock <= 5) return { text: `Últimas ${product.stock} unidades`, color: 'text-orange-500', available: true };
    return { text: 'En stock', color: 'text-green-500', available: true };
  };

  const stockStatus = getStockStatus();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const generateAIDescription = () => {
    setIsGeneratingAI(true);
    
    // Simular generación de IA con diferentes respuestas según el producto
    const aiDescriptions = {
      '1': "Pelota PadelNature Pro: Sentí la energía del juego y la suavidad del impacto, creada para quienes viven el pádel con pasión. Su construcción premium te conecta con cada punto como una extensión natural de tu técnica.",
      '2': "EcoSpin Soft: La pelota que respeta tu aprendizaje y el medio ambiente. Cada rebote es una oportunidad de crecer, diseñada para que sientas la confianza desde el primer golpe hasta el último punto.",
      '3': "Grip Wave Control: Tu conexión perfecta con la pala. Sentí cómo cada movimiento se transmite con precisión absoluta, donde el control y la comodidad se encuentran en armonía natural.",
      '4': "Cubregrip EcoFeel: La textura que habla tu idioma de juego. Fabricado pensando en la sostenibilidad y en esas sensaciones únicas que solo un verdadero jugador puede apreciar.",
      '5': "Gorra AirFlow Verde: Protección que fluye contigo. Cuando el sol es intenso y el juego se alarga, sentí la libertad de moverte sin límites bajo su cuidado técnico.",
      '6': "Gorra ArenaWave: Elegancia que acompaña tu estilo. Inspirada en las texturas naturales de la arena y las olas, para jugadores que entienden que el pádel es arte en movimiento.",
      '7': "Muñequera SoftShield Azul: Tu escudo contra la humedad, tu aliado en cada intercambio. Tecnología que desaparece en tu muñeca para que solo sientas el juego puro.",
      '8': "Muñequera FreshGrip Blanca: Frescura que perdura partido tras partido. Sentí la diferencia de jugar con las manos secas y libres, porque tu rendimiento no conoce de interrupciones."
    };

    setTimeout(() => {
      setAiDescription(aiDescriptions[product.id] || "Este producto está diseñado para elevar tu experiencia de juego, combinando tecnología avanzada con la pasión por el pádel que caracteriza a Padelmania.");
      setIsGeneratingAI(false);
    }, 2000 + Math.random() * 1000); // 2-3 segundos
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          {/* Imagen principal */}
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
            <img
              src={product.images[selectedImageIndex]}
              alt={`${product.title} - Vista ${selectedImageIndex + 1}`}
              className="w-full h-full object-cover cursor-zoom-in"
              onClick={() => setShowLightbox(true)}
              onError={(e) => {
                e.target.src = '/assets/images/placeholder-product.jpg';
              }}
            />
            
            {/* Badge de descuento */}
            {discountInfo.hasDiscount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
                -{discountInfo.discountPercentage}%
              </div>
            )}
            
            {/* Badge de stock bajo */}
            {product.stock <= 5 && product.stock > 0 && (
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                ¡Últimas unidades!
              </div>
            )}
          </div>

          {/* Miniaturas */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === selectedImageIndex 
                      ? 'border-mint' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} - Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/placeholder-product.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500">
            <Link to="/" className="hover:text-navy">Inicio</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-navy">Tienda</Link>
            <span className="mx-2">/</span>
            <Link to={`/shop?category=${product.category}`} className="hover:text-navy capitalize">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-navy">{product.title}</span>
          </nav>

          {/* Título y categoría */}
          <div>
            <p className="text-mint font-medium capitalize mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold text-navy mb-4">{product.title}</h1>
            
            {/* Stock status */}
            <p className={`font-medium ${stockStatus.color}`}>
              {stockStatus.text}
            </p>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-mint bg-opacity-20 text-navy px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Precio */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-4xl font-bold text-navy">
                {formatCurrency(product.price)}
              </span>
              {discountInfo.hasDiscount && (
                <span className="text-2xl text-gray-400 line-through">
                  {formatCurrency(product.oldPrice)}
                </span>
              )}
            </div>
            
            {/* Cuotas */}
            <p className="text-mint font-medium">
              {installmentInfo.description}
            </p>
            
            {discountInfo.hasDiscount && (
              <p className="text-green-600 font-medium">
                ¡Ahorrás {formatCurrency(discountInfo.savings)}!
              </p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <h3 className="font-semibold text-navy mb-3">Descripción</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Botón generar descripción IA */}
          <div className="bg-gradient-to-r from-mint to-navy bg-opacity-10 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-navy">Descripción potenciada por IA</h4>
              <button
                onClick={generateAIDescription}
                disabled={isGeneratingAI}
                className="btn-secondary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingAI ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-navy border-t-transparent rounded-full mr-2"></span>
                    Generando...
                  </>
                ) : (
                  '✨ Generar descripción IA'
                )}
              </button>
            </div>
            
            {aiDescription && (
              <div className="bg-white bg-opacity-70 p-4 rounded-lg animate-fade-in">
                <p className="text-navy italic leading-relaxed">
                  "{aiDescription}"
                </p>
              </div>
            )}
            
            {!aiDescription && !isGeneratingAI && (
              <p className="text-gray-600 text-sm">
                Descubrí una descripción emocional única generada por IA para este producto.
              </p>
            )}
          </div>

          {/* Especificaciones */}
          {product.specifications && (
            <div>
              <h3 className="font-semibold text-navy mb-3">Especificaciones</h3>
              <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 capitalize">{key}:</span>
                    <span className="text-navy font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selector de cantidad y botones */}
          <div className="space-y-4">
            {stockStatus.available && (
              <div className="flex items-center space-x-4">
                <span className="font-medium text-navy">Cantidad:</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Disminuir cantidad"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Aumentar cantidad"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex gap-4">
              {stockStatus.available ? (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary py-4 text-lg font-semibold"
                >
                  Agregar al carrito
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 bg-gray-300 text-gray-500 py-4 text-lg font-semibold rounded-xl cursor-not-allowed"
                >
                  Sin stock
                </button>
              )}
              
              <button
                onClick={() => alert('Funcionalidad de lista de deseos en desarrollo')}
                className="p-4 border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all duration-300 rounded-xl"
                aria-label="Agregar a favoritos"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Indicador de producto en carrito */}
            {isProductInCart && (
              <div className="flex items-center justify-center space-x-2 text-mint font-medium bg-mint bg-opacity-10 py-3 rounded-xl">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Ya tenés {quantityInCart} unidad{quantityInCart !== 1 ? 'es' : ''} en tu carrito</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Productos recomendados */}
      {recommendedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-navy mb-8 text-center">
            También te puede interesar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((recommendedProduct) => (
              <ProductCard key={recommendedProduct.id} product={recommendedProduct} />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {showLightbox && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white text-3xl hover:text-mint transition-colors"
            aria-label="Cerrar lightbox"
          >
            ×
          </button>
          
          <img
            src={product.images[selectedImageIndex]}
            alt={`${product.title} - Vista ampliada`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === selectedImageIndex ? 'bg-mint' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;