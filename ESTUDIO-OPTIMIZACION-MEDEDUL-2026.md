# Estudio de Optimización Integral — MEDEDUL (mesas-de-dulces.com)

**Fecha:** 4 de junio de 2026
**Stack:** Astro 4.16 + MDX · static · Cloudflare Pages · ExactDN (EWWW)
**Alcance:** (1) registro de lo implementado en esta serie de sesiones y (2) auditoría de código con plan de optimización (Astro, MDX/layouts, schema y performance).

---

## 1. Resumen ejecutivo

El sitio tiene una base sólida: SEO 100/100, build estático rápido (372 páginas en ~5.4 s), componentes globales bien hechos y un sistema editorial de blog maduro (114 artículos MDX homologados). En esta serie se cerró el principal hueco de rendimiento (CLS por fuentes), se resolvieron al 100% los problemas de accesibilidad del propio sitio, se añadió caché de larga duración y se redujo el peso de imágenes vía CDN.

La mayor oportunidad pendiente **no está en el contenido ni en el SEO, sino en la arquitectura del código**: el sitio tiene **229 páginas `.astro` y ~68.000 líneas**, de las cuales **~21.000 son CSS inline duplicado** y decenas de miles son páginas plantilladas copiadas a mano (la carpeta `sucursales` sola suma 28.806 líneas en 25 páginas casi idénticas). Migrar esas páginas a **rutas dinámicas + colecciones de contenido** —un patrón que el proyecto ya domina en `directorio/` y `blog/`— puede reducir el código de páginas en un **60–75%**, bajar el costo de mantenimiento drásticamente y mejorar la consistencia.

En schema/JSON-LD la cobertura es buena (Organization, LocalBusiness, Article, FAQPage, BreadcrumbList, Service), pero hay **fugas concretas**: el schema `Article` no emite fechas aunque el frontmatter las tiene, el `Service` es idéntico en las 17 páginas que lo usan, hay código muerto, y faltan oportunidades de datos enriquecidos (Offer/precio, WebSite+SearchAction).

---

## 2. Parte 1 — Lo implementado en esta serie

### 2.1 Contenido (serie de cursos / tips)

Cinco artículos MDX nuevos, profesionales, de 2.000–3.000 palabras, estructurados como **pilar + 4 capítulos** con interlinking cruzado entre sí y hacia servicios, estaciones y páginas de marca:

| Artículo | Categoría | Enfoque |
|---|---|---|
| Aprende a hacer mesas de dulces profesionales | tips-consejos | Pilar: 6 competencias + método |
| Diseño y composición | tips-consejos | Alturas, foco, impares, paleta, backdrop |
| Curaduría y cantidades | tips-consejos | 5 familias + gramos por invitado |
| Montaje, operación y seguridad | tips-consejos | Visita técnica, food safety, cierre |
| Mesa de dulces instagrameable | tendencias | Backdrop, luz, fotografía |

Cada uno cumple la guía editorial (frontmatter válido, 4 FAQ, componentes homologados, gancho de marca de "cursos" sin promesas ni precios). Validados con `validate-mdx`, `lint:content` y `lint:markdown` sin errores.

### 2.2 Rendimiento — CLS (Core Web Vital en rojo)

**Causa raíz identificada en código** (no supuesta): el `<h1>` del Hero usa Poppins 800 + Pacifico, y las fuentes cargaban tarde (inyección async por JS) con `display=swap`. El swap tardío reflowaba el título → CLS 0.337 en escritorio / 0.217 en móvil.

**Fix aplicado** (preserva la marca; la webfont sigue cargando):

- `src/styles/global.css`: dos `@font-face` fallback con métricas ajustadas (`size-adjust`, `ascent/descent/line-gap-override`) — "Poppins Fallback" y "Pacifico Fallback" sobre Arial. El fallback ocupa el mismo espacio que la webfont, de modo que el swap **no mueve el layout**.
- Stacks actualizados en `--font-principal`, `--font-decorativa` y en el `<h1>` del Hero (elemento LCP).

### 2.3 Caché (Cloudflare Pages)

`public/_headers` nuevo: `Cache-Control: public, max-age=31536000, immutable` para `/_astro`, `/img`, `/fonts`, css/js; el HTML revalida para reflejar deploys. Resuelve el hallazgo de "caché ineficiente".

### 2.4 Accesibilidad — verificado en vivo con axe-core

Auditoría real con axe sobre el sitio corriendo (no estimación). Estado del **código propio**: de 115 violaciones a **0**.

