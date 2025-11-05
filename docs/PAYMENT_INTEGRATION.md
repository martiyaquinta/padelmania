# 💳 Guía de Integración de Pasarelas de Pago

## Ubicación de la Integración

**Archivo principal:** `/src/components/PaymentIntegration.jsx`  
**Implementado en:** `/src/components/Cart.jsx` (línea 28-67)

## Estado Actual

✅ **Interfaz UI completa** con selección de métodos de pago  
✅ **3 pasarelas configurables:** MercadoPago, Stripe, PayPal  
✅ **Simulación funcional** para testing y demos  
⚠️ **Integración real pendiente** (requiere credenciales y backend)

---

## 🚀 Integración Paso a Paso

### 1️⃣ MercadoPago (Recomendado para Argentina/LATAM)

#### Instalación
```bash
npm install @mercadopago/sdk-react
```

#### Configuración
```javascript
// En PaymentIntegration.jsx línea 1
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Inicializar con tu Public Key
initMercadoPago('YOUR_PUBLIC_KEY'); // Obtener en: https://www.mercadopago.com.ar/developers
```

#### Backend (Node.js/Express ejemplo)
```javascript
// /api/mercadopago/create-preference
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

app.post('/api/mercadopago/create-preference', async (req, res) => {
  const { items, total } = req.body;
  
  const preference = {
    items: items.map(item => ({
      title: item.title,
      unit_price: item.price,
      quantity: item.quantity,
      currency_id: 'ARS', // o 'USD', 'BRL', etc.
    })),
    back_urls: {
      success: 'https://padelmania.com/payment/success',
      failure: 'https://padelmania.com/payment/failure',
      pending: 'https://padelmania.com/payment/pending'
    },
    auto_return: 'approved',
    notification_url: 'https://padelmania.com/api/mercadopago/webhook',
  };
  
  const response = await mercadopago.preferences.create(preference);
  res.json({ id: response.body.id, init_point: response.body.init_point });
});
```

#### Frontend
```javascript
// En PaymentIntegration.jsx - handleMercadoPagoCheckout (línea 65)
const handleMercadoPagoCheckout = async () => {
  setIsProcessing(true);
  
  try {
    // Crear preferencia llamando a tu backend
    const response = await fetch('/api/mercadopago/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, total })
    });
    
    const { id, init_point } = await response.json();
    
    // Opción A: Redirigir al checkout de MercadoPago
    window.location.href = init_point;
    
    // Opción B: Checkout embebido con Wallet component
    // return <Wallet initialization={{ preferenceId: id }} />;
    
  } catch (error) {
    console.error('Error:', error);
    alert('Error al procesar el pago');
  } finally {
    setIsProcessing(false);
  }
};
```

#### Variables de Entorno (.env)
```bash
VITE_MERCADOPAGO_PUBLIC_KEY=TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
# Backend
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

#### Webhooks (notificaciones IPN)
```javascript
app.post('/api/mercadopago/webhook', async (req, res) => {
  const { type, data } = req.body;
  
  if (type === 'payment') {
    const payment = await mercadopago.payment.get(data.id);
    
    if (payment.body.status === 'approved') {
      // Procesar orden exitosa
      // - Actualizar estado en BD
      // - Enviar email de confirmación
      // - Reducir stock
    }
  }
  
  res.sendStatus(200);
});
```

**Documentación oficial:** https://www.mercadopago.com.ar/developers/es/docs

---

### 2️⃣ Stripe (Internacional)

#### Instalación
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

#### Configuración
```javascript
// En PaymentIntegration.jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY');
```

#### Backend (Node.js/Express ejemplo)
```javascript
// /api/stripe/create-checkout-session
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/api/stripe/create-checkout-session', async (req, res) => {
  const { items } = req.body;
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.images[0]],
        },
        unit_amount: Math.round(item.price * 100), // Centavos
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: 'https://padelmania.com/payment/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://padelmania.com/payment/cancel',
  });
  
  res.json({ id: session.id, url: session.url });
});
```

#### Frontend (Checkout Redirect)
```javascript
// En PaymentIntegration.jsx - handleStripeCheckout (línea 93)
const handleStripeCheckout = async () => {
  setIsProcessing(true);
  
  try {
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    });
    
    const { url } = await response.json();
    window.location.href = url;
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsProcessing(false);
  }
};
```

#### Frontend (Checkout Embebido con Elements)
```javascript
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    
    if (!error) {
      // Enviar paymentMethod.id a tu backend
      const response = await fetch('/api/stripe/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          paymentMethodId: paymentMethod.id,
          amount: total * 100 
        })
      });
      
      const result = await response.json();
      if (result.success) onSuccess(result);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pagar</button>
    </form>
  );
};

