# Guía de Componentes - Mededul

Esta guía documenta los componentes reutilizables del sitio. Cada componente tiene CSS scoped (independiente) y props dinámicos para personalización.

---

## Componentes Disponibles

| Componente | Ubicación | Uso |
|------------|-----------|-----|
| Hero | `@/components/global/Hero.astro` | Encabezado principal de páginas |
| CTAServices | `@/components/global/CTAServices.astro` | Llamada a acción (integrado en Hero) |
| SectionHeader | `@/components/global/SectionHeader.astro` | Encabezados de sección con dos columnas |
| ServiceCard | `@/components/global/ServiceCard.astro` | Cards de servicios con extracto SEO |
| ReviewCard | `@/components/global/ReviewCard.astro` | Cards de reseñas/testimonios |

---

## 1. Hero Component

Componente unificado para el hero de todas las páginas. Soporta dos modos automáticos:
- **hero--full**: Dos columnas (cuando hay `secondaryContent`)
- **hero--simple**: Una columna centrada (solo título/subtítulo)

### Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `title` | string | ✅ | Título principal |
| `highlight` | string | ❌ | Palabra a destacar con fuente Pacifico |
| `subtitle` | string | ❌ | Subtítulo debajo del título |
| `description` | string | ❌ | Descripción adicional en columna primaria |
| `secondaryContent` | string | ❌ | HTML para segunda columna |
| `id` | string | ❌ | ID para anchor links |
| `showCTA` | boolean | ❌ | Mostrar CTA después del hero |
| `ctaHref` | string | ❌ | URL del botón CTA |
| `ctaBadge` | string | ❌ | Badge del CTA |
| `ctaTitle` | string | ❌ | Título del CTA |
| `ctaTitleHighlight` | string | ❌ | Palabra destacada en título CTA |
| `ctaText` | string | ❌ | Texto descriptivo del CTA |
| `ctaButtonText` | string | ❌ | Texto del botón CTA |

### Ejemplos de Uso

#### Hero Completo (Homepage)
```astro
---
import Hero from '@/components/global/Hero.astro';
---

<Hero
  id="inicio"
  title="Mesas de Dulces para Fiestas en CDMX"
  highlight="Mesas de Dulces"
  subtitle="Candy Bar profesional para bodas, XV años y eventos"
  secondaryContent={`
    <p>Creamos <strong>mesas de dulces espectaculares</strong> para todo tipo de celebraciones.</p>
    <p>Ya sea una elegante <strong>mesa de postres para boda</strong> o una divertida candy bar.</p>
  `}
  showCTA={true}
  ctaHref="/servicios"
  ctaBadge="Servicios Profesionales"
  ctaTitle="Descubre Nuestra Variedad de Mesas"
  ctaTitleHighlight="Variedad"
  ctaText="Encuentra el montaje perfecto para tu evento."
  ctaButtonText="Ver Todos los Servicios"
/>
```

#### Hero Simple (Subpáginas)
```astro
<Hero
  title="Cotiza tu Mesa de Dulces"
  subtitle="Recibe una propuesta personalizada en menos de 24 horas"
/>
```

#### Hero con Descripción (Blog/Artículos)
```astro
<Hero
  title="Tendencias en Mesas de Dulces 2024"
  subtitle="🎂 Consejos y Tips"
  description="Descubre las últimas tendencias para hacer de tu evento algo único."
/>
```

### Notas Importantes

1. **secondaryContent automático**: Si no proporcionas `secondaryContent`, el Hero genera contenido SEO automáticamente basado en la URL (ver `buildSeoSecondaryContent()` en el componente).

2. **CTA integrado**: Cuando `showCTA={true}`, el componente CTAServices se renderiza automáticamente después del hero.

3. **Offset del header**: El hero maneja automáticamente el offset del header fijo con:
   ```css
   margin-top: calc(-1 * var(--site-header-offset, 120px));
   ```

---

## 2. SectionHeader Component

Componente para encabezados de sección con layout de dos columnas.

### Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `title` | string | ✅ | Título de la sección |
| `titleHighlight` | string | ❌ | Palabra(s) a destacar con Pacifico |
| `subtitle` | string | ❌ | Subtítulo debajo del título |
| `content` | string | ❌ | HTML para columna derecha |
| `align` | 'left' \| 'center' | ❌ | Alineación (default: 'left') |

### Ejemplos de Uso

#### Dos Columnas (con contenido)
```astro
---
import SectionHeader from '@/components/global/SectionHeader.astro';
---

<section class="mi-seccion section-padding">
  <div class="container">
    <SectionHeader
      title="Tipos de Mesas de Dulces para Rentar"
      titleHighlight="Mesas de Dulces"
      subtitle="Variedad deliciosa para todos los gustos"
      content={`
        <p>El secreto de una celebración inolvidable está en crear un punto de atracción.</p>
        <p>Cada montaje tiene su propia <strong>personalidad y encanto</strong>.</p>
      `}
    />

    <!-- Contenido de la sección aquí -->
  </div>
</section>
```

