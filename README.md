# 🎾 Padelmania Store

E-commerce completo de productos de pádel con enfoque en bienestar y naturaleza, desarrollado con React + Vite + TailwindCSS.

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Instalación

1. **Clonar o descargar el proyecto**
```bash
git clone <url-del-repositorio>
cd padelmania-store
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
Ir a `http://localhost:5173`

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Ejecutar servidor de desarrollo
npm run build    # Crear build de producción
npm run preview  # Previsualizar build de producción
npm run lint     # Ejecutar linter
```

## 📁 Estructura del Proyecto

```
padelmania-store/
├── public/
│   ├── assets/
│   │   ├── logo.png.placeholder          # ⚠️ Reemplazar con logo real
│   │   └── images/
│   │       └── README.md                 # ⚠️ Lista de imágenes necesarias
├── src/
│   ├── components/
│   │   ├── Header.jsx                    # ✅ Navegación principal
│   │   ├── HeroSection.jsx               # ✅ Sección hero con CTA
│   │   ├── ProductGrid.jsx               # ✅ Grid de productos con filtros
│   │   ├── ProductCard.jsx               # ✅ Tarjeta individual de producto
│   │   ├── ProductDetail.jsx             # ✅ Vista detallada del producto
│   │   ├── Cart.jsx                      # ✅ Modal del carrito
│   │   ├── CartProvider.jsx              # ✅ Context API para carrito
│   │   ├── ChatBot.jsx                   # ✅ Chat bot simulado
│   │   ├── FiltersPanel.jsx              # ✅ Panel de filtros
│   │   ├── Footer.jsx                    # ✅ Footer con enlaces
│   │   └── Modal.jsx                     # ✅ Componente modal reutilizable
│   ├── pages/
│   │   ├── Home.jsx                      # ✅ Página principal
│   │   ├── Shop.jsx                      # ✅ Tienda con filtros
│   │   ├── ProductPage.jsx               # ✅ Página de producto individual
│   │   ├── About.jsx                     # ✅ Acerca de nosotros
│   │   └── Contact.jsx                   # ✅ Página de contacto
│   ├── data/
│   │   └── products.json                 # ✅ Mock data de productos
│   ├── hooks/
│   │   └── useLocalStorage.js            # ✅ Hook para persistencia
│   ├── utils/
│   │   ├── currency.js                   # ✅ Funciones de formateo de moneda
│   │   └── helpers.js                    # ✅ Utilidades varias
│   ├── App.jsx                           # ✅ Componente principal
│   ├── main.jsx                          # ✅ Punto de entrada
│   └── index.css                         # ✅ Estilos principales con Tailwind
├── index.html                            # ✅ HTML con meta tags SEO
├── package.json                          # ✅ Dependencias y scripts
├── tailwind.config.js                    # ✅ Configuración de Tailwind
├── postcss.config.js                     # ✅ Configuración de PostCSS
├── vite.config.js                        # ✅ Configuración de Vite
└── README.md                             # ✅ Esta documentación
```

## 🎨 Funcionalidades Implementadas

### ✅ Completamente Funcional

#### 🛒 **Carrito de Compras**
- Context API para gestión global del estado
- Persistencia en localStorage
- Modal responsive con lista de productos
- Cálculo automático de subtotales y cuotas
- Indicadores visuales de productos en carrito

#### 🎯 **Productos y Catálogo**
- 8 productos mock con datos completos
- Filtros por categoría, precio, tags y disponibilidad
- Búsqueda por texto
- Ordenamiento múltiple (precio, nombre, fecha)
- Vista detallada con galería de imágenes
- Sistema de recomendaciones automáticas

#### 🤖 **Funcionalidades Simuladas**
- **Chat Bot**: Respuestas inteligentes predefinidas
- **Generación de descripción IA**: Textos emocionales únicos por producto
- **Sistema de pagos**: Simulación de checkout (placeholder para integración real)

#### 🎨 **UI/UX Premium**
- Diseño responsive (mobile-first)
- Paleta de colores corporativa (navy, mint, natural-white, sand-gray)
- Animaciones suaves con Tailwind
- Tipografía Poppins/Inter
- Componentes reutilizables con props

#### 🔍 **SEO y Performance**
- Meta tags optimizados para Argentina
- Open Graph y Twitter Cards
- Títulos dinámicos por página
- Estructura semántica HTML5
- Imágenes con lazy loading

### 🔧 **Aspectos Técnicos**
- **React 18** con hooks modernos
- **React Router** para navegación SPA
- **Context API** para estado global
- **Vite** para desarrollo y build rápido
- **TailwindCSS** para estilos utilitarios
- **Responsive** en todos los breakpoints

## 🖼️ Configuración de Assets

### Logo Principal
1. Reemplazar `/public/assets/logo.png.placeholder` con tu logo real
2. Formato recomendado: PNG transparente, 200x50px
3. Si no se encuentra la imagen, se muestra texto "Padelmania"

### Imágenes de Productos
Ubicación: `/public/assets/images/`

**Imágenes necesarias** (ver `/public/assets/images/README.md` para lista completa):
- Productos: `pelota-nature-pro-1.jpg`, `grip-wave-1.jpg`, etc.
- Hero: `hero-padel-outdoor.jpg` (1920x1080px)
- Fallbacks: `placeholder-product.jpg`, `placeholder-about.jpg`

**Especificaciones:**
- Productos: 800x800px (cuadrado)
- Hero: 1920x1080px (horizontal)  
- Formato: JPG/PNG optimizado
- Calidad: Media-alta

## 🚀 Deploy en Producción

### Vercel (Recomendado)

1. **Build local**
```bash
npm run build
```

2. **Deploy con Vercel CLI**
```bash
npm install -g vercel
vercel --prod
```

3. **O conectar repositorio en [vercel.com](https://vercel.com)**
   - Crear nuevo proyecto
   - Conectar repositorio Git
   - Deploy automático en cada push

### Netlify

1. **Build local**
```bash
npm run build
```

2. **Deploy en [netlify.com](https://netlify.com)**
   - Drag & drop de la carpeta `dist/`
   - O conectar repositorio para deploy automático

### Configuraciones Adicionales

**Variables de entorno** (crear `.env`):
```env
VITE_API_URL=https://api.padelmania.com
VITE_ANALYTICS_ID=tu-analytics-id
```

## 🔗 Integraciones Pendientes

### 💳 Pasarela de Pagos ✅ **IMPLEMENTADO**
**Ubicación**: `/src/components/PaymentIntegration.jsx`  
**Integrado en**: `/src/components/Cart.jsx`

```javascript
// Ahora con interfaz completa para 3 pasarelas:
// ✅ MercadoPago (Argentina/LATAM)
// ✅ Stripe (Internacional)
// ✅ PayPal (Internacional)

