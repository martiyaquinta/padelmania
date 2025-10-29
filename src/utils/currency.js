/**
 * Formatea un número como moneda en pesos argentinos
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - Cantidad formateada como moneda
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calcula el precio con descuento
 * @param {number} price - Precio original
 * @param {number} oldPrice - Precio anterior (opcional)
 * @returns {object} - Objeto con precio, descuento, etc.
 */
export const calculateDiscount = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) {
    return {
      hasDiscount: false,
      price,
      oldPrice: null,
      discountPercentage: 0,
      savings: 0
    };
  }

  const discountPercentage = Math.round(((oldPrice - price) / oldPrice) * 100);
  const savings = oldPrice - price;

  return {
    hasDiscount: true,
    price,
    oldPrice,
    discountPercentage,
    savings
  };
};

/**
 * Calcula cuotas sin interés (simulado)
 * @param {number} amount - Monto total
 * @param {number} installments - Número de cuotas (default: 6)
 * @returns {object} - Información de cuotas
 */
export const calculateInstallments = (amount, installments = 6) => {
  const installmentAmount = Math.ceil(amount / installments);
  
  return {
    installments,
    installmentAmount,
    formattedInstallment: formatCurrency(installmentAmount),
    totalAmount: installmentAmount * installments,
    description: `${installments} cuotas sin interés de ${formatCurrency(installmentAmount)}`
  };
};

export default {
  formatCurrency,
  calculateDiscount,
  calculateInstallments
};