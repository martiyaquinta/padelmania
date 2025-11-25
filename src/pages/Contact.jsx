import React, { useState } from 'react';
import { validateEmail } from '../utils/helpers';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simular envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-natural-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-2xl font-bold text-navy mb-4">
            ¡Mensaje enviado!
          </h1>
          <p className="text-gray-600 mb-8">
            Gracias por contactarnos. Te responderemos dentro de las próximas 24 horas.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
            >
              Enviar otro mensaje
            </button>
            <div>
              <a
                href="/"
                className="btn-secondary"
              >
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-natural-white">
      {/* Header */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contactanos
            </h1>
            <p className="text-xl text-gray-200">
              Estamos aquí para ayudarte. Escribinos y te responderemos a la brevedad.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Información de contacto */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">
                Múltiples formas de contacto
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Elegí la forma que más te convenga para comunicarte con nosotros. 
                Nuestro equipo está disponible para resolver todas tus dudas sobre 
                productos, envíos, pagos y cualquier consulta relacionada con Padelmania.
              </p>
            </div>

            {/* Métodos de contacto */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Chat en vivo</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Usá nuestro chat flotante para consultas inmediatas
                  </p>
                  <p className="text-mint text-sm font-medium">
                    Disponible 24/7 con respuestas automáticas
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-navy" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.479 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">WhatsApp</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Chateá directamente con nuestro equipo
                  </p>
                  <a
                    href="https://wa.me/5492261400285"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mint text-sm font-medium hover:text-navy transition-colors"
                  >
                    +54 9 226 140-0285
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Email</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Para consultas más detalladas
                  </p>
                  <a
                    href="mailto:info@padelmania.com"
                    className="text-mint text-sm font-medium hover:text-navy transition-colors"
                  >
                    info@padelmania.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-navy" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.342-1.297c-.894-.808-1.297-1.781-1.297-2.919c0-1.297.49-2.448 1.297-3.342c.808-.894 1.781-1.297 2.919-1.297c1.297 0 2.448.49 3.342 1.297c.894.808 1.297 1.781 1.297 2.919c0 1.297-.49 2.448-1.297 3.342c-.808.894-1.781 1.297-2.919 1.297zm7.83 0c-1.297 0-2.448-.49-3.342-1.297c-.894-.808-1.297-1.781-1.297-2.919c0-1.297.49-2.448 1.297-3.342c.808-.894 1.781-1.297 2.919-1.297c1.297 0 2.448.49 3.342 1.297c.894.808 1.297 1.781 1.297 2.919c0 1.297-.49 2.448-1.297 3.342c-.808.894-1.781 1.297-2.919 1.297z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1">Instagram</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Seguinos para novedades y tips
                  </p>
                  <a
                    href="https://instagram.com/padelmania"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mint text-sm font-medium hover:text-navy transition-colors"
                  >
                    @padelmania
                  </a>
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-semibold text-navy mb-4">Horarios de atención</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lunes a Viernes:</span>
                  <span className="text-navy font-medium">9:00 - 18:00 hs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sábados:</span>
                  <span className="text-navy font-medium">10:00 - 16:00 hs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Domingos:</span>
                  <span className="text-gray-500">Cerrado</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                * El chat automático está disponible 24/7
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-navy mb-6">
                Envianos un mensaje
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`input-base w-full ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Tu nombre"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`input-base w-full ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-navy mb-2">
                    Asunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`input-base w-full ${errors.subject ? 'border-red-500' : ''}`}
                  >
                    <option value="">Seleccioná un tema</option>
                    <option value="producto">Consulta sobre productos</option>
                    <option value="envio">Información de envío</option>
                    <option value="pago">Métodos de pago</option>
                    <option value="devolucion">Cambios y devoluciones</option>
                    <option value="garantia">Garantía</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`input-base w-full resize-none ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Contanos en qué podemos ayudarte..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Mínimo 10 caracteres
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                      Enviando...
                    </>
                  ) : (
                    'Enviar mensaje'
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Al enviar este formulario aceptás nuestros términos de uso y política de privacidad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-navy mb-8">
              Preguntas frecuentes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-navy mb-2">¿Cuánto demora el envío?</h3>
                <p className="text-sm text-gray-600">
                  Los envíos demoran entre 3-5 días hábiles dentro del país. 
                  Envío gratis en compras superiores a $50.000.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-navy mb-2">¿Puedo cambiar un producto?</h3>
                <p className="text-sm text-gray-600">
                  Sí, tenés 30 días para cambios por talle, color o producto 
                  diferente. El producto debe estar sin uso.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-navy mb-2">¿Qué métodos de pago aceptan?</h3>
                <p className="text-sm text-gray-600">
                  Aceptamos pago por transferencia bancaria. 
                  Coordinamos todos los detalles por WhatsApp.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-navy mb-2">¿Los productos tienen garantía?</h3>
                <p className="text-sm text-gray-600">
                  Todos nuestros productos cuentan con garantía oficial. 
                  Los tiempos varían según el fabricante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;