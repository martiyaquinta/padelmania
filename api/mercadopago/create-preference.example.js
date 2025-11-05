/**
 * Backend API de Ejemplo para MercadoPago
 * 
 * Este es un ejemplo de cómo implementar el backend para crear preferencias
 * de pago con MercadoPago.
 * 
 * OPCIONES DE IMPLEMENTACIÓN:
 * 
 * 1. VERCEL SERVERLESS FUNCTIONS (Recomendado)
 *    - Crear carpeta: /api/mercadopago/
 *    - Archivo: create-preference.js (este archivo)
 *    - Deploy automático con tu proyecto
 * 
 * 2. EXPRESS.JS SERVER
 *    - Servidor Node.js separado
 *    - Más control pero requiere hosting aparte
 * 
 * 3. NEXT.JS API ROUTES
 *    - Si migrás a Next.js en el futuro
 */

// ==============================================
// OPCIÓN 1: VERCEL SERVERLESS FUNCTION
// ==============================================
// Ubicación: /api/mercadopago/create-preference.js

import mercadopago from 'mercadopago';

// Configurar MercadoPago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN, // Token secreto (NO el public key)
});

export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, total } = req.body;

    // Validaciones
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items requeridos' });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ error: 'Total inválido' });
    }

    // Crear preferencia de pago
    const preference = {
      items: items.map(item => ({
        id: item.id?.toString() || '',
        title: item.title,
        description: `${item.category} - ${item.title}`,
        picture_url: item.images?.[0] || '',
        category_id: item.category || 'others',
        quantity: item.quantity,
        unit_price: item.price,
        currency_id: 'ARS', // Cambiar según tu país: ARS, USD, BRL, etc.
      })),
      
      // URLs de retorno
      back_urls: {
        success: `${process.env.VITE_APP_URL || 'http://localhost:5173'}/payment/success`,
        failure: `${process.env.VITE_APP_URL || 'http://localhost:5173'}/payment/failure`,
        pending: `${process.env.VITE_APP_URL || 'http://localhost:5173'}/payment/pending`,
      },
      
      // Configuración adicional
      auto_return: 'approved',
      binary_mode: false, // true = solo aprobado o rechazado, false = permite pendiente
      
      // Webhook para notificaciones IPN
      notification_url: `${process.env.VITE_API_URL || ''}/api/mercadopago/webhook`,
      
      // Información adicional
      external_reference: `ORDER-${Date.now()}`, // ID de tu orden interna
      
      // Métodos de pago permitidos
      payment_methods: {
        excluded_payment_methods: [], // Vacío = todos permitidos
        excluded_payment_types: [], // Excluir: ['ticket', 'atm'] para solo tarjetas
        installments: 12, // Máximo de cuotas
      },
      
      // Metadata (opcional)
      metadata: {
        order_date: new Date().toISOString(),
        items_count: items.length,
        total_amount: total,
      },
      
      // Expiración (opcional)
      expires: false,
      expiration_date_from: null,
      expiration_date_to: null,
    };

    // Crear preferencia en MercadoPago
    const response = await mercadopago.preferences.create(preference);

    // Guardar en tu base de datos (opcional pero recomendado)
    // await saveOrderToDatabase({
    //   preferenceId: response.body.id,
    //   items,
    //   total,
    //   status: 'pending',
    //   createdAt: new Date(),
    // });

    // Retornar la preferencia
    return res.status(200).json({
      id: response.body.id,
      init_point: response.body.init_point, // URL para redirección
      sandbox_init_point: response.body.sandbox_init_point, // URL de sandbox
    });

  } catch (error) {
    console.error('Error creando preferencia MercadoPago:', error);
    
    return res.status(500).json({
      error: 'Error al crear la preferencia de pago',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}

// ==============================================
// OPCIÓN 2: EXPRESS.JS SERVER
// ==============================================
/*
import express from 'express';
import mercadopago from 'mercadopago';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configurar MercadoPago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

// Endpoint para crear preferencia
app.post('/api/mercadopago/create-preference', async (req, res) => {
  try {
    const { items, total } = req.body;

    const preference = {
      items: items.map(item => ({
        title: item.title,
        quantity: item.quantity,
        unit_price: item.price,
        currency_id: 'ARS',
      })),
      back_urls: {
        success: 'https://tu-dominio.com/payment/success',
        failure: 'https://tu-dominio.com/payment/failure',
        pending: 'https://tu-dominio.com/payment/pending',
      },
      auto_return: 'approved',
      notification_url: 'https://tu-dominio.com/api/mercadopago/webhook',
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id, init_point: response.body.init_point });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear preferencia' });
  }
});

// Webhook para notificaciones IPN
app.post('/api/mercadopago/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const payment = await mercadopago.payment.get(data.id);
      
      console.log('Pago recibido:', {
        id: payment.body.id,
        status: payment.body.status,
        amount: payment.body.transaction_amount,
      });

      // Actualizar estado de la orden en tu base de datos
      if (payment.body.status === 'approved') {
        // await updateOrderStatus(payment.body.external_reference, 'paid');
        // await sendConfirmationEmail(payment.body.payer.email);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => {
  console.log('Backend escuchando en puerto 3001');
});
*/

// ==============================================
// VARIABLES DE ENTORNO NECESARIAS
// ==============================================
/*
# Backend (.env del servidor)
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NODE_ENV=production
VITE_APP_URL=https://padelmania-store.vercel.app
VITE_API_URL=https://tu-api.vercel.app

# Frontend (.env de React)
VITE_MERCADOPAGO_PUBLIC_KEY=APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Vercel
vercel env add MERCADOPAGO_ACCESS_TOKEN production
vercel env add NODE_ENV production
*/

// ==============================================
// INSTALACIÓN DE DEPENDENCIAS
// ==============================================
/*
# Para Vercel Serverless Functions
npm install mercadopago

# Para Express Server
npm install express mercadopago cors dotenv

# package.json
{
  "dependencies": {
    "mercadopago": "^2.0.11"
  }
}
*/

// ==============================================
// WEBHOOKS - MANEJO DE NOTIFICACIONES IPN
// ==============================================
// Ubicación: /api/mercadopago/webhook.js

export async function webhookHandler(req, res) {
  try {
    const { type, data } = req.body;

    console.log('Webhook recibido:', type, data);

    // Tipos de notificación:
    // - payment: Pago creado/actualizado
    // - plan: Plan de suscripción
    // - subscription: Suscripción
    // - invoice: Factura
    // - point_integration_wh: Punto de venta
    // - chargebacks: Contracargo

    if (type === 'payment') {
      // Obtener información completa del pago
      const payment = await mercadopago.payment.get(data.id);
      
      const paymentData = {
        id: payment.body.id,
        status: payment.body.status, // approved, pending, rejected, cancelled, refunded
        status_detail: payment.body.status_detail,
        amount: payment.body.transaction_amount,
        currency: payment.body.currency_id,
        payer_email: payment.body.payer?.email,
        external_reference: payment.body.external_reference,
        payment_method: payment.body.payment_method_id,
        installments: payment.body.installments,
        date_approved: payment.body.date_approved,
      };

      console.log('Pago procesado:', paymentData);

      // Actualizar estado en tu base de datos
      switch (payment.body.status) {
        case 'approved':
          // Orden pagada exitosamente
          // await updateOrderStatus(paymentData.external_reference, 'paid');
          // await reduceStock(paymentData.external_reference);
          // await sendConfirmationEmail(paymentData.payer_email);
          break;

        case 'pending':
          // Pago pendiente (ej: efectivo no pagado aún)
          // await updateOrderStatus(paymentData.external_reference, 'pending');
          break;

        case 'rejected':
          // Pago rechazado
          // await updateOrderStatus(paymentData.external_reference, 'failed');
          break;

        case 'cancelled':
          // Pago cancelado
          // await updateOrderStatus(paymentData.external_reference, 'cancelled');
          break;

        case 'refunded':
          // Pago reembolsado
          // await updateOrderStatus(paymentData.external_reference, 'refunded');
          // await restoreStock(paymentData.external_reference);
          break;
      }
    }

    // IMPORTANTE: Siempre responder 200 aunque haya error interno
    // para que MercadoPago no reintente infinitamente
    res.status(200).send('OK');

  } catch (error) {
    console.error('Error en webhook:', error);
    res.status(200).send('OK'); // Responder 200 de todas formas
  }
}

// ==============================================
// TESTING
// ==============================================
/*
# Test con cURL
curl -X POST http://localhost:3001/api/mercadopago/create-preference \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "id": "1",
        "title": "PadelNature Pro",
        "price": 25000,
        "quantity": 2,
        "category": "pelotas"
      }
    ],
    "total": 50000
  }'

# Respuesta esperada:
{
  "id": "123456789-abcd-1234-abcd-123456789abc",
  "init_point": "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=..."
}
*/

// ==============================================
// DOCUMENTACIÓN ADICIONAL
// ==============================================
/*
MercadoPago API Reference:
https://www.mercadopago.com.ar/developers/es/reference

Webhooks (IPN):
https://www.mercadopago.com.ar/developers/es/guides/notifications/ipn

Estados de pago:
https://www.mercadopago.com.ar/developers/es/guides/online-payments/checkout-api/handling-responses

Testing:
https://www.mercadopago.com.ar/developers/es/guides/online-payments/checkout-api/testing
*/