// En el componente principal
return (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);
```

#### Variables de Entorno (.env)
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxx
# Backend
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxx
```

#### Webhooks
```javascript
app.post('/api/stripe/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Procesar orden exitosa
  }
  
  res.json({ received: true });
});
```

**Documentación oficial:** https://stripe.com/docs/payments

---

### 3️⃣ PayPal (Internacional)

#### Instalación
```bash
npm install @paypal/react-paypal-js
```

#### Configuración
```javascript
// En PaymentIntegration.jsx
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const initialOptions = {
  "client-id": "YOUR_CLIENT_ID",
  currency: "USD",
  intent: "capture",
};
```

#### Frontend
```javascript
// Envolver el componente con Provider
<PayPalScriptProvider options={initialOptions}>
  <PayPalButtons
    createOrder={(data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: (total / 1000).toFixed(2), // Convertir ARS a USD aprox
            currency_code: "USD"
          },
          description: `Padelmania Store - ${items.length} productos`
        }]
      });
    }}
    onApprove={async (data, actions) => {
      const details = await actions.order.capture();
      console.log('Pago completado:', details);
      
      onSuccess({
        method: 'paypal',
        transactionId: details.id,
        amount: total,
        details
      });
    }}
    onError={(err) => {
      console.error('Error en PayPal:', err);
      alert('Error al procesar el pago');
    }}
  />
</PayPalScriptProvider>
```

#### Backend (opcional para server-side)
```javascript
// /api/paypal/create-order
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

function environment() {
  let clientId = process.env.PAYPAL_CLIENT_ID;
  let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  
  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
  // Para producción: new checkoutNodeJssdk.core.LiveEnvironment(...)
}

const client = () => new checkoutNodeJssdk.core.PayPalHttpClient(environment());

app.post('/api/paypal/create-order', async (req, res) => {
  const { items, total } = req.body;
  
  const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: (total / 1000).toFixed(2)
      }
    }]
  });
  
  const order = await client().execute(request);
  res.json({ id: order.result.id });
});
```

#### Variables de Entorno (.env)
```bash
VITE_PAYPAL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# Backend
PAYPAL_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Documentación oficial:** https://developer.paypal.com/docs/checkout/

---

## 🔧 Configuración en Vercel

### Agregar Variables de Entorno

#### Opción 1: Dashboard de Vercel
1. Ir a https://vercel.com/dashboard
2. Seleccionar proyecto `padelmania-store`
3. Settings → Environment Variables
4. Agregar cada variable:
   - `VITE_MERCADOPAGO_PUBLIC_KEY`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `VITE_PAYPAL_CLIENT_ID`

#### Opción 2: Vercel CLI (ya instalado)
```bash
vercel env add VITE_MERCADOPAGO_PUBLIC_KEY production
vercel env add VITE_STRIPE_PUBLISHABLE_KEY production
vercel env add VITE_PAYPAL_CLIENT_ID production

