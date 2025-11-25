import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hola 👋 Soy tu asistente Padelmania. ¿Querés ayuda para encontrar el producto ideal o conocer más sobre bienestar y pádel?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    { text: "🔍 Buscar productos", action: "search" },
    { text: "🏷️ Ver promociones", action: "promos" },
    { text: "📞 Contacto", action: "contact" },
    { text: "💡 Recomendar", action: "recommend" }
  ];

  const addMessage = (text, isBot = false) => {
    const newMessage = {
      id: Date.now(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (responseText) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(responseText, true);
    }, 1000 + Math.random() * 1000); // 1-2 segundos
  };

  const getRandomProducts = (count = 3) => {
    const shuffled = [...productsData.products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleQuickReply = (action) => {
    switch (action) {
      case "search":
        addMessage("Quiero buscar productos", false);
        simulateTyping("¡Perfecto! Podés usar nuestro buscador en la parte superior o visitá nuestra tienda para ver todos los productos disponibles. ¿Buscás algo específico como pelotas, grips o accesorios?");
        break;
        
      case "promos":
        addMessage("Quiero ver las promociones", false);
        simulateTyping("🎉 ¡Tenemos ofertas increíbles! Productos con hasta 25% de descuento y envío gratis en compras superiores a $50.000. ¡Aprovechá!");
        break;
        
      case "contact":
        addMessage("Necesito contacto", false);
        simulateTyping("📞 Podés contactarnos por:\n• WhatsApp: +54 11 1234-5678\n• Email: info@padelmania.com\n• Instagram: @padelmania\n\n¡Estamos para ayudarte!");
        break;
        
      case "recommend":
        addMessage("Recomendar productos", false);
        const recommendations = getRandomProducts();
        const recoText = `🌟 Te recomiendo estos productos populares:\n\n${recommendations.map(p => `• ${p.title} - $${p.price.toLocaleString()}`).join('\n')}\n\n¡Todos con excelentes reviews!`;
        simulateTyping(recoText);
        break;
        
      default:
        break;
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    addMessage(userMessage, false);
    setInputMessage('');

    // Generar respuesta basada en el mensaje
    let botResponse = "";
    
    if (userMessage.toLowerCase().includes('recomendar') || userMessage.toLowerCase().includes('recomend')) {
      const recommendations = getRandomProducts();
      botResponse = `🌟 Basándome en tu consulta, te recomiendo:\n\n${recommendations.map(p => `• ${p.title} - $${p.price.toLocaleString()}`).join('\n')}\n\n¿Te interesa alguno de estos?`;
    } else if (userMessage.toLowerCase().includes('precio') || userMessage.toLowerCase().includes('costo')) {
      botResponse = "💰 Envío gratis en compras desde $50.000. Los precios van desde $8.000 hasta $25.000. ¿Buscás algo en particular?";
    } else if (userMessage.toLowerCase().includes('envío') || userMessage.toLowerCase().includes('envio')) {
      botResponse = "🚚 Ofrecemos envío gratis en compras superiores a $50.000. Para compras menores, el costo de envío se calcula en el checkout según tu ubicación. ¡Los envíos llegan en 3-5 días hábiles!";
    } else if (userMessage.toLowerCase().includes('cuotas') || userMessage.toLowerCase().includes('pago')) {
      botResponse = "💳 Aceptamos pago por transferencia bancaria. Coordinamos todos los detalles por WhatsApp. ¡Es rápido y seguro!";
    } else if (userMessage.toLowerCase().includes('stock') || userMessage.toLowerCase().includes('disponible')) {
      botResponse = "📦 Mantenemos stock actualizado en tiempo real. Si un producto figura como disponible, lo tenemos listo para enviar. ¿Hay algún producto específico que te interese?";
    } else if (userMessage.toLowerCase().includes('pelota')) {
      botResponse = "🎾 Tenemos pelotas de diferentes tipos: PadelNature Pro para jugadores avanzados y EcoSpin Soft para principiantes. Ambas con excelente calidad. ¿Cuál es tu nivel de juego?";
    } else if (userMessage.toLowerCase().includes('grip')) {
      botResponse = "🎯 Nuestros grips Wave Control y EcoFeel son ideales para mejorar tu agarre. El Wave Control es premium con máxima absorción, perfecto para jugadores exigentes. ¿Preferís grip o cubregrip?";
    } else if (userMessage.toLowerCase().includes('gorra') || userMessage.toLowerCase().includes('accesorio')) {
      botResponse = "🧢 Tenemos gorras técnicas con protección UV y muñequeras con tecnología antibacterial. Perfectas para largas sesiones de juego. ¿Buscás protección solar o absorción de humedad?";
    } else {
      botResponse = "Gracias por tu consulta. Para ayudarte mejor, podés usar los botones de acceso rápido o visitá nuestra tienda para ver todos los productos. ¿Hay algo específico que te interese?";
    }

    simulateTyping(botResponse);
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-mint text-navy rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center ${
          isOpen ? 'rotate-45' : 'hover:scale-110'
        }`}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat de ayuda"}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl z-30 flex flex-col overflow-hidden animate-slide-in">
          {/* Header */}
          <div className="bg-navy text-white p-4 flex items-center space-x-3">
            <div className="w-8 h-8 bg-mint rounded-full flex items-center justify-center">
              <span className="text-navy font-bold text-sm">PM</span>
            </div>
            <div>
              <h3 className="font-semibold">Asistente Padelmania</h3>
              <p className="text-xs text-mint">En línea • Respuesta inmediata</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl whitespace-pre-line ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      : 'bg-navy text-white rounded-br-sm'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-2xl rounded-bl-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {messages.length === 1 && (
            <div className="p-3 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.action}
                    onClick={() => handleQuickReply(reply.action)}
                    className="text-xs bg-gray-100 hover:bg-mint hover:text-navy transition-colors px-3 py-2 rounded-lg text-left"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribí tu consulta..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mint focus:border-transparent"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="bg-navy text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Enviar mensaje"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;