import React, { useState } from 'react';
import { formatCurrency } from '../utils/currency';

/**
 * PaymentIntegration Component
 * 
 * Componente para integrar múltiples pasarelas de pago.
 * Permite seleccionar entre MercadoPago, Stripe y PayPal.
 * 
 * Para integrar las pasarelas reales:
 * 
 * 1. MERCADOPAGO (Argentina/LATAM)
 *    npm install @mercadopago/sdk-react
 *    Docs: https://github.com/mercadopago/sdk-react
 *    
 *    import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
 *    initMercadoPago('YOUR_PUBLIC_KEY');
 * 
 * 2. STRIPE (Internacional)
 *    npm install @stripe/stripe-js @stripe/react-stripe-js
 *    Docs: https://stripe.com/docs/stripe-js/react
 *    
 *    import { loadStripe } from '@stripe/stripe-js';
 *    import { Elements, CardElement } from '@stripe/react-stripe-js';
 * 
 * 3. PAYPAL (Internacional)
 *    npm install @paypal/react-paypal-js
 *    Docs: https://developer.paypal.com/docs/checkout/
 *    
 *    import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
 */

const PaymentIntegration = ({ total, items, onSuccess, onCancel }) => {
  const [selectedMethod, setSelectedMethod] = useState('mercadopago');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'mercadopago',
      name: 'MercadoPago',
      icon: '💳',
      description: 'Tarjetas, efectivo y transferencia',
      popular: true,
      region: 'LATAM',
      fees: '3.99% + IVA',
      installments: 'Hasta 12 cuotas sin interés',
    },
    {
      id: 'stripe',
      name: 'Stripe',
      icon: '💎',
      description: 'Tarjetas internacionales',
      popular: false,
      region: 'Internacional',
      fees: '2.9% + $0.30 USD',
      installments: 'No disponible',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: 'Cuenta PayPal o tarjetas',
      popular: false,
      region: 'Internacional',
      fees: '3.4% + comisión fija',
      installments: 'Según disponibilidad',
    },
  ];

  // INTEGRACIÓN MERCADOPAGO
  const handleMercadoPagoCheckout = async () => {
    setIsProcessing(true);
    
    try {
      // TODO: Implementar integración real
      // 1. Crear preferencia de pago en tu backend
      const preference = await createMercadoPagoPreference();
      
      // 2. Redirigir al checkout de MercadoPago
      // window.location.href = preference.init_point;
      
      // 3. O usar el componente Wallet para checkout embebido
      // <Wallet initialization={{ preferenceId: preference.id }} />
      
      console.log('MercadoPago - Items:', items);
      console.log('MercadoPago - Total:', total);
      
      // Simulación para demo
      await simulatePaymentProcess();
      onSuccess({
        method: 'mercadopago',
        transactionId: `MP-${Date.now()}`,
        amount: total,
      });
      
    } catch (error) {
      console.error('Error en MercadoPago:', error);
      alert('Error al procesar el pago con MercadoPago');
    } finally {
      setIsProcessing(false);
    }
  };

  // INTEGRACIÓN STRIPE
  const handleStripeCheckout = async () => {
    setIsProcessing(true);
    
    try {
      // TODO: Implementar integración real
      // 1. Crear sesión de checkout en tu backend
      const session = await createStripeCheckoutSession();
      
      // 2. Redirigir al checkout de Stripe
      // const stripe = await loadStripe('pk_test_YOUR_PUBLIC_KEY');
      // await stripe.redirectToCheckout({ sessionId: session.id });
      
      // 3. O usar Elements para checkout embebido
      // <Elements stripe={stripePromise}>
      //   <CheckoutForm />
      // </Elements>
      
      console.log('Stripe - Items:', items);
      console.log('Stripe - Total:', total);
      
      // Simulación para demo
      await simulatePaymentProcess();
      onSuccess({
        method: 'stripe',
        transactionId: `STRIPE-${Date.now()}`,
        amount: total,
      });
      
    } catch (error) {
      console.error('Error en Stripe:', error);
      alert('Error al procesar el pago con Stripe');
    } finally {
      setIsProcessing(false);
    }
  };

  // INTEGRACIÓN PAYPAL
  const handlePayPalCheckout = async () => {
    setIsProcessing(true);
    
    try {
      // TODO: Implementar integración real
      // 1. Crear orden en tu backend
      const order = await createPayPalOrder();
      
      // 2. Usar componente PayPalButtons
      // <PayPalButtons
      //   createOrder={(data, actions) => {
      //     return actions.order.create({
      //       purchase_units: [{
      //         amount: { value: total }
      //       }]
      //     });
      //   }}
      //   onApprove={async (data, actions) => {
      //     const details = await actions.order.capture();
      //     onSuccess(details);
      //   }}
      // />
      
      console.log('PayPal - Items:', items);
      console.log('PayPal - Total:', total);
      
      // Simulación para demo
      await simulatePaymentProcess();
      onSuccess({
        method: 'paypal',
        transactionId: `PAYPAL-${Date.now()}`,
        amount: total,
      });
      
    } catch (error) {
      console.error('Error en PayPal:', error);
      alert('Error al procesar el pago con PayPal');
    } finally {
      setIsProcessing(false);
    }
  };

  // Funciones auxiliares para backend (implementar en tu API)
  const createMercadoPagoPreference = async () => {
    // TODO: Llamar a tu backend
    // const response = await fetch('/api/mercadopago/create-preference', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ items, total })
    // });
    // return await response.json();
    
    return {
      id: 'demo-preference-id',
      init_point: 'https://www.mercadopago.com/checkout/demo'
    };
  };

  const createStripeCheckoutSession = async () => {
    // TODO: Llamar a tu backend
    // const response = await fetch('/api/stripe/create-checkout-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ items, total })
    // });
    // return await response.json();
    
    return {
      id: 'demo-session-id',
    };
  };

  const createPayPalOrder = async () => {
    // TODO: Llamar a tu backend
    // const response = await fetch('/api/paypal/create-order', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ items, total })
    // });
    // return await response.json();
    
    return {
      id: 'demo-order-id',
    };
  };

  // Simulación de proceso de pago (remover en producción)
  const simulatePaymentProcess = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  };

  const handleProceedToPayment = () => {
    switch (selectedMethod) {
      case 'mercadopago':
        handleMercadoPagoCheckout();
        break;
      case 'stripe':
        handleStripeCheckout();
        break;
      case 'paypal':
        handlePayPalCheckout();
        break;
      default:
        alert('Seleccioná un método de pago');
    }
  };

  return (
    <div className="space-y-6">
      {/* Resumen de compra */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-semibold text-navy mb-3">Resumen de tu compra</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {items.length} {items.length === 1 ? 'producto' : 'productos'}
            </span>
            <span className="font-medium">{formatCurrency(total)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Envío</span>
            <span className="text-green-600 font-medium">
              {total >= 50000 ? 'GRATIS' : 'A calcular'}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t text-lg font-bold text-navy">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Selección de método de pago */}
      <div>
        <h3 className="font-semibold text-navy mb-4">Elegí tu método de pago</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedMethod === method.id
                  ? 'border-mint bg-mint bg-opacity-10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-3xl">{method.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-navy">
                      {method.name}
                    </span>
                    {method.popular && (
                      <span className="bg-mint text-white text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {method.region}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {method.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>💰 {method.fees}</span>
                    <span>📊 {method.installments}</span>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === method.id
                      ? 'border-mint bg-mint'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedMethod === method.id && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Información importante */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <span className="text-blue-500 text-xl">ℹ️</span>
          <div className="text-sm text-blue-900">
            <p className="font-medium mb-1">Información importante</p>
            <p>
              Esta es una demostración. Para usar los métodos de pago reales,
              necesitás configurar las credenciales de cada pasarela en tu backend
              y completar la integración según la documentación oficial.
            </p>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex space-x-3">
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          disabled={isProcessing}
        >
          Volver
        </button>
        <button
          onClick={handleProceedToPayment}
          className="flex-1 btn-primary py-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Procesando...
            </span>
          ) : (
            `Pagar ${formatCurrency(total)}`
          )}
        </button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t">
        <div className="text-xs text-gray-600">
          <div className="text-green-500 text-lg mb-1">🔒</div>
          <span>Pago seguro SSL</span>
        </div>
        <div className="text-xs text-gray-600">
          <div className="text-green-500 text-lg mb-1">✅</div>
          <span>Verificado</span>
        </div>
        <div className="text-xs text-gray-600">
          <div className="text-green-500 text-lg mb-1">🛡️</div>
          <span>Protección al comprador</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentIntegration;
