# 🚀 Instalación Rápida de Pasarelas de Pago

## Opción 1: Instalar todas las pasarelas

```bash
npm install @mercadopago/sdk-react @stripe/stripe-js @stripe/react-stripe-js @paypal/react-paypal-js
```

## Opción 2: Instalar solo la que necesites

### MercadoPago (Recomendado para Argentina/LATAM)
```bash
npm install @mercadopago/sdk-react
```

### Stripe (Internacional)
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### PayPal (Internacional)
```bash
npm install @paypal/react-paypal-js
```

---

## Configuración Post-Instalación

1. **Obtener credenciales:**
   - MercadoPago: https://www.mercadopago.com.ar/developers/panel/credentials
   - Stripe: https://dashboard.stripe.com/apikeys
   - PayPal: https://developer.paypal.com/dashboard/applications

2. **Agregar a `.env`:**
```bash
VITE_MERCADOPAGO_PUBLIC_KEY=TEST-tu-clave-aqui
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_tu-clave-aqui
VITE_PAYPAL_CLIENT_ID=tu-client-id-aqui
```

3. **Desplegar a Vercel:**
```bash
vercel env add VITE_MERCADOPAGO_PUBLIC_KEY production
vercel env add VITE_STRIPE_PUBLISHABLE_KEY production
vercel env add VITE_PAYPAL_CLIENT_ID production
vercel --prod
```

---

## ⚡ Testing sin instalar

El componente ya funciona en **modo simulación** sin instalar nada.  
Las integraciones reales se activan cuando:
1. Instalás los paquetes npm
2. Configurás las credenciales
3. Implementás el backend

**Ver guía completa:** `/docs/PAYMENT_INTEGRATION.md`
