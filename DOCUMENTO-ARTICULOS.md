# GUIA DE ARTICULOS DEL BLOG - MEDEDUL

## Documento de Referencia para Crear y Modificar Articulos

**Archivo Template:** `blog/articulos/celebraciones-infantiles-ensueno-cdmx.html`

**Ultima actualizacion:** Enero 2025

---

## INDICE

1. [Estructura General del Archivo](#1-estructura-general-del-archivo)
2. [Seccion HEAD - Meta Tags y SEO](#2-seccion-head---meta-tags-y-seo)
3. [Schema.org - Datos Estructurados](#3-schemaorg---datos-estructurados)
4. [Variables CSS y Colores](#4-variables-css-y-colores)
5. [Estructura del Body](#5-estructura-del-body)
6. [Componentes del Contenido](#6-componentes-del-contenido)
7. [Sidebar - Modulos](#7-sidebar---modulos)
8. [Responsive Design](#8-responsive-design)
9. [Checklist para Nuevo Articulo](#9-checklist-para-nuevo-articulo)
10. [Convencion de Nombres de Archivos](#10-convencion-de-nombres-de-archivos)

---

## 1. ESTRUCTURA GENERAL DEL ARCHIVO

```
<!DOCTYPE html>
<html lang="es-MX">
<head>
    <!-- Analytics -->
    <!-- Meta tags basicos -->
    <!-- Meta tags SEO -->
    <!-- Open Graph -->
    <!-- Twitter Cards -->
    <!-- Favicon y Fonts -->
    <!-- CSS -->
    <!-- Schema.org BlogPosting -->
    <!-- Schema.org FAQPage -->
    <!-- Estilos inline del articulo -->
</head>
<body>
    <!-- Top Bar -->
    <!-- Header con navegacion -->
    <!-- Breadcrumbs -->
    <!-- Article Hero -->
    <!-- Article Layout (Content + Sidebar) -->
    <!-- Footer -->
    <!-- WhatsApp Float -->
    <!-- Scripts -->
</body>
</html>
```

---

## 2. SECCION HEAD - META TAGS Y SEO

### 2.1 Analytics (Rybbit)
```html
<script
    src="https://app.rybbit.io/api/script.js"
    data-site-id="d0ab4d9bb6d4"
    defer
></script>
```

### 2.2 Meta Tags Basicos
```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>[TITULO DEL ARTICULO] | [KEYWORD] | Mededul</title>
<meta name="description" content="[DESCRIPCION 150-160 caracteres con keywords principales]">
<meta name="keywords" content="[keyword1], [keyword2], [keyword3], mesas de dulces, CDMX, Mededul">
<meta name="author" content="Mededul - Mesas de Dulces de Alta Gama">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="https://mesas-de-dulces.com/blog/articulos/[slug-del-articulo].html">
```

### 2.3 Open Graph (Facebook/LinkedIn)
```html
<meta property="og:title" content="[TITULO] | [KEYWORD]">
<meta property="og:type" content="article">
<meta property="og:url" content="https://mesas-de-dulces.com/blog/articulos/[slug].html">
<meta property="og:image" content="https://mesas-de-dulces.com/img/[ruta-imagen].avif">
<meta property="og:description" content="[DESCRIPCION]">
<meta property="og:site_name" content="Mededul - Mesas de Dulces de Alta Gama">
<meta property="og:locale" content="es_MX">
```

### 2.4 Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[TITULO CORTO] | Guia 2025">
<meta name="twitter:description" content="[DESCRIPCION CORTA]">
<meta name="twitter:image" content="https://mesas-de-dulces.com/img/[ruta-imagen].avif">
```

### 2.5 Recursos
```html
<link rel="icon" type="image/png" sizes="32x32" href="../../img/branding/favicon-mededul-32x32.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../css/styles.css">
<link rel="stylesheet" href="../../css/header-footer.css">
```

---

## 3. SCHEMA.ORG - DATOS ESTRUCTURADOS

### 3.1 BlogPosting Schema
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://mesas-de-dulces.com/blog/articulos/[slug].html"
  },
  "headline": "[TITULO DEL ARTICULO - max 60 caracteres]",
  "description": "[DESCRIPCION]",
  "image": "https://mesas-de-dulces.com/img/[ruta-imagen].avif",
  "author": {
    "@type": "Organization",
    "name": "Mededul",
    "url": "https://mesas-de-dulces.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Mededul - Mesas de Dulces de Alta Gama",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mesas-de-dulces.com/img/branding/logo-mededul-mesas-de-dulces.avif"
    }
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-26"
}
</script>
```

### 3.2 FAQPage Schema
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[PREGUNTA 1]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[RESPUESTA 1 - puede incluir <strong> para enfasis]"
      }
    },
    {
      "@type": "Question",
      "name": "[PREGUNTA 2]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[RESPUESTA 2]"
      }
    }
    // Minimo 3-5 preguntas
  ]
}
</script>
```

---

## 4. VARIABLES CSS Y COLORES

### 4.1 Variables Root (NO MODIFICAR)
```css
:root {
  --color-primary: #E91E8C;        /* Rosa principal */
  --color-primary-dark: #be185d;   /* Rosa oscuro */
  --color-primary-light: #fce7f3; /* Rosa claro */
  --color-gold: #D4AF37;           /* Dorado */
  --color-gold-light: #F5E6C8;     /* Dorado claro */
  --color-text: #1a1a2e;           /* Texto principal */
  --color-text-light: #4a5568;     /* Texto secundario */
  --color-bg: #fdfcfb;             /* Fondo */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

---

## 5. ESTRUCTURA DEL BODY

### 5.1 Top Bar
Se incluye automaticamente desde el template. Contiene:
- Telefono: 55 2522 6442
- Email: info@mesas-de-dulces.com
- Redes sociales: Facebook, Instagram, TikTok

### 5.2 Header
Se incluye desde el template con navegacion mega menu.

### 5.3 Breadcrumbs
```html
<section class="breadcrumb-section">
  <div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Inicio</a>
      <svg>...</svg>
      <a href="../">Blog</a>
      <svg>...</svg>
      <a href="./">Articulos</a>
      <svg>...</svg>
      <span>[TITULO CORTO DEL ARTICULO]</span>
    </nav>
  </div>
</section>
```

### 5.4 Article Hero
```html
<section class="article-hero">
  <div class="container">
    <div class="article-hero__badge">
      <span>[CATEGORIA: Consejos Insider / Guia / Tendencias / etc]</span>
    </div>
    <h1 class="article-hero__title">[TITULO H1 DEL ARTICULO]</h1>
    <p class="article-hero__subtitle">[DESCRIPCION LARGA - 2-3 oraciones]</p>
    <div class="article-hero__meta">
      <span>[X] min de lectura</span>
      <span>Por el equipo Mededul</span>
    </div>
  </div>
</section>
```

### 5.5 Article Layout
```html
<article class="article-layout">
  <div class="article-layout__wrapper">
    <div class="article-layout__content">
      <!-- Contenido del articulo -->
    </div>
    <aside class="article-layout__sidebar">
      <!-- Sidebar con modulos -->
    </aside>
  </div>
</article>
```

---

## 6. COMPONENTES DEL CONTENIDO

### 6.1 Imagen Destacada
```html
<div class="article-featured-image">
  <img decoding="async" height="716" width="1306"
       src="../../img/[categoria]/[subcategoria]/[imagen].avif"
       alt="[ALT DESCRIPTIVO]" loading="eager">
</div>
```

### 6.2 Introduccion (con letra capital)
```html
<div class="article-intro">
  [PARRAFO DE INTRODUCCION - La primera letra se mostrara grande automaticamente]
</div>
```

### 6.3 Tabla de Contenido (dentro del contenido)
```html
<nav class="article-toc">
  <h2 class="article-toc__title">En Este Articulo</h2>
  <ul class="article-toc__list">
    <li><a href="#introduccion">[Seccion 1]</a></li>
    <li><a href="#estilos">[Seccion 2]</a></li>
    <li><a href="#seleccion">[Seccion 3]</a></li>
    <!-- ... mas secciones -->
    <li><a href="#faq">Preguntas Frecuentes</a></li>
  </ul>
</nav>
```

### 6.4 Secciones de Contenido
```html
<section id="[id-seccion]" class="article-section">
  <h2>[TITULO DE SECCION]</h2>
  <p>[Parrafo con <strong>texto destacado</strong> para keywords]</p>
  <p>[Mas parrafos...]</p>
  <ul>
    <li><strong>[Punto importante]:</strong> Descripcion del punto.</li>
    <li><strong>[Otro punto]:</strong> Descripcion.</li>
  </ul>
</section>
```

### 6.5 Info Box (Nota del Experto)
```html
<div class="info-box">
  <div class="info-box__icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4M12 8h.01"/>
    </svg>
  </div>
  <div class="info-box__content">
    <h4>Nota del Experto</h4>
    <p>[CONTENIDO DE LA NOTA]</p>
  </div>
</div>
```

### 6.6 Warning Box (Advertencia)
```html
<div class="warning-box">
  <div class="warning-box__icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
    </svg>
  </div>
  <div class="warning-box__content">
    <h4>Recomendacion Importante</h4>
    <p>[CONTENIDO DE LA ADVERTENCIA]</p>
  </div>
</div>
```

### 6.7 Grid de Imagenes (2 columnas)
```html
<div class="article-image-grid">
  <figure>
    <img decoding="async" height="716" width="1306"
         src="../../img/[ruta]/[imagen1].avif"
         alt="[ALT]" loading="lazy">
    <figcaption>[Descripcion imagen 1]</figcaption>
  </figure>
  <figure>
    <img decoding="async" height="716" width="1306"
         src="../../img/[ruta]/[imagen2].avif"
         alt="[ALT]" loading="lazy">
    <figcaption>[Descripcion imagen 2]</figcaption>
  </figure>
</div>
```

### 6.8 Seccion FAQ
```html
<section id="faq" class="article-section article-faq-section">
  <h2>Preguntas Frecuentes</h2>
  <div class="article-faq">
    <details class="article-faq__item">
      <summary class="article-faq__question">[PREGUNTA 1]</summary>
      <div class="article-faq__answer">
        <p>[RESPUESTA con <strong>keywords</strong> destacadas]</p>
      </div>
    </details>
    <!-- Repetir para cada pregunta -->
  </div>
</section>
```

### 6.9 Interlink Box (CTA a Servicios)
```html
<div class="article-interlink">
  <div class="article-interlink__badge">Servicios Exclusivos</div>
  <h2>Descubra Nuestra Coleccion de Experiencias Dulces</h2>
  <p>En <strong>Mededul</strong>, cada celebracion merece una mesa de dulces excepcional...</p>
  <a href="../../servicios.html" class="article-interlink__btn">
    Explorar Servicios
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  </a>
</div>
```

### 6.10 Grid de Servicios (6 cards)
```html
<div class="article-services">
  <h2>Servicios para Eventos Distinguidos</h2>
  <div class="article-services__grid">
    <a href="../../candy-bar-eventos/mesa-dulces-boda.html" class="service-card">
      <span class="service-card__icon">&#128141;</span>
      <span class="service-card__title">Bodas de Lujo</span>
    </a>
    <!-- Repetir para cada servicio -->
  </div>
</div>
```

### 6.11 CTA Final (Call to Action)
```html
<div class="article-cta">
  <div class="article-cta__content">
    <h3>Transforma Tu Celebracion en una Experiencia Inolvidable</h3>
    <p>Descubre el lujo de una mesa de dulces personalizada con Mededul...</p>
    <div class="article-cta__buttons">
      <a href="https://wa.me/525525226442?text=..." class="btn-cta-primary" target="_blank" rel="noopener">
        <svg><!-- WhatsApp icon --></svg>
        Agendar Consultoria
      </a>
      <a href="../../contacto.html" class="btn-cta-secondary">Conocer Mas</a>
    </div>
  </div>
</div>
```

---

## 7. SIDEBAR - MODULOS

El sidebar tiene **400px de ancho** y es **sticky** (se queda fijo al hacer scroll).

### 7.1 CTA WhatsApp (PRIMER MODULO - OBLIGATORIO)
```html
<div class="sidebar-widget sidebar-cta-main">
  <span class="sidebar-cta-main__badge">Atencion Inmediata</span>
  <h3 class="sidebar-cta-main__title">Cotiza Tu Mesa de Dulces</h3>
  <p class="sidebar-cta-main__text">Recibe una propuesta personalizada en menos de 24 horas</p>
  <a href="https://wa.me/525525226442?text=..." class="sidebar-cta-main__btn" target="_blank" rel="noopener">
    <svg><!-- WhatsApp icon --></svg>
    Cotizar por WhatsApp
  </a>
  <p class="sidebar-cta-main__phone">o llama al <a href="tel:+525525226442">55 2522 6442</a></p>
</div>
```

### 7.2 Tabla de Contenido
```html
<div class="sidebar-widget">
  <h3 class="sidebar-widget__title">
    <svg><!-- List icon --></svg>
    Contenido del Articulo
  </h3>
  <nav class="sidebar-toc__nav">
    <ul>
      <li><a href="#introduccion">[Seccion 1]</a></li>
      <li><a href="#estilos">[Seccion 2]</a></li>
      <!-- ... -->
    </ul>
  </nav>
</div>
```

### 7.3 Servicios por Evento (Grid 3x2)
```html
<div class="sidebar-widget">
  <h3 class="sidebar-widget__title">
    <svg><!-- Layers icon --></svg>
    Servicios por Evento
  </h3>
  <div class="sidebar-services__grid">
    <a href="../../candy-bar-eventos/mesa-dulces-boda.html" class="sidebar-service-card">
      <span class="sidebar-service-card__icon">💍</span>
      <span class="sidebar-service-card__name">Bodas</span>
    </a>
    <a href="../../candy-bar-eventos/mesa-dulces-xv-anos.html" class="sidebar-service-card">
      <span class="sidebar-service-card__icon">👑</span>
      <span class="sidebar-service-card__name">XV Años</span>
    </a>
    <a href="../../candy-bar-eventos/mesa-dulces-baby-shower.html" class="sidebar-service-card">
      <span class="sidebar-service-card__icon">🍼</span>
      <span class="sidebar-service-card__name">Baby Shower</span>
    </a>
    <a href="../../candy-bar-eventos/mesa-dulces-cumpleanos-infantil.html" class="sidebar-service-card">
      <span class="sidebar-service-card__icon">🎂</span>
      <span class="sidebar-service-card__name">Cumpleaños</span>
    </a>
    <a href="../../candy-bar-eventos/mesa-dulces-corporativos.html" class="sidebar-service-card">
      <span class="sidebar-service-card__icon">🏢</span>
      <span class="sidebar-service-card__name">Corporativos</span>
    </a>
    <a href="../../candy-bar-eventos/mesa-dulces-graduacion.html" class="sidebar-service-card">
      <span class="sidebar-service-card__icon">🎓</span>
      <span class="sidebar-service-card__name">Graduaciones</span>
    </a>
  </div>
</div>
```

### 7.4 Paginas de Interes
```html
<div class="sidebar-widget">
  <h3 class="sidebar-widget__title">
    <svg><!-- Bookmark icon --></svg>
    Paginas de Interes
  </h3>
  <div class="sidebar-pages__list">
    <a href="../../servicios.html" class="sidebar-pages__item">
      <div class="sidebar-pages__icon">
        <svg><!-- Clock icon --></svg>
      </div>
      <div class="sidebar-pages__text">
        <span class="sidebar-pages__title">Nuestros Servicios</span>
        <span class="sidebar-pages__desc">Conoce todo lo que ofrecemos</span>
      </div>
    </a>
    <!-- Repetir para: Nosotros, Por Que Elegirnos, Galeria -->
  </div>
</div>
```

### 7.5 Tipos de Mesas (Grid 2x2)
```html
<div class="sidebar-widget">
  <h3 class="sidebar-widget__title">
    <svg><!-- Shopping bag icon --></svg>
    Tipos de Mesas
  </h3>
  <div class="sidebar-services__grid">
    <a href="../../tipos-de-mesas-de-dulces/mesa-de-dulces.html" class="sidebar-service-card">
      <span class="sidebar-service-card__icon">🍬</span>
      <span class="sidebar-service-card__name">Dulces</span>
    </a>
    <!-- Repetir para: Postres, Frutas, Quesos -->
  </div>
</div>
```

### 7.6 Estaciones Interactivas
```html
<div class="sidebar-widget">
  <h3 class="sidebar-widget__title">
    <svg><!-- Star icon --></svg>
    Estaciones Interactivas
  </h3>
  <div class="sidebar-pages__list">
    <a href="../../estaciones-interactivas/fuente-de-chocolate.html" class="sidebar-pages__item">
      <div class="sidebar-pages__icon">
        <svg><!-- Coffee icon --></svg>
      </div>
      <div class="sidebar-pages__text">
        <span class="sidebar-pages__title">Fuente de Chocolate</span>
        <span class="sidebar-pages__desc">Experiencia interactiva premium</span>
      </div>
    </a>
    <!-- Repetir para: Chamoy, Pared de Dulces -->
  </div>
</div>
```

### 7.7 Por Que Elegirnos
```html
<div class="sidebar-widget">
  <h3 class="sidebar-widget__title">
    <svg><!-- Check circle icon --></svg>
    Por Que Elegirnos
  </h3>
  <ul class="sidebar-features__list">
    <li>
      <div class="sidebar-features__icon">✨</div>
      <div class="sidebar-features__content">
        <strong>Diseño Personalizado</strong>
        <span>Cada evento es unico y exclusivo</span>
      </div>
    </li>
    <li>
      <div class="sidebar-features__icon">🏆</div>
      <div class="sidebar-features__content">
        <strong>Calidad Premium</strong>
        <span>Solo los mejores ingredientes</span>
      </div>
    </li>
    <li>
      <div class="sidebar-features__icon">🎯</div>
      <div class="sidebar-features__content">
        <strong>Servicio Completo</strong>
        <span>Montaje y desmontaje incluido</span>
      </div>
    </li>
    <li>
      <div class="sidebar-features__icon">💯</div>
      <div class="sidebar-features__content">
        <strong>Cero Estres</strong>
        <span>Nos encargamos de todo</span>
      </div>
    </li>
  </ul>
</div>
```

### 7.8 Articulos Relacionados
```html
<div class="sidebar-widget">
  <h3 class="sidebar-widget__title">
    <svg><!-- Book icon --></svg>
    Articulos Relacionados
  </h3>
  <div class="sidebar-related__list">
    <a href="[slug-articulo].html" class="sidebar-related__item">
      <span class="sidebar-related__number">1</span>
      <div class="sidebar-related__content">
        <span class="sidebar-related__cat">[CATEGORIA]</span>
        <span class="sidebar-related__title">[TITULO CORTO]</span>
      </div>
    </a>
    <!-- Repetir para 3-4 articulos -->
  </div>
</div>
```

### 7.9 Zonas de Servicio (ULTIMO MODULO)
```html
<div class="sidebar-widget">
  <h3 class="sidebar-widget__title">
    <svg><!-- Map pin icon --></svg>
    Zonas de Servicio
  </h3>
  <div class="sidebar-zonas__header">
    <span class="sidebar-zonas__badge">CDMX Premium</span>
  </div>
  <div class="sidebar-zonas__tags">
    <span class="zona-tag">Polanco</span>
    <span class="zona-tag">Lomas de Chapultepec</span>
    <span class="zona-tag">Santa Fe</span>
    <span class="zona-tag">Pedregal</span>
    <span class="zona-tag">Condesa</span>
    <span class="zona-tag">Roma</span>
    <span class="zona-tag">Interlomas</span>
    <span class="zona-tag">Bosques de las Lomas</span>
  </div>
  <p class="sidebar-zonas__note">Servicio en toda la CDMX y Area Metropolitana</p>
</div>
```

---

## 8. RESPONSIVE DESIGN

### Breakpoints
```css
/* Tablet y menor - Sidebar se oculta */
@media (max-width: 1024px) {
  .article-layout__wrapper { grid-template-columns: 1fr; }
  .article-layout__sidebar { display: none; }
}

/* Mobile */
@media (max-width: 768px) {
  .article-layout__content { padding: 24px; }
  .article-featured-image { margin: -24px -24px 32px; }
  .article-featured-image img { height: 280px; }
  .article-image-grid { grid-template-columns: 1fr; }
  .article-services__grid { grid-template-columns: repeat(2, 1fr); }
  .article-cta { padding: 32px 24px; }
}
```

---

## 9. CHECKLIST PARA NUEVO ARTICULO

### Antes de empezar:
- [ ] Definir tema/angulo unico del articulo
- [ ] Investigar keywords objetivo
- [ ] Preparar imagenes (formato .avif, min 1306x716px)
- [ ] Definir estructura de secciones (min 5-7 secciones)
- [ ] Preparar 5 preguntas frecuentes

### HEAD:
- [ ] Title tag (max 60 caracteres + " | Mededul")
- [ ] Meta description (150-160 caracteres)
- [ ] Meta keywords (8-12 keywords)
- [ ] Canonical URL correcta
- [ ] Open Graph tags completos
- [ ] Twitter Cards completos
- [ ] Schema BlogPosting con fechas correctas
- [ ] Schema FAQPage con 5 preguntas

### BODY:
- [ ] Breadcrumb con titulo corto
- [ ] Hero con badge, titulo H1, subtitulo, meta
- [ ] Imagen destacada con alt descriptivo
- [ ] Introduccion (letra capital automatica)
- [ ] TOC con links a todas las secciones
- [ ] Minimo 5 secciones con IDs correctos
- [ ] Al menos 1 info-box o warning-box
- [ ] Al menos 1 grid de imagenes (2 fotos)
- [ ] Seccion FAQ con details/summary
- [ ] Interlink box a servicios
- [ ] Grid de servicios
- [ ] CTA final con WhatsApp

### SIDEBAR:
- [ ] CTA WhatsApp (primer modulo)
- [ ] TOC del articulo
- [ ] Servicios por Evento (6 items)
- [ ] Paginas de Interes (4 items)
- [ ] Tipos de Mesas (4 items)
- [ ] Estaciones Interactivas (3 items)
- [ ] Por Que Elegirnos (4 items)
- [ ] Articulos Relacionados (4 items)
- [ ] Zonas de Servicio (8 zonas)

### FINAL:
- [ ] Footer incluido
- [ ] WhatsApp float incluido
- [ ] Scripts de navegacion incluidos
- [ ] Validar HTML
- [ ] Probar responsive
- [ ] Agregar a blog/index.html (array blogArticles)
- [ ] Crear redirect en .htaccess si es necesario

---

## 10. CONVENCION DE NOMBRES DE ARCHIVOS

### Formato del slug:
```
[tema-principal]-[subtema]-[ubicacion].html
```

### Ejemplos:
```
celebraciones-infantiles-ensueno-cdmx.html
elegancia-dulce-mesas-bodas-exclusivas-cdmx.html
mesas-dulces-xv-anos-alta-sociedad-cdmx.html
experiencia-mesas-dulces-alta-gama-cdmx.html
```

### Reglas:
- Todo en minusculas
- Separado por guiones (-)
- Sin acentos ni caracteres especiales
- Incluir "cdmx" al final para SEO local
- Maximo 60 caracteres

---

## NOTAS IMPORTANTES

1. **NO modificar** los estilos CSS de variables root
2. **Siempre** incluir el CTA de WhatsApp como primer modulo del sidebar
3. **Actualizar** blog/index.html al agregar nuevos articulos
4. **Mantener** coherencia en el tono: profesional, premium, lujo
5. **Usar** imagenes en formato .avif para mejor rendimiento
6. **Incluir** siempre Schema.org BlogPosting y FAQPage
7. **Verificar** que todos los links internos funcionen
8. **Probar** en mobile antes de publicar

---

**Documento creado:** Enero 2025
**Template base:** `celebraciones-infantiles-ensueno-cdmx.html`
