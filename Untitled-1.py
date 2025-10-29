 // 
Objetivo:
Generar un proyecto React + TailwindCSS llamado `padelmania-store` que sea un e-commerce mock inspirado en PadelMDQ y con la identidad Padelmania. Debe incluir componentes reutilizables, mock de productos en JSON, carrito con persistencia en localStorage, chat bot simulado, botón “Generar descripción IA” (simulado) en cada producto, recomendaciones automáticas, filtros básicos y un README con instrucciones para correr el proyecto.
    
Requerimientos técnicos:
- Framework: React (Vite o Create React App) — preferencia Vite.
- Estilado: TailwindCSS.
- Tipografía: Poppins (Google Fonts) o Inter.
- Assets: incluir `/public/assets/logo.png` (placeholder). Si no existe, dejar instrucciones en README para reemplazarlo.
- Mock data: `/src/data/products.json`.
- State: Context API para carrito (o hook personalizado).
- Persistencia: localStorage para carrito.
- SEO: index.html con meta title y meta description: "Padelmania — Tienda oficial de pádel natural y bienestar".
- Deploy: instrucciones para Vercel/Netlify en README.
- Accesibilidad mínima: aria labels en botones principales.

Estructura de carpetas que debe generarse:
/padelmania-store
  /public
    /assets
      logo.png (placeholder)
      images (varias imágenes de ejemplo)
  /src
    /components
      Header.jsx
      HeroSection.jsx
      ProductGrid.jsx
      ProductCard.jsx
      ProductDetail.jsx
      Cart.jsx
      CartProvider.jsx
      ChatBot.jsx
      FiltersPanel.jsx
      Footer.jsx
      Modal.jsx
    /pages
      Home.jsx
      Shop.jsx
      ProductPage.jsx
      About.jsx
      Contact.jsx
    /data
      products.json
    /hooks
      useLocalStorage.js
    /utils
      currency.js
      helpers.js
    main.jsx
    App.jsx
    index.css (Tailwind)
  package.json
  tailwind.config.js
  postcss.config.js
  README.md

Comportamiento y funcionalidades (detallar para que Copilot implemente):
1. Header:
   - Logo centrado a la izquierda, buscador, icono de carrito con contador, menú de navegación.
   - Barra superior de anuncio con texto editable (ej. “Hasta 6 cuotas sin interés — Envío gratis desde $X”).

2. HeroSection (Home):
   - Imagen de pádel al aire libre (usar imágenes de /public/assets/images).
   - Título: “Sentí la conexión entre energía, juego y naturaleza.”
   - Subtexto: “En Padelmania creemos que cada punto es una oportunidad para cuidar tu rendimiento y tu bienestar.”
   - CTA: “Descubrí nuestros productos” que hace scroll a Shop o navega a /shop.

3. ProductGrid / Shop:
   - Lee `/src/data/products.json`.
   - Muestra filtros por categoría, precio (rango simple), y etiquetas.
   - Grid responsive (1 col móvil, 2 tablet, 3-4 desktop).
   - Cada ProductCard muestra imagen, nombre, precio, oldPrice si aplica, etiqueta de oferta y botones “Ver” y “Agregar al carrito”.

4. ProductDetail / ProductPage:
   - Galería de imágenes con lightbox simple.
   - Especificaciones, stock, precio, CTA “Agregar al carrito”.
   - Botón “Generar descripción IA” que rellena el área de descripción con un texto emocional predefinido (simulado). Ejemplo que debe generar al pulsar:
     "Pelota PadelNature Pro: Sentí la energía del juego y la suavidad del impacto, creada para quienes viven el pádel con pasión."
   - Recomendaciones automáticas: mostrar 3 productos de la misma categoría (lógica simple: filtrar por category y devolver 3 distintos).

5. Carrito:
   - Componente Cart que puede abrirse como modal o drawer.
   - Mostrar todos los items, cantidades editables, botón eliminar, subtotal, total.
   - Cálculo de cuotas (simulado): mostrar "6 cuotas sin interés de $X" como cálculo informativo (no integración real).
   - Persistencia con localStorage (uso del hook useLocalStorage).

6. ChatBot simulado:
   - Icono flotante en la esquina inferior derecha.
   - Al abrir, mostrar mensaje inicial: "Hola 👋 Soy tu asistente Padelmania. ¿Querés ayuda para encontrar el producto ideal o conocer más sobre bienestar y pádel?"
   - Respuestas predefinidas (buscar producto, ver promos, contacto).
   - Si el usuario escribe “recomendar”, debe sugerir 3 productos al azar.

7. Diseño y estilos:
   - Paleta:
     - Azul marino: #002E4D
     - Verde agua: #6FCF97
     - Blanco natural: #FAFAFA
     - Gris arena: #E0DDD5
   - Tipografía Poppins o Inter.
   - Componentes con bordes redondeados (rounded-2xl) y sombras suaves.
   - Animaciones suaves (transiciones Tailwind, fade-in via classes).
   - Responsive en todos los componentes.

8. Mock data (ejemplos) — crear `/src/data/products.json` con al menos 8 productos:
   - Pelotas: PadelNature Pro ($15), EcoSpin Soft ($12)
   - Grips: Grip Wave Control ($10), Cubregrip EcoFeel ($8)
   - Gorras: Gorra AirFlow Verde ($20), Gorra ArenaWave ($22)
   - Muñequeras: Muñequera SoftShield Azul ($14), Muñequera FreshGrip Blanca ($16)
   - Cada producto debe tener: id, title, category, price, oldPrice (opcional), images[], stock, tags[], description (breve).

9. SEO/meta:
   - index.html debe tener:
     <title>Padelmania — Tienda oficial de pádel natural y bienestar</title>
     <meta name="description" content="Descubrí Padelmania, tu tienda online de productos de pádel inspirados en el bienestar y la naturaleza." />

10. README:
    - Instrucciones paso a paso: instalar (npm install), correr (npm run dev), build, deploy en Vercel.
    - Cómo reemplazar logo `/public/assets/logo.png`.
    - Notas sobre integración con pasarela de pagos (hooks/placeholders).

Patrones de UI/UX adicionales:
- Mostrar trust badges en footer: "Envíos RÁPIDOS", "Garantía OFICIAL", "Pago 100% seguro".
- Footer con redes sociales (Instagram) y contacto.
- Placeholder de sección “Tips de pádel y bienestar — Próximamente” en About o Home.
- Localización: textos en español.

Pedir a Copilot:
- Generar todos los archivos arriba listados con implementación funcional mínima para poder correr `npm install` y `npm run dev`.
- Priorizar funcionalidades: leer products.json, agregar al carrito, persistir carrito, ver detalle de producto, generar descripción IA simulada, chat bot simulado, y estilos Tailwind aplicados.
- Comentar el código en puntos clave (dónde integrar pagos reales, cómo reemplazar imágenes, y cómo conectar a WooCommerce o Headless CMS).

Fin del prompt.
// Copilot, por favor genera los archivos y carpetas necesarios para implementar este proyecto de e-commerce de pádel.  