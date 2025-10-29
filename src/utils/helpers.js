/**
 * Genera un ID único simple
 * @returns {string} - ID único
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Debounce function para búsquedas
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} - Función con debounce
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Scrollea suavemente a un elemento
 * @param {string} elementId - ID del elemento
 * @param {number} offset - Offset adicional (opcional)
 */
export const smoothScrollTo = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Filtra productos según criterios múltiples
 * @param {Array} products - Array de productos
 * @param {Object} filters - Filtros a aplicar
 * @returns {Array} - Productos filtrados
 */
export const filterProducts = (products, filters) => {
  return products.filter(product => {
    // Filtro por categoría
    if (filters.category && filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }

    // Filtro por rango de precio
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }

    // Filtro por búsqueda de texto
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const productText = `${product.title} ${product.description} ${product.tags?.join(' ')}`.toLowerCase();
      if (!productText.includes(searchLower)) {
        return false;
      }
    }

    // Filtro por tags
    if (filters.tags && filters.tags.length > 0) {
      const hasTag = filters.tags.some(tag => product.tags?.includes(tag));
      if (!hasTag) {
        return false;
      }
    }

    // Filtro por disponibilidad
    if (filters.inStock && product.stock === 0) {
      return false;
    }

    return true;
  });
};

/**
 * Ordena productos según criterio
 * @param {Array} products - Array de productos
 * @param {string} sortBy - Criterio de ordenamiento
 * @returns {Array} - Productos ordenados
 */
export const sortProducts = (products, sortBy) => {
  const productsCopy = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return productsCopy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return productsCopy.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return productsCopy.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return productsCopy.sort((a, b) => b.title.localeCompare(a.title));
    case 'newest':
      return productsCopy.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    default:
      return productsCopy;
  }
};

/**
 * Obtiene productos recomendados basados en categoría
 * @param {Array} products - Todos los productos
 * @param {string} currentProductId - ID del producto actual
 * @param {string} category - Categoría del producto actual
 * @param {number} limit - Número máximo de recomendaciones
 * @returns {Array} - Productos recomendados
 */
export const getRecommendedProducts = (products, currentProductId, category, limit = 3) => {
  return products
    .filter(product => 
      product.id !== currentProductId && 
      product.category === category &&
      product.stock > 0
    )
    .slice(0, limit);
};

/**
 * Trunca texto a un número específico de palabras
 * @param {string} text - Texto a truncar
 * @param {number} wordLimit - Límite de palabras
 * @returns {string} - Texto truncado
 */
export const truncateText = (text, wordLimit = 20) => {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

/**
 * Valida email simple
 * @param {string} email - Email a validar
 * @returns {boolean} - Es válido o no
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export default {
  generateId,
  debounce,
  smoothScrollTo,
  filterProducts,
  sortProducts,
  getRecommendedProducts,
  truncateText,
  validateEmail
};