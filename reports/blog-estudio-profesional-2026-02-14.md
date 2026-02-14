# Estudio Profesional del Blog y su Configuracion

Fecha de auditoria: 2026-02-14  
Proyecto: `MEDEDUL`  
Ruta auditada: `/Users/carsolio/Desktop/PAGINAS-HTML/MEDEDUL`

## 1. Resumen Ejecutivo

El blog esta funcional, compila correctamente y tiene una arquitectura base solida en Astro + MDX, con buen soporte SEO tecnico (metadatos, JSON-LD, breadcrumbs, categorias, tags y paginacion).  
Sin embargo, se detectan riesgos editoriales y de indexacion importantes: enlaces desde contenido publicado hacia articulos en `draft`, taxonomia de tags sobredimensionada (muchas paginas delgadas), y enlaces estaticos en sidebar que apuntan a rutas no generadas.

Veredicto general: **Base tecnica estable con deuda SEO/editorial media-alta**.

## 2. Alcance y Metodo

Se auditaron:

- Configuracion global (`package.json`, `astro.config.mjs`, `tsconfig.json`, `robots.txt`, workflow deploy).
- Arquitectura de rutas del blog (`/blog`, `slug`, categorias, tags, paginacion).
- Layouts, componentes blog, componentes SEO y componentes MDX.
- Coleccion de contenido `src/content/blog` completa (61 articulos).
- Validaciones y build real del proyecto.

Comandos de validacion ejecutados:

- `npm run check` (sin errores; 3 hints)
- `npm run build` (build exitoso)

## 3. Arquitectura Tecnica del Blog

### Stack

- Framework: `astro@4.15.0`
- Integracion contenido: `@astrojs/mdx@3.1.0`
- Imagenes: `sharp` + CDN ExactDN (`src/lib/cdn.ts`)
- Salida: sitio estatico (`output: 'static'`)

### Rutas blog implementadas

- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`
- `src/pages/blog/categoria/[category].astro`
- `src/pages/blog/tag/[tag].astro`
- `src/pages/blog/pagina/[page].astro`

### Render y build (estado actual)

- Articulos publicados generados: **46**
- Paginas de categoria generadas: **9**
- Paginas de tag generadas: **89**
- Paginas de paginacion generadas: **5**
- Total `index.html` en `dist`: **184**
- Build total reportado por Astro: **185 paginas** (incluye `404.html`)

## 4. Configuracion y SEO

### Fortalezas

- Canonical, Open Graph y Twitter Cards centralizados en `src/components/seo/SEO.astro`.
- JSON-LD operativo para `Article`, `FAQPage`, `BreadcrumbList`, `Organization`, `LocalBusiness`, `Service`.
- Breadcrumbs visibles + JSON-LD en `src/components/seo/Breadcrumbs.astro`.
- `robots.txt` y `sitemap.xml` presentes.
- Validacion de contenido e imagenes en `scripts/validate-content.cjs`.

### Hallazgos tecnicos SEO

1. `scripts/generate-sitemap.cjs` fuerza `lastmod` con fecha de build para todas las URLs.
2. `@astrojs/sitemap` esta en dependencias pero no integrado en `astro.config.mjs`; se usa un sitemap manual.
3. Todos los articulos tienen la misma `publishDate` (`2026-01-15`) y ninguno tiene `modifiedDate`.

Impacto: señales temporales pobres para rastreo/priorizacion de contenidos.

## 5. Componentes del Ecosistema Blog

### Componentes blog (4)

- `src/components/blog/BlogArchive.astro`
- `src/components/blog/BlogPostCard.astro`
- `src/components/blog/BlogSidebar.astro`
- `src/components/blog/ArticleSidebar.astro`

### Componentes SEO (3)

- `src/components/seo/SEO.astro`
- `src/components/seo/JsonLd.astro`
- `src/components/seo/Breadcrumbs.astro`

### Componentes de contenido MDX (10 disponibles)

- `AlertBox`, `CTABox`, `ComparisonTable`, `FeatureList`, `InfoCard`, `ProsCons`, `Quote`, `StatCard`, `StatsGrid`, `StepList`

### Uso real dentro de los 61 articulos

- `AlertBox`: 61/61
- `InfoCard`: 61/61
- `CTABox`: 61/61
- Resto de componentes: **0/61**

Lectura profesional: hay capacidad editorial rica, pero el contenido publicado esta homologado en un patron muy repetitivo.

## 6. Inventario de Contenido (Blog)

### Estadisticas globales

- Total articulos MDX: **61**
- Publicados (`draft != true`): **46**
- En borrador (`draft: true`): **15**
- Promedio aproximado de palabras: **631**
- `missing tags`: 0
- `missing modifiedDate`: 61

### Distribucion por categoria (total)

- bodas: 14
- corporativos: 12
- xv-anos: 12
- baby-shower: 7
- fiestas-infantiles: 7
- estaciones: 3
- tips-consejos: 3
- tendencias: 2
- bautizos: 1

### Distribucion por categoria (solo publicados)

- corporativos: 11
- bodas: 10
- xv-anos: 7
- fiestas-infantiles: 7
- baby-shower: 6
- estaciones: 2
- tips-consejos: 1
- tendencias: 1
- bautizos: 1

### Taxonomia de tags (solo publicados)

- Tags unicos: **89**
- Tags con 1 solo articulo: **58**
- Tags con 2 o menos articulos: **65**

Riesgo: exceso de paginas de tag delgadas para el volumen actual de contenido.

## 7. Hallazgos Criticos y Riesgos

### Critico 1: enlaces a rutas no generadas desde sidebar

En `src/components/blog/ArticleSidebar.astro` existen enlaces a:

- `/galeria` (no existe en `dist`)
- `/blog/categoria/guias` (no existe categoria `guias` en contenido ni build)

Impacto: 404 internos desde pagina de articulo.

### Critico 2: articulos publicados enlazan a articulos en draft

Se detectaron **11 enlaces** desde articulos publicados hacia slugs en borrador. Ejemplos:

- `colores-tematicas-mesa-dulces-quinceanera.mdx -> /blog/tendencias-mesa-dulces-xv-anos-2025`
- `tendencias-candy-bar-bodas-2025.mdx -> /blog/tendencias-mesas-dulces-2025-cdmx`
- `roi-mesas-dulces-eventos-corporativos.mdx -> /blog/mesas-dulces-exclusivas-eventos-corporativos`

Impacto: fuga de autoridad interna a URLs no indexables/no publicadas + mala experiencia de usuario.

### Alto 1: canibalizacion potencial y similitud editorial

- Se detectaron **48 pares** de articulos con similitud alta (>= 0.82) en contenido.
- Hay al menos un titulo duplicado exacto en 2 slugs distintos de XV anos.

Impacto: superposicion tematica, dificultad de posicionar una URL principal por intencion.

### Alto 2: validadores con cobertura parcial

- `validate-content.cjs` no inspecciona `href` dinamicos en objetos JS (ej. `url` en arrays de componentes).
- `lint-markdown.cjs` no valida links Markdown `[texto](/ruta)`.

Impacto: problemas reales de enlazado interno pueden pasar CI sin deteccion.

### Medio 1: sobrecarga funcional en Hero

`src/components/global/Hero.astro` concentra:

- logica de copy SEO por ruta,
- logica de CTA contextual,
- render visual.

Tamano: **828 lineas**.

Impacto: mantenimiento complejo y riesgo de regresiones por acoplamiento.

## 8. Estado de Calidad Tecnica

### Validaciones

- `npm run check`: OK (0 errores, 0 warnings, 3 hints)
- Hint actual fuera del blog:
  - imports y variables no usadas en `src/pages/tipos-de-mesas-de-dulces/mesa-de-donas-y-cupcakes.astro`

### Build

- `npm run build`: OK
- Sitemap generado: `184 URLs`

## 9. Plan de Mejora Recomendado

### Fase 1 (prioridad inmediata, 1-3 dias)

1. Corregir en `ArticleSidebar` los enlaces `/galeria` y categoria `guias`.
2. Remover o reemplazar los 11 enlaces desde posts publicados hacia slugs draft.
3. Agregar validacion CI para links Markdown y rutas dinamicas en componentes.

### Fase 2 (prioridad alta, 1-2 semanas)

1. Consolidar articulos muy similares (clusters bodas, xv, corporativos).
2. Definir politica de tags (minimo 3-4 posts por tag antes de indexar).
3. Normalizar fechas: `publishDate` reales + `modifiedDate` cuando aplique.

### Fase 3 (optimizacion estructural)

1. Desacoplar `Hero.astro` (copy/contexto a modulo de datos aparte).
2. Evaluar migrar sitemap manual a integracion oficial o enriquecer `lastmod` real por contenido.
3. Ampliar uso de componentes MDX para reducir plantilla repetitiva.

## 10. Inventario Completo de Articulos

Formato: `slug | estado | categoria | publishDate | title`

| Slug | Estado | Categoria | Fecha | Titulo |
|---|---|---|---|---|
| barra-postres-gourmet-eventos-cdmx | published | tips-consejos | 2026-01-15 | Barra de Postres Gourmet para Eventos Elegantes \| CDMX |
| catering-dulces-eventos-empresariales-cdmx | published | corporativos | 2026-01-15 | Catering de Dulces para Eventos Empresariales \| CDMX |
| celebraciones-infantiles-ensueno-cdmx | published | fiestas-infantiles | 2026-01-15 | Celebraciones Infantiles de Ensueno con Mesa de Dulces \| CDMX |
| colores-tematicas-mesa-dulces-quinceanera | published | xv-anos | 2026-01-15 | Colores y Tematicas para Mesa de Dulces de Quinceanera \| CDMX |
| como-elegir-colores-mesa-dulces-boda | published | bodas | 2026-01-15 | Como Elegir Colores para tu Mesa de Dulces de Boda \| CDMX |
| elegancia-dulce-mesas-bodas-exclusivas-cdmx | published | bodas | 2026-01-15 | Elegancia Dulce: Mesas para Bodas Exclusivas en CDMX \| Guia |
| errores-comunes-mesa-dulces-boda | published | bodas | 2026-01-15 | Errores Comunes en Mesa de Dulces para Boda y Como Evitarlos \| CDMX |
| errores-comunes-mesa-dulces-xv-anos | published | xv-anos | 2026-01-15 | Errores Comunes en Mesa de Dulces para XV Anos y Soluciones \| CDMX |
| estaciones-interactivas-gourmet-para-eventos-exquisitos | published | estaciones | 2026-01-15 | Estaciones Interactivas Gourmet para Eventos Exquisitos \| CDMX |
| estaciones-interactivas-team-building | published | corporativos | 2026-01-15 | Estaciones Interactivas para Team Building Efectivo \| CDMX |
| experiencias-dulces-inolvidables-quinceaneras | published | xv-anos | 2026-01-15 | Mesas de Dulces para XV Anos en CDMX \| Guia Completa 2025 |
| guia-completa-fuentes-chocolate-eventos-cdmx | published | estaciones | 2026-01-15 | Guia Completa de Fuentes de Chocolate para Eventos \| CDMX |
| ideas-mesa-dulces-baby-shower-perfecta | published | baby-shower | 2026-01-15 | Ideas para una Mesa de Dulces de Baby Shower Perfecta \| CDMX |
| la-magia-de-la-mesa-de-dulces-en-baby-showers-bosques-de-las-loma | published | baby-shower | 2026-01-15 | La Magia de la Mesa de Dulces en Baby Showers \| CDMX |
| magia-de-mesas-dulces-en-fiestas-infantiles-condesa | published | fiestas-infantiles | 2026-01-15 | Magia de Mesas Dulces en Fiestas Infantiles \| CDMX |
| mesa-de-dulces-baby-shower-transforma-tu-celebracion-con-enc-pedr | published | baby-shower | 2026-01-15 | Mesa de Dulces Baby Shower: Transforma Tu Celebracion con Encanto \| CDMX |
| mesa-de-dulces-corporativo-catering-premium-para-eventos-emp-roma | published | corporativos | 2026-01-15 | Mesa de Dulces Corporativo: Catering Premium para Eventos Empresariales \| CDMX |
| mesa-de-dulces-corporativos-eleva-tus-eventos-empresari-condesa | published | corporativos | 2026-01-15 | Mesa de Dulces Corporativos: Eleva tus Eventos Empresariales \| CDMX |
| mesa-de-dulces-corporativos-endulza-tus-eventos-empresariale-sant | published | corporativos | 2026-01-15 | Mesa de Dulces Corporativos: Endulza Tus Eventos Empresariales \| CDMX |
| mesa-de-dulces-corporativos-impresiona-en-eventos-empresaria-pola | published | corporativos | 2026-01-15 | Mesa de Dulces Corporativos: Impresiona en Eventos Empresariales CDMX \| Guia |
| mesa-de-dulces-cumpleanos-infantil-en-cdmx | published | fiestas-infantiles | 2026-01-15 | Mesa de Dulces Cumpleanos Infantil en CDMX \| Guia Profesional |
| mesa-de-dulces-infantil-guia-completa-para-fiestas-magi-polanco | published | fiestas-infantiles | 2026-01-15 | Mesa de Dulces Infantil: Guia Completa para Fiestas Magicas \| CDMX |
| mesa-de-dulces-infantil-un-sueno-hecho-realidad-interlomas | published | fiestas-infantiles | 2026-01-15 | Mesa de Dulces Infantil: Un Sueno Hecho Realidad \| CDMX |
| mesa-de-dulces-para-baby-shower-guia-completa | published | baby-shower | 2026-01-15 | Mesa de Dulces para Baby Shower: Guia Completa \| CDMX |
| mesa-de-dulces-para-baby-shower-magia-en-cada-dulce-interlomas | published | baby-shower | 2026-01-15 | Mesa de Dulces para Baby Shower: Magia en Cada Dulce \| CDMX |
| mesa-de-dulces-para-bodas-endulza-tu-dia-perfecto-cdmx | published | bodas | 2026-01-15 | Mesa de Dulces para Bodas: Endulza Tu Dia Perfecto \| CDMX |
| mesa-de-dulces-para-xv-anos-guia-completa-para-una-cele-pedregal | published | xv-anos | 2026-01-15 | Mesa de Dulces para XV Anos: Guia Completa para una Celebracion Memorable \| CDMX |
| mesa-de-dulces-para-xv-anos-guia-completa | published | xv-anos | 2026-01-15 | Mesa de Dulces para XV Anos: Guia Completa para una Celebracion Memorable \| CDMX |
| mesa-de-dulces-xv-anos-crea-una-celebracion-inolvidable-santa-fe | published | xv-anos | 2026-01-15 | Mesa de Dulces XV Anos: Crea una Celebracion Inolvidable \| CDMX |
| mesa-dulces-baby-shower-ideas-creativas | published | baby-shower | 2026-01-15 | Mesa de Dulces para Baby Shower: Ideas Creativas \| CDMX |
| mesa-dulces-bautizo-elegante-cdmx | published | bautizos | 2026-01-15 | Mesa de Dulces para Bautizo Elegante en CDMX \| Guia |
| mesa-dulces-boda-cdmx-elegancia-y-estilo | published | bodas | 2026-01-15 | Mesa Dulces Boda CDMX: Elegancia y Estilo \| Guia |
| mesa-dulces-boda-intima-pequena | published | bodas | 2026-01-15 | Mesa de Dulces para Boda Intima y Pequena \| CDMX |
| mesa-dulces-boda-jardin-exterior | published | bodas | 2026-01-15 | Mesa de Dulces para Boda en Jardin: Guia Completa \| CDMX |
| mesa-dulces-bodas-exclusivas-cdmx | published | bodas | 2026-01-15 | Mesa de Dulces para Bodas Exclusivas en CDMX \| Guia Premium |
| mesa-dulces-bodas-guia-completa | published | bodas | 2026-01-15 | Mesa de Dulces para Bodas en CDMX: Guia Completa \| 2026 |
| mesa-dulces-conferencias-congresos | published | corporativos | 2026-01-15 | Mesa de Dulces para Conferencias y Congresos en CDMX \| Guia |
| mesa-dulces-cumpleanos-infantil-ideas | published | fiestas-infantiles | 2026-01-15 | Mesa de Dulces para Cumpleanos Infantil en CDMX \| Ideas |
| mesa-dulces-estaciones-interactivas-gourmet-transforma-tu-evento | draft | estaciones | 2026-01-15 | Estaciones Interactivas Gourmet para Eventos en CDMX \| Guia |
| mesa-dulces-eventos-corporativos-cdmx | published | corporativos | 2026-01-15 | Mesa de Dulces para Eventos Corporativos en CDMX \| Guia |
| mesa-dulces-eventos-corporativos-empresas | published | corporativos | 2026-01-15 | Mesa de Dulces para Empresas en CDMX \| Eventos Corporativos |
| mesa-dulces-lanzamiento-productos | published | corporativos | 2026-01-15 | Mesa de Dulces para Lanzamiento de Productos en CDMX \| Marketing |
| mesa-dulces-mexicanos-tradicionales-eventos | draft | tips-consejos | 2026-01-15 | Mesa de Dulces Mexicanos para Eventos en CDMX \| Guia |
| mesa-dulces-xv-anos-elegante-cdmx | draft | xv-anos | 2026-01-15 | Mesa de Dulces para XV Anos Elegante en CDMX \| Guia |
| mesa-dulces-xv-anos-elegante-sofisticada | draft | xv-anos | 2026-01-15 | Mesa de Dulces XV Anos Elegante y Sofisticada en CDMX \| Guia |
| mesa-dulces-xv-anos-ideas-tendencias | published | xv-anos | 2026-01-15 | Mesa de Dulces para XV Anos: Ideas y Tendencias en CDMX \| Guia |
| mesas-de-dulces-elegancia-y-singularidad-en-bodas-de-lujo | draft | bodas | 2026-01-15 | Mesa Dulces Boda Lujo en CDMX \| Guia Premium |
| mesas-de-dulces-elegantes-para-baby-showers-en-cdmx | draft | baby-shower | 2026-01-15 | Mesas Dulces Baby Shower CDMX Elegantes \| Guia |
| mesas-de-dulces-elegantes-para-bodas-en-cdmx | draft | bodas | 2026-01-15 | Mesa Dulces Boda CDMX: Elegancia y Sabor \| Guia |
| mesas-de-dulces-para-bodas-elegantes-en-cdmx | published | bodas | 2026-01-15 | Mesas de Dulces para Bodas Elegantes en CDMX \| Guia |
| mesas-dulces-cuspide-lujo-celebraciones | draft | tips-consejos | 2026-01-15 | Guia de Dulces para tu Mesa: Que Incluir Segun tu Evento 2025 \| CDMX |
| mesas-dulces-exclusivas-arte-sofisticacion-bodas | draft | bodas | 2026-01-15 | Mesa de Dulces Segun tu Venue: Guia por Tipo de Espacio 2025 \| CDMX |
| mesas-dulces-exclusivas-eventos-corporativos | draft | corporativos | 2026-01-15 | Mesa de Dulces para Eventos Corporativos: Guia por Tipo de Evento 2025 \| CDMX |
| mesas-dulces-magia-distincion-fiestas-infantiles | published | fiestas-infantiles | 2026-01-15 | Mesa de Dulces por Edad del Nino: Guia 1-12 Anos 2025 \| CDMX |
| mesas-dulces-toque-lujo-bodas-exclusivas | draft | bodas | 2026-01-15 | Presupuesto Mesa de Dulces para Boda 2025 \| Guia de Costos CDMX |
| mesas-dulces-xv-anos-alta-sociedad-cdmx | draft | xv-anos | 2026-01-15 | Checklist Mesa de Dulces XV Anos: Guia de Planificacion 2025 \| CDMX |
| presupuesto-mesa-dulces-quinceanera | draft | xv-anos | 2026-01-15 | Presupuesto Mesa de Dulces para Quinceanera en CDMX \| Guia |
| roi-mesas-dulces-eventos-corporativos | published | corporativos | 2026-01-15 | ROI de Mesas de Dulces en Eventos Corporativos \| Metricas CDMX |
| tendencias-candy-bar-bodas-2025 | published | tendencias | 2026-01-15 | Tendencias Candy Bar Bodas 2025 en CDMX \| Guia |
| tendencias-mesa-dulces-xv-anos-2025 | draft | xv-anos | 2026-01-15 | Tendencias Mesa de Dulces XV Anos 2025 en CDMX \| Guia |
| tendencias-mesas-dulces-2025-cdmx | draft | tendencias | 2026-01-15 | Tendencias Mesas de Dulces 2025 CDMX \| Lo Mas Nuevo en Candy Bars |

## 11. Anexo Tecnico de Evidencias

### 11.1 Enlaces desde publicado hacia draft (11)

- `colores-tematicas-mesa-dulces-quinceanera.mdx` -> `/blog/tendencias-mesa-dulces-xv-anos-2025`
- `errores-comunes-mesa-dulces-xv-anos.mdx` -> `/blog/tendencias-mesa-dulces-xv-anos-2025`
- `mesa-de-dulces-para-xv-anos-guia-completa-para-una-cele-pedregal.mdx` -> `/blog/tendencias-mesa-dulces-xv-anos-2025`
- `mesa-de-dulces-para-xv-anos-guia-completa.mdx` -> `/blog/tendencias-mesa-dulces-xv-anos-2025`
- `mesa-de-dulces-xv-anos-crea-una-celebracion-inolvidable-santa-fe.mdx` -> `/blog/tendencias-mesa-dulces-xv-anos-2025`
- `mesa-dulces-xv-anos-ideas-tendencias.mdx` -> `/blog/tendencias-mesa-dulces-xv-anos-2025`
- `mesa-dulces-xv-anos-ideas-tendencias.mdx` -> `/blog/mesa-dulces-xv-anos-elegante-sofisticada`
- `mesa-dulces-xv-anos-ideas-tendencias.mdx` -> `/blog/presupuesto-mesa-dulces-quinceanera`
- `mesas-de-dulces-para-bodas-elegantes-en-cdmx.mdx` -> `/blog/mesas-dulces-exclusivas-arte-sofisticacion-bodas`
- `roi-mesas-dulces-eventos-corporativos.mdx` -> `/blog/mesas-dulces-exclusivas-eventos-corporativos`
- `tendencias-candy-bar-bodas-2025.mdx` -> `/blog/tendencias-mesas-dulces-2025-cdmx`

### 11.2 Pares con similitud alta de contenido (muestra)

- `mesa-dulces-boda-cdmx-elegancia-y-estilo.mdx` <-> `mesa-dulces-bodas-guia-completa.mdx` (0.894)
- `mesa-dulces-conferencias-congresos.mdx` <-> `mesa-dulces-eventos-corporativos-cdmx.mdx` (0.884)
- `mesa-de-dulces-para-xv-anos-guia-completa-para-una-cele-pedregal.mdx` <-> `mesa-de-dulces-xv-anos-crea-una-celebracion-inolvidable-santa-fe.mdx` (0.882)
- `ideas-mesa-dulces-baby-shower-perfecta.mdx` <-> `mesa-de-dulces-para-baby-shower-guia-completa.mdx` (0.876)
- `mesa-dulces-eventos-corporativos-cdmx.mdx` <-> `mesa-dulces-eventos-corporativos-empresas.mdx` (0.860)
- `mesa-dulces-xv-anos-ideas-tendencias.mdx` <-> `tendencias-mesa-dulces-xv-anos-2025.mdx` (0.861)