| Problema | Detalle | Fix |
|---|---|---|
| `aria-prohibited-attr` (9) | `aria-label` en `<div>` sin rol (estrellas de reseña) | `role="img"` en `.review-v6__stars` |
| `color-contrast` (106) | 4 pares por debajo de 4.5:1 | ServiceCard `#999→#6e6e6e`, FAQContactModule `#888→#6e6e6e`, QuickEventNav `rgba(255,255,255,.72)→#ffeef6` |

> Las violaciones restantes que reporta cualquier auditoría externa (`.wai-shadow-host`, `html-has-lang`) provienen del **widget de chat de terceros (dmchamp/whatzai)** y de **extensiones del navegador**, no del sitio.

### 2.5 Imágenes

`src/lib/cdn.ts`: `getCdnUrl` ahora aplica **calidad por defecto `q=75`** a toda imagen del CDN (antes muchas iban sin `q`); galería del home `q:80→75`. AVIF a 75 es visualmente equivalente a 80 con ~15–20% menos peso. Cualquier llamada con su propio `q` lo sobreescribe.

### 2.6 Verificación

`npm run build` → **372 páginas, ~5.4 s, sin errores**. Cambios confirmados en el output (`?q=75`, `role="img"`, colores de contraste, fallbacks de fuente inline en `<head>`).

---

## 3. Parte 2 — Auditoría de código y oportunidades

### 3.1 Reducción de código: el gran hallazgo

**Inventario medido:**

| Carpeta | Páginas `.astro` | Líneas | Promedio/página |
|---|---:|---:|---:|
| sucursales | 25 | 28.806 | ~1.150 |
| candy-bar-eventos | 10 | 11.069 | ~1.107 |
| zonas-cdmx | 12 | 4.494 | ~375 |
| tipos-de-mesas-de-dulces | 9 | 3.796 | ~422 |
| estaciones-interactivas | 5 | 2.071 | ~414 |
| porque-mededul | 5 | 1.040 | ~208 |
| **Total `src/pages` (todas)** | **229** | **67.926** | — |

Dos patrones cuestan la mayor parte del código:

**a) CSS inline duplicado — ~20.959 líneas.** El 31% de todo el código de páginas son bloques `<style>` dentro de cada `.astro`. Páginas hermanas repiten 145–540 líneas de CSS casi idéntico. Ejemplo: `sucursales/cdmx/mesa-de-dulces/baby-shower.astro` (1.255 líneas) y su gemela de Toluca (895 líneas) comparten ~60% de estructura tras normalizar nombres de ciudad.

**b) Páginas plantilladas copiadas a mano.** Las colecciones `candy-bar`, `tipos-mesas`, `estaciones` y `porque-mededul` están **definidas en `src/content/config.ts` pero vacías** (0 archivos). Es decir: el esquema de datos existe, pero las páginas se escribieron como `.astro` hardcodeados en vez de alimentarse de datos.

**El proyecto ya sabe hacerlo bien:** `directorio/cdmx/[alcaldia].astro`, `directorio/toluca/[municipio].astro` y todo `blog/` usan `getStaticPaths()` con datos (`src/data/dulcerias.ts`, colección `blog`). El patrón está probado; solo falta aplicarlo a servicios y sucursales.

#### Recomendación de refactor (alto impacto)

1. **Extraer todo el CSS de página a hojas compartidas / estilos de componente.** Mover los `<style>` repetidos a `src/styles/` (o a estilos scoped de los componentes globales que ya existen: Hero, ServiceCard, PricingPackages, ProcessSteps, FAQContactModule). Beneficio: −15.000 a −18.000 líneas, menos CSS sin usar, una sola fuente de verdad de diseño.

2. **Crear `ServicePageLayout.astro`** que encapsule el patrón común (Breadcrumbs → Hero → Stats → WhyChooseUs → PricingPackages → ProcessSteps → galería → FAQContactModule → JSON-LD). Cada página de servicio queda reducida a su data.

3. **Migrar sucursales y candy-bar-eventos a rutas dinámicas + datos.** Por ejemplo `sucursales/[ciudad]/[servicio].astro` con `getStaticPaths()` alimentado por una colección de contenido o un archivo en `src/data/`. Estimación: las ~28.800 líneas de `sucursales` colapsan a **1 plantilla + 1 archivo de datos** (≈ −90% en esa carpeta).

4. **Poblar las colecciones vacías** (`tipos-mesas`, `estaciones`, `candy-bar`) con archivos `.md`/`.mdx` o `.json`, y generar las páginas desde ahí. Esto unifica el contenido editable sin tocar `.astro`.

> Orden sugerido por ROI: (1) CSS → hojas compartidas, (2) `ServicePageLayout`, (3) dinamizar `sucursales`, (4) dinamizar `candy-bar-eventos` y `tipos-mesas`.

### 3.2 Astro / layouts / componentes

- **Solo hay 2 layouts** (`BaseLayout`, `BlogPostLayout`) para 229 páginas. Falta un `ServicePageLayout` y un `LandingLayout` (sucursales/zonas). Hoy esa estructura se repite inline en cada página.
- **Datos ya parcialmente extraídos:** `src/data/subsections.ts` (16 KB) y `dulcerias.ts` (220 KB) demuestran el patrón. Conviene crear `src/data/servicios.ts`, `sucursales.ts`, `zonas.ts` y centralizar stats, FAQs, paquetes y textos.
- **Componentes globales sólidos** (Hero, ServiceCard, PricingPackages, ProcessSteps, FAQContactModule, ReviewCard): son reutilizables y deberían ser el único lugar con CSS de esos bloques.
- **Astro Image:** evaluar `astro:assets` (`<Image />`) para activos locales no servidos por ExactDN; genera dimensiones y formatos automáticamente y evita el `<img>` manual.

### 3.3 MDX / Markdown (blog)

El blog está bien: `BlogPostLayout` inyecta Hero (H1), hero image con `srcset`, FAQ, RelatedArticles y CTA final; los componentes de contenido (AlertBox, InfoCard, CTABox, ComparisonTable, StepList, etc.) están homologados. Mejoras finas:

- **Snippets de importación repetidos:** cada artículo repite 5–9 líneas de `import` de componentes. Se puede reducir con un wrapper MDX o exponiendo los componentes globalmente vía la config de MDX (`components` en el layout) para no importarlos en cada archivo.
- **Frontmatter `faqs` repetido:** las FAQ viven en el frontmatter (bien para schema), pero conviene un validador que asegure 4–6 por artículo (ya casi está en `validate-content.cjs`).
- **`draft: true` pendientes:** la memoria del proyecto menciona artículos en draft; verificar el filtro del router para que no se compilen ni indexen.

### 3.4 Schema / JSON-LD — auditoría detallada

`src/components/seo/JsonLd.astro` soporta 6 tipos. Estado real por hallazgo:

| Tipo | Estado | Nota |
|---|---|---|
| Organization | OK | Completo (dirección, contactPoint, sameAs) |
| LocalBusiness | OK | Completo; `aggregateRating` hardcodeado 4.9/127 |
| Article | ⚠️ Incompleto | **No emite `datePublished`/`dateModified`** aunque el frontmatter los tiene |
| FAQPage | OK | Correcto |
| BreadcrumbList | ⚠️ Duplicado | Lo emite `Breadcrumbs.astro` (inline); la copia en `JsonLd.astro` es **código muerto** |
| Service | ⚠️ Genérico | Idéntico en las 17 páginas; sin especificidad por servicio ni `Offer`/precio |

**Fugas y fixes concretos:**

1. **Article sin fechas (prioritario).** `BlogPostLayout` pasa solo `{title, description, image, url}`. Añadir `datePublished` (publishDate), `dateModified` (modifiedDate o publishDate) e `inLanguage: "es-MX"` al schema `Article`. Google usa estas fechas para frescura y rich results.

2. **`getBreadcrumbSchema` es código muerto** en `JsonLd.astro` (nunca se llama; los breadcrumbs ya salen por `Breadcrumbs.astro`). Eliminar la función y el `case 'BreadcrumbList'` para evitar confusión, **o** centralizar todo en `JsonLd` y quitar el inline del componente. Elegir una sola fuente.

3. **Service demasiado genérico.** Las 17 páginas emiten el mismo `Service` con el mismo `hasOfferCatalog`. Parametrizarlo por página (nombre, descripción, `areaServed` real) y, donde haya paquetes, emitir `Offer` con `priceRange`/`priceCurrency`. El schema de la colección `tipos-mesas` ya contempla `packages.price` pero las páginas no lo aprovechan.

4. **Falta `WebSite` + `SearchAction`** (sitelinks searchbox). Añadir un schema `WebSite` en `BaseLayout` con `potentialAction` apuntando al buscador del blog. Mejora la presentación en Google.

5. **Inconsistencia `foundingDate: 2020`** vs el claim de marca "8+ años" (que implica ~2018). Alinear el dato.

6. **`aggregateRating` hardcodeado.** Mantenerlo sincronizado con reseñas reales visibles en la página (riesgo de penalización si no hay reseñas que lo respalden). Idealmente derivarlo de los datos de `ReviewCard`.

7. **Cross-linking por `@id`.** `Article.publisher` repite el bloque Organization en vez de referenciar `@id`. Definir `@id` estables (`/#organization`, `/#localbusiness`) y referenciarlos desde Article/Service/Breadcrumb para un grafo de entidades limpio.

### 3.5 Performance restante (fuera de lo ya hecho)

- **Widget de chat de terceros (dmchamp/whatzai)** — origen del **JS sin usar (~51 KB)**, de **tareas largas en el hilo principal** y del **único error de consola** (`chat-widget-session → 403`). Recomendación: cargarlo **diferido** (tras interacción / `requestIdleCallback`) o revisar el 403 con el proveedor; es la mayor mejora de TBT e INP disponible. Decisión de negocio (es lead-gen).
- **Imágenes (lever grande del audit, ~2.2 MB):** vive en el **dashboard de ExactDN/EWWW** (calidad global, auto AVIF/WebP por `Accept`, límites de tamaño). Ajustar ahí complementa el `q=75` por defecto del código.
- **CSS sin usar (~12–14 KB):** se reduce solo al ejecutar el refactor de §3.1 (mover CSS inline a hojas compartidas y purgar). Evitar PurgeCSS agresivo manual por riesgo.
- **Logo `mededul.png` = 534 KB en origen.** ExactDN lo sirve a `w=240`, pero conviene optimizar el archivo fuente (PNG comprimido o AVIF) por si alguna referencia lo usa sin resize.

---

## 4. Parte 3 — Plan priorizado

| # | Acción | Impacto | Esfuerzo | Tipo |
|---|---|---|---|---|
| 1 | Article schema: añadir `datePublished`/`dateModified`/`inLanguage` | Alto (SEO) | Bajo | Código |
| 2 | Diferir/optimizar widget de chat (JS, consola, TBT) | Alto (perf) | Bajo–Medio | Código/Negocio |
| 3 | Ajustar calidad/formatos en dashboard ExactDN | Alto (−2 MB) | Bajo | Config externa |
| 4 | Mover CSS inline (~21k líneas) a hojas/estilos de componente | Alto (mantenibilidad) | Medio–Alto | Refactor |
| 5 | `ServicePageLayout` + dinamizar `sucursales` con `getStaticPaths` | Alto (−code) | Medio–Alto | Refactor |
| 6 | Service schema por página + `Offer`/precio | Medio (SEO) | Medio | Código |
| 7 | Limpiar código muerto `BreadcrumbList` en `JsonLd.astro` | Bajo | Bajo | Limpieza |
| 8 | `WebSite` + `SearchAction`; `@id` cross-linking; `foundingDate` | Medio (SEO) | Bajo | Código |
| 9 | Poblar colecciones vacías (`tipos-mesas`, `estaciones`, `candy-bar`) | Medio | Medio | Refactor |
| 10 | MDX: componentes globales sin imports por archivo | Bajo | Bajo | DX |

### Roadmap sugerido por fases

- **Fase 1 — Quick wins SEO/perf (días):** #1, #7, #8, #3. Cambios pequeños, alto retorno, sin riesgo estructural.
- **Fase 2 — Performance terceros (días):** #2. Diferir el chat; medir TBT/INP antes/después.
- **Fase 3 — Refactor de arquitectura (semanas, incremental):** #4 → #5 → #9 → #6. Empezar por una carpeta piloto (`tipos-de-mesas-de-dulces`, la más pequeña) para validar el patrón antes de migrar `sucursales`.
- **Fase 4 — DX (continuo):** #10 y validadores adicionales.

---

## 5. Anexo

### 5.1 Archivos modificados en esta serie

- `src/styles/global.css` — `@font-face` fallback + stacks (CLS).
- `src/components/global/Hero.astro` — font stack del H1/highlight.
- `src/components/global/ReviewCard.astro` — `role="img"` en estrellas.
- `src/components/global/ServiceCard.astro` — contraste `#6e6e6e`.
- `src/components/global/FAQContactModule.astro` — contraste `#6e6e6e`.
- `src/components/global/QuickEventNav.astro` — contraste `#ffeef6`.
- `src/lib/cdn.ts` — calidad por defecto `q=75`.
- `src/pages/index.astro` — galería `q:80→75`.
- `public/_headers` — caché Cloudflare Pages (nuevo).
- `src/content/blog/` — 5 artículos MDX nuevos.

### 5.2 Métricas de referencia

- Páginas `.astro`: 229 · líneas: 67.926 · CSS inline en páginas: 20.959.
- Build: 372 páginas en ~5.4 s, sin errores.
- Accesibilidad (código propio, axe en vivo): 0 violaciones.
- Colecciones vacías: `candy-bar`, `tipos-mesas`, `estaciones`, `porque-mededul`.
- Rutas dinámicas ya en uso: `blog/`, `directorio/` (patrón a replicar).

---

*Documento generado como auditoría técnica interna. Las cifras provienen de inspección directa del repositorio y de auditoría en vivo del sitio en local; los resultados de PageSpeed/CrUX referidos son los aportados por el cliente.*