#### Una Columna Centrada
```astro
<SectionHeader
  title="Nuestros Servicios"
  titleHighlight="Servicios"
  subtitle="Todo lo que necesitas para tu evento"
  align="center"
/>
```

#### Solo Título y Subtítulo
```astro
<SectionHeader
  title="Preguntas Frecuentes"
  subtitle="Resolvemos tus dudas"
/>
```

---

## 3. CTAServices Component

Llamada a acción con fondo oscuro y diseño profesional. Generalmente se usa integrado en el Hero, pero puede usarse standalone.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `href` | string | '/servicios' | URL del botón |
| `badge` | string | 'Servicios Profesionales' | Texto del badge |
| `title` | string | 'Descubre Nuestra Variedad de Mesas' | Título |
| `titleHighlight` | string | 'Variedad' | Palabra destacada |
| `text` | string | (descripción default) | Texto descriptivo |
| `buttonText` | string | 'Ver Todos los Servicios' | Texto del botón |

### Uso Standalone
```astro
---
import CTAServices from '@/components/global/CTAServices.astro';
---

<CTAServices
  href="/contacto"
  badge="Cotiza Ahora"
  title="¿Listo para tu Evento?"
  titleHighlight="Evento"
  text="Contáctanos y recibe una propuesta personalizada."
  buttonText="Solicitar Cotización"
/>
```

### Uso Integrado en Hero
Ver ejemplos del Hero con `showCTA={true}`.

---

## 4. ServiceCard Component

Card profesional para mostrar servicios, tipos de mesas y eventos. Diseño optimizado para SEO con extracto descriptivo, hover effects y CTA.

### Props

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `href` | string | ✅ | - | URL del enlace |
| `image` | string | ✅ | - | URL de la imagen |
| `alt` | string | ✅ | - | Alt text para SEO |
| `title` | string | ✅ | - | Título de la card |
| `excerpt` | string | ✅ | - | Extracto SEO descriptivo |
| `cta` | string | ❌ | 'Ver más' | Texto del CTA |
| `badge` | string | ❌ | - | Badge opcional (ej: 'Popular') |
| `width` | number | ❌ | 560 | Width de imagen |
| `height` | number | ❌ | 686 | Height de imagen |
| `variant` | 'default' \| 'featured' | ❌ | 'default' | Variante de diseño |

### Ejemplo Básico
```astro
---
import ServiceCard from '@/components/global/ServiceCard.astro';
import { getCdnUrl } from '@/lib/cdn';
---

<div class="service-grid">
  <ServiceCard
    href="/tipos-de-mesas-de-dulces/mesa-de-dulces"
    image={getCdnUrl("/img/tipos-de-mesas/dulces.avif")}
    alt="Mesa de dulces personalizadas CDMX"
    title="Mesa de Dulces"
    excerpt="Candy bar personalizado con dulces premium para bodas, XV años y fiestas infantiles."
    cta="Conocer opciones"
    badge="Popular"
  />
</div>
```

### Con Badge y CTA Personalizado
```astro
<ServiceCard
  href="/servicios/premium"
  image="/img/premium.avif"
  alt="Servicio premium de mesas"
  title="Servicio Premium"
  excerpt="Atención VIP con diseño exclusivo y productos de la más alta calidad."
  cta="Solicitar cotización"
  badge="Nuevo"
/>
```

### Variante Featured (Doble ancho)
```astro
<ServiceCard
  href="/servicios/destacado"
  image="/img/featured.avif"
  alt="Servicio destacado"
  title="Nuestro Servicio Estrella"
  excerpt="La opción más completa para eventos de gran escala."
  variant="featured"
/>
```

### Grid Container
Las cards se usan dentro de un `.service-grid`:
```astro
<div class="service-grid">
  <ServiceCard ... />
  <ServiceCard ... />
  <ServiceCard ... />
  <ServiceCard ... />
</div>
```

El grid es responsive:
- Desktop: 4 columnas
- Tablet (< 1200px): 3 columnas
- Mobile (< 900px): 2 columnas
- Small (< 540px): 1 columna

---

## 5. ReviewCard Component

Card moderna para mostrar reseñas y testimonios de clientes. Diseño profesional con icono de comillas, avatar gradiente, estrellas de calificación y badge de verificación.

### Props

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `name` | string | ✅ | - | Nombre del cliente |
| `initials` | string | ✅ | - | Iniciales para el avatar |
| `review` | string | ✅ | - | Texto de la reseña |
| `event` | string | ✅ | - | Tipo de evento |
| `rating` | number | ❌ | 5 | Calificación 1-5 estrellas |
| `verified` | boolean | ❌ | true | Mostrar badge verificado |