// Ver documentación completa:
// docs/PAYMENT_INTEGRATION.md
```

**Para activar pagos reales:**

1. **Instalar SDKs necesarios:**
```bash
npm install @mercadopago/sdk-react @stripe/stripe-js @stripe/react-stripe-js @paypal/react-paypal-js
```

2. **Configurar variables de entorno:**
```bash
# MercadoPago
VITE_MERCADOPAGO_PUBLIC_KEY=TEST-xxxxxxxx

# Stripe  
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxx

# PayPal
VITE_PAYPAL_CLIENT_ID=xxxxxxxx
```

3. **Implementar backend:**
   - Crear endpoints para generar órdenes
   - Configurar webhooks para confirmaciones
   - Ver ejemplos completos en `docs/PAYMENT_INTEGRATION.md`

**Características actuales:**
- ✅ UI completa con selección de método
- ✅ Comparación de comisiones y características
- ✅ Simulación de proceso de pago
- ✅ Manejo de errores y estados
- ⚠️ Requiere credenciales reales para producción

**Documentación:** Ver guía completa en [`/docs/PAYMENT_INTEGRATION.md`](/docs/PAYMENT_INTEGRATION.md)

### 📦 CMS/Backend
**Ubicaciones para conectar**:

1. **Productos**: `/src/data/products.json` → API REST
2. **Pedidos**: Context API → Backend de pedidos
3. **Newsletter**: Formularios → Mailchimp/SendGrid
4. **Inventario**: Stock en tiempo real

**CMS Recomendados**:
- **Strapi**: Headless CMS completo
- **Contentful**: CMS profesional  
- **WooCommerce**: Para WordPress
- **Shopify**: E-commerce completo

### 📊 Analytics y Métricas
```javascript
// Google Analytics 4
gtag('config', 'GA_MEASUREMENT_ID');

// Facebook Pixel  
fbq('track', 'Purchase', {value: total, currency: 'ARS'});

// Hotjar para UX
hj('trigger', 'purchase_completed');
```

## 🐛 Debugging y Desarrollo

### Logs Útiles
```javascript
// Ver estado del carrito
localStorage.getItem('padelmania-cart')

// Debug del Context
console.log(useCart()) // En cualquier componente
```

### Comandos de Desarrollo
```bash
# Limpiar caché de Vite
rm -rf node_modules/.vite

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Verificar build
npm run build && npm run preview
```

## 📱 Responsividad

**Breakpoints de TailwindCSS**:
- `sm`: 640px+ (móvil grande)
- `md`: 768px+ (tablet)
- `lg`: 1024px+ (desktop)
- `xl`: 1280px+ (desktop grande)

**Componentes optimizados**:
- ✅ Header con menú hamburguesa
- ✅ ProductGrid responsive (1-4 columnas)
- ✅ Cart modal adaptable
- ✅ Chat bot móvil-friendly

## 🔒 Seguridad y Performance

### Implementado
- ✅ Validación de formularios
- ✅ Sanitización de inputs
- ✅ Lazy loading de imágenes
- ✅ Code splitting automático (Vite)

### Recomendado para Producción
- [ ] Rate limiting en APIs
- [ ] HTTPS obligatorio
- [ ] CSP headers
- [ ] Compresión gzip/brotli

## 🤝 Contribución

### Estructura de Commits
```
feat: nueva funcionalidad
fix: corrección de bug  
docs: actualización de documentación
style: cambios de estilo
refactor: refactorización de código
```

### Workflow
1. Fork del repositorio
2. Branch feature: `git checkout -b feature/nueva-funcionalidad`
3. Commits descriptivos
4. Pull Request con descripción detallada

## 📧 Soporte

**Para consultas técnicas**:
- GitHub Issues: [Reportar bug o sugerir feature]
- Email: dev@padelmania.com
- Documentación: Este README

**Para consultas comerciales**:
- Email: info@padelmania.com
- WhatsApp: +54 9 11 2345-6789

---

## 📄 Licencia

MIT License - Ver archivo `LICENSE` para más detalles.

---

### 🌟 ¡Proyecto Listo para Usar!

Este proyecto está completamente funcional para desarrollo y testing. Para ponerlo en producción:

1. **Agregar imágenes reales** (ver `/public/assets/images/README.md`)
2. **Configurar pasarela de pagos** (ver sección Integraciones)
3. **Conectar a CMS/Backend** (opcional para contenido dinámico)
4. **Deploy** en Vercel/Netlify

**¿Necesitás ayuda?** Contactá al equipo de desarrollo. 🚀