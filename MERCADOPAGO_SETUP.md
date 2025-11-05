# 🚀 Activar MercadoPago - Guía Rápida

## ✅ SDK ya instalado
```bash
✓ @mercadopago/sdk-react v1.0.6
```

## 📋 Pasos para Activar

### 1️⃣ Obtener Credenciales

1. Ir a: https://www.mercadopago.com.ar/developers/panel/credentials
2. Iniciar sesión o crear cuenta
3. Copiar **Public Key** (pk_test_... o TEST-...)

### 2️⃣ Configurar Frontend

Editar `.env`:
```bash
# Reemplazar con tu Public Key real
VITE_MERCADOPAGO_PUBLIC_KEY=TEST-1234567890-abcdef-1234567890abcdef-123456789
```

**Restart del servidor:**
```bash
npm run dev
```

### 3️⃣ Implementar Backend

**Opción A: Vercel Serverless (Recomendado)**

1. Crear carpeta `/api/mercadopago/`
2. Copiar el archivo de ejemplo:
```bash
cp api/mercadopago/create-preference.example.js api/mercadopago/create-preference.js
```

3. Instalar dependencia en producción:
```bash
npm install mercadopago
```

4. Configurar variable secreta en Vercel:
```bash
vercel env add MERCADOPAGO_ACCESS_TOKEN production
# Pegar tu Access Token (APP_USR-...)
```

**Opción B: Backend Separado**

Ver ejemplos en: `/api/mercadopago/create-preference.example.js`

### 4️⃣ Testing

1. Abrir http://localhost:5174/
2. Agregar productos al carrito
3. Click en "Finalizar compra"
4. Seleccionar MercadoPago
5. Click en "Pagar"
6. ✅ Debería aparecer el checkout de MercadoPago

**Tarjetas de prueba:**
- VISA aprobada: `4509 9535 6623 3704`
- Mastercard rechazada: `5031 7557 3453 0604`
- CVV: cualquier 3 dígitos
- Vencimiento: cualquier fecha futura
- Nombre: APRO (aprobada) o OTHE (rechazada)

### 5️⃣ Deploy

```bash
git add .
git commit -m "feat: MercadoPago configurado"
git push origin main

# Configurar variables en Vercel
vercel env add VITE_MERCADOPAGO_PUBLIC_KEY production
vercel env add MERCADOPAGO_ACCESS_TOKEN production

# Redesplegar
vercel --prod
```

---

## 🔍 Verificación Rápida

### Frontend Funcionando
```javascript
// En consola del navegador:
console.log(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY)
// Debe mostrar: TEST-xxxxx o APP_USR-xxxxx
```

### Backend Funcionando
```bash
# Test del endpoint
curl -X POST http://localhost:5173/api/mercadopago/create-preference \
  -H "Content-Type: application/json" \
  -d '{"items":[{"title":"Test","price":100,"quantity":1}],"total":100}'
```

---

## ⚠️ Modo Demo vs Real

| Aspecto | Demo (actual) | Real (con credenciales) |
|---------|---------------|-------------------------|
| **Funcionalidad** | Simulación 2 seg | Checkout real MercadoPago |
| **Requiere backend** | ❌ No | ✅ Sí |
| **Acepta pagos** | ❌ No | ✅ Sí |
| **Testing** | ✅ Instantáneo | ✅ Con tarjetas de prueba |

---

## 📚 Recursos

- **Documentación completa:** `/docs/PAYMENT_INTEGRATION.md`
- **Ejemplo de backend:** `/api/mercadopago/create-preference.example.js`
- **Docs oficiales:** https://www.mercadopago.com.ar/developers

---

## 💡 Tips

1. **Empezá con credenciales TEST** antes de producción
2. **Probá con tarjetas de prueba** primero
3. **Implementá webhooks** para confirmar pagos
4. **Guardá logs** de todas las transacciones
5. **Usá HTTPS** en producción (Vercel lo hace automático)

---

## ⏱️ Tiempo Estimado

- Frontend (ya hecho): ✅ 0 min
- Obtener credenciales: ⏱️ 5 min
- Configurar .env: ⏱️ 2 min
- Implementar backend: ⏱️ 20-30 min
- Testing: ⏱️ 10 min

**Total: ~40 minutos para pagos 100% funcionales** 🚀