### Ejemplo Básico
```astro
---
import ReviewCard from '@/components/global/ReviewCard.astro';
---

<div class="review-grid">
  <ReviewCard
    name="María Fernanda G."
    initials="MF"
    review="Mi boda fue PERFECTA gracias a Mededul. Los invitados no dejaban de tomar fotos de la mesa de dulces."
    event="Boda en Polanco"
    rating={5}
  />
</div>
```

### Ejemplo sin verificación
```astro
<ReviewCard
  name="Cliente Anónimo"
  initials="CA"
  review="Excelente servicio, muy recomendado."
  event="Evento Privado"
  rating={4}
  verified={false}
/>
```

### Grid Container
Las cards de reseñas se usan dentro de un `.review-grid`:
```astro
<div class="review-grid">
  <ReviewCard ... />
  <ReviewCard ... />
  <ReviewCard ... />
</div>
```

El grid es responsive:
- Desktop: 3 columnas
- Tablet (< 1100px): 2 columnas
- Mobile (< 700px): 1 columna

### Características del diseño
- Icono de comillas decorativo (esquina superior derecha)
- Avatar con gradiente rosa (inicia nombre)
- Estrellas de calificación doradas
- Badge de verificación verde
- Línea rosa en hover (borde superior)
- Sombra rosa sutil en hover
- Tipografía optimizada para legibilidad

---

## Estructura de Archivos

```
src/
├── components/
│   └── global/
│       ├── Hero.astro           # Hero principal
│       ├── CTAServices.astro    # CTA profesional
│       ├── SectionHeader.astro  # Headers de sección
│       ├── ServiceCard.astro    # Cards de servicios
│       ├── ReviewCard.astro     # Cards de reseñas
│       ├── Header.astro         # Navegación
│       ├── Footer.astro         # Pie de página
│       ├── TopBar.astro         # Barra superior
│       └── WhatsAppButton.astro # Botón flotante
├── layouts/
│   ├── BaseLayout.astro         # Layout base del sitio
│   └── BlogPostLayout.astro     # Layout para artículos
└── styles/
    ├── global.css               # Variables y resets
    ├── layout.css               # Breadcrumbs, layouts
    ├── blog.css                 # Estilos del blog
    └── article.css              # Estilos de artículos
```

---

## Variables CSS Globales

Los componentes usan estas variables definidas en `global.css`:

```css
:root {
  --rosa-principal: #E91E8C;
  --rosa-hover: #d11a7d;
  --texto-oscuro: #1a1a1a;
  --gris-texto: #666;
  --gris-claro: #f8f9fa;
  --site-header-offset: 120px; /* Calculado dinámicamente */
}
```

---

## Clases Utilitarias

### Contenedores
- `.container` - Max-width 1200px con padding
- `.container-1400` - Max-width 1400px (usado en artículos)

### Espaciado
- `.section-padding` - Padding vertical estándar para secciones

### Tipografía
- `.titulo-decorativo` - Aplica fuente Pacifico + color rosa
- `.highlight` - Igual que titulo-decorativo (dentro de componentes)

---

## Checklist para Nuevas Páginas

1. [ ] Importar `BaseLayout` como wrapper principal
2. [ ] Agregar `Breadcrumbs` si es subpágina
3. [ ] Usar `Hero` con props apropiados
4. [ ] Usar `SectionHeader` para cada sección con título
5. [ ] Considerar `showCTA={true}` en Hero para retención
6. [ ] Verificar meta tags (title, description) en BaseLayout

---

## Ejemplo: Página Completa

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Breadcrumbs from '@/components/seo/Breadcrumbs.astro';
import Hero from '@/components/global/Hero.astro';
import SectionHeader from '@/components/global/SectionHeader.astro';

const breadcrumbItems = [
  { name: 'Mi Página', url: '/mi-pagina' }
];
---

<BaseLayout
  title="Mi Página | Mededul CDMX"
  description="Descripción de mi página para SEO."
>
  <Breadcrumbs items={breadcrumbItems} />

  <Hero
    title="Título de Mi Página"
    highlight="Mi Página"
    subtitle="Subtítulo descriptivo"
    showCTA={true}
    ctaHref="/contacto"
    ctaTitle="¿Te Interesa?"
    ctaTitleHighlight="Interesa"
    ctaText="Contáctanos para más información."
    ctaButtonText="Contactar"
  />

  <section class="mi-seccion section-padding">
    <div class="container">
      <SectionHeader
        title="Primera Sección"
        titleHighlight="Sección"
        subtitle="Descripción breve"
        content={`<p>Contenido explicativo...</p>`}
      />

      <!-- Contenido de la sección -->
    </div>
  </section>
</BaseLayout>
```

---

**Última actualización:** Febrero 2026
