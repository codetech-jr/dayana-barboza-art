# 🎨 Dayana Barboza Art — Hyperrealistic Denim Wearable Art

Plataforma web editorial y catálogo de alta conversión (CRO) para **Dayana Barboza**, artista visual venezolana radicada en Virginia especializada en pintura hiperrealista sobre chaquetas denim y experiencias exclusivas de Art Parties.

![Next.js 16](https://img.shields.io/badge/Next.js_16-black?style=flat&logo=next.js)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)
![SSG](https://img.shields.io/badge/Static_Export-SSG-success)

---

## 🌟 Características Principales

- **Arquitectura Multi-Página (MPA)**:
  - `/[locale]` — Hero inmersivo cinematográfico de borde a borde + Teaser de Obras + Contacto Directo.
  - `/[locale]/gallery` — Catálogo completo con filtros dinámicos (Retratos, Cine, Naturaleza, Personalizadas).
  - `/[locale]/about` — Manifiesto y biografía editorial con fotografía de taller.
  - `/[locale]/experiences` — Art Parties, fechas disponibles y reservas privadas.
  - `/[locale]/merch` — Cápsulas de arte textil en edición limitada.
- **Galería Modal / Lightbox de Alta Definición**:
  - Zoom a escala milimétrica para apreciar los trazos y textura textil.
  - Zero Layout Shift con renderizado determinístico (`object-contain`).
  - Navegación completa por teclado (`←`, `→`, `Escape`) y carrusel de miniaturas.
  - **Fusión CRO WhatsApp Directa**: Botón contextual que pre-carga el mensaje con el nombre exacto de la pieza seleccionada (`'lightboxQuote'`).
- **Sistema de Diseño Editorial en OKLCH**:
  - Paleta curada: Denim Indigo, Terracota Accent, Papel y Crema cálidos.
  - Tipografía editorial: *Playfair Display* (títulos) + *DM Sans* (cuerpo).
  - Glassmorphism desacoplado flotante (`fixed top-4 inset-x-0`).
- **Internacionalización (i18n)**:
  - Rutas dinámicas bilingües (`/es` y `/en`) con diccionarios tipados de cero dependencias.
  - Detección y proxy inteligente mediante `proxy.ts` (Next.js 16).
- **SEO & Performance Vercel-Ready**:
  - Títulos y descripciones estratégicas por página con `generateMetadata()`.
  - Tarjetas OpenGraph y Twitter en alta resolución.
  - Activos optimizados en formato `.webp` con precargas y tamaños responsivos.
  - 100% páginas SSG compiladas en menos de 2 segundos.

---

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción (Vercel / Edge)
npm run build
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para explorar la experiencia.

---

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16 (App Router con Turbopack)
- **Estilos**: Tailwind CSS v4 (CSS-first `@theme inline`)
- **Animaciones**: Framer Motion
- **Optimización de Medios**: Next/Image + WebP
- **Canal de Conversión**: WhatsApp Business API pre-cargado

---

© 2026 Dayana Barboza Art. Todos los derechos reservados.