# Redesplegar
vercel --prod
```

---

## 🧪 Testing

### Tarjetas de Prueba

#### MercadoPago (Modo TEST)
- **VISA aprobada:** 4509 9535 6623 3704
- **Mastercard rechazada:** 5031 7557 3453 0604
- **CVV:** Cualquier 3 dígitos
- **Vencimiento:** Cualquier fecha futura

#### Stripe (Test Mode)
- **Aprobada:** 4242 4242 4242 4242
- **Requiere autenticación:** 4000 0025 0000 3155
- **Declinada:** 4000 0000 0000 9995
- **CVV:** Cualquier 3 dígitos
- **Vencimiento:** Cualquier fecha futura

#### PayPal (Sandbox)
- Crear cuentas de prueba en: https://developer.paypal.com/dashboard/accounts
- Usuario: sb-xxxxx@personal.example.com
- Password: (la que configures)

---

## 📊 Comparación de Pasarelas

| Característica | MercadoPago | Stripe | PayPal |
|----------------|-------------|--------|--------|
| **Mejor para** | LATAM | Internacional | Internacional |
| **Comisión** | 3.99% + IVA | 2.9% + $0.30 | 3.4% + fija |
| **Cuotas sin interés** | ✅ Hasta 12 | ❌ | ⚠️ Depende |
| **Efectivo** | ✅ | ❌ | ❌ |
| **Transferencia** | ✅ | ⚠️ ACH | ❌ |
| **Setup** | Medio | Fácil | Fácil |
| **Documentación** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 🔒 Seguridad

### Checklist
- [ ] Usar HTTPS en producción
- [ ] Validar webhooks con firma/secret
- [ ] No exponer claves secretas en frontend
- [ ] Implementar rate limiting
- [ ] Validar montos en backend
- [ ] Guardar logs de transacciones
- [ ] Implementar detección de fraude
- [ ] Cumplir con PCI-DSS (si guardas tarjetas)

### Variables Sensibles
```bash
# ✅ En frontend (.env)
VITE_MERCADOPAGO_PUBLIC_KEY=...
VITE_STRIPE_PUBLISHABLE_KEY=...
VITE_PAYPAL_CLIENT_ID=...

# ❌ NUNCA en frontend - Solo backend
MERCADOPAGO_ACCESS_TOKEN=...
STRIPE_SECRET_KEY=...
PAYPAL_CLIENT_SECRET=...
```

---

## 🚀 Deployment

### 1. Instalar dependencias necesarias
```bash
npm install @mercadopago/sdk-react @stripe/stripe-js @stripe/react-stripe-js @paypal/react-paypal-js
```

### 2. Configurar variables de entorno
```bash
# Crear archivo .env.production
cp .env.example .env.production

# Editar y agregar tus claves reales
nano .env.production
```

### 3. Desplegar a Vercel
```bash
# Desplegar con nuevas variables
vercel --prod

# O usar auto-deploy desde GitHub
git add .
git commit -m "feat: integración de pasarelas de pago"
git push origin main
```

---

## 📚 Recursos Adicionales

### Documentación Oficial
- **MercadoPago:** https://www.mercadopago.com.ar/developers
- **Stripe:** https://stripe.com/docs
- **PayPal:** https://developer.paypal.com/home

### Comunidad y Soporte
- **MercadoPago Developers:** https://www.mercadopago.com.ar/developers/es/support
- **Stripe Discord:** https://discord.gg/stripe
- **PayPal Developer Community:** https://www.paypal-community.com/

### Testing Tools
- **Stripe CLI:** https://stripe.com/docs/stripe-cli
- **MercadoPago Postman:** https://www.mercadopago.com.ar/developers/es/guides/resources/postman
- **PayPal Sandbox:** https://developer.paypal.com/dashboard/accounts

---

## ✅ Próximos Pasos

1. **Elegir pasarela principal** (recomiendo MercadoPago para Argentina)
2. **Crear cuenta de desarrollador** en la pasarela elegida
3. **Obtener credenciales** (modo TEST primero)
4. **Implementar backend** (crear endpoints de API)
5. **Configurar webhooks** (para notificaciones)
6. **Testing exhaustivo** con tarjetas de prueba
7. **Pasar a producción** (credenciales LIVE)
8. **Monitorear transacciones** (dashboards de cada pasarela)

---

## 💡 Tips Finales

- **Empezá con modo TEST/Sandbox** antes de producción
- **MercadoPago es ideal para Argentina** (acepta cuotas y efectivo)
- **Stripe tiene mejor UX** pero es más para internacional
- **PayPal es conocido** pero tiene comisiones más altas
- **Implementá webhooks** para confirmar pagos de forma segura
- **Guardá logs detallados** de todas las transacciones
- **Testeá casos edge:** pagos rechazados, timeouts, etc.

---

**¿Preguntas?** Consultá la documentación oficial de cada pasarela o el código en `/src/components/PaymentIntegration.jsx`
