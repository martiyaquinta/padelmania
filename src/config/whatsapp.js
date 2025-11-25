// Configuración de WhatsApp para el carrito
// Formato: código de país + código de área + número (sin espacios, guiones ni paréntesis)
// Ejemplo: 5491123456789 para Argentina (54) + Buenos Aires (11) + número

export const WHATSAPP_NUMBER = '5491234567890'; // ⚠️ REEMPLAZÁ CON TU NÚMERO REAL

export const WHATSAPP_CONFIG = {
  // Mensaje predeterminado cuando no hay items
  emptyCartMessage: 'Hola, quisiera hacer una consulta sobre los productos.',
  
  // Incluir resumen de envío en el mensaje
  includeShippingInfo: true,
  
  // Texto adicional al final del mensaje
  footerText: 'Quisiera coordinar el pago por transferencia. ¡Gracias!'
};
