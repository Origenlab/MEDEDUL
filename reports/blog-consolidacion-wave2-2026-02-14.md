# Wave 2 - Consolidacion editorial y control de taxonomia (2026-02-14)

## Objetivo

Reducir canibalizacion en clusters con duplicados de baja senal y limpiar taxonomia de etiquetas en el blog publicado.

## Cambios aplicados

### 1) Consolidacion de slugs de baja senal a `draft`

Se marcaron en `draft: true` 14 articulos legacy/duplicados para concentrar autoridad en piezas pilar:

- `mesa-de-dulces-para-bodas-endulza-tu-dia-perfecto-cdmx`
- `mesa-dulces-boda-cdmx-elegancia-y-estilo`
- `mesa-dulces-bodas-exclusivas-cdmx`
- `mesas-de-dulces-para-bodas-elegantes-en-cdmx`
- `mesa-de-dulces-para-xv-anos-guia-completa-para-una-cele-pedregal`
- `mesa-de-dulces-corporativo-catering-premium-para-eventos-emp-roma`
- `mesa-de-dulces-corporativos-eleva-tus-eventos-empresari-condesa`
- `mesa-de-dulces-corporativos-endulza-tus-eventos-empresariale-sant`
- `mesa-de-dulces-corporativos-impresiona-en-eventos-empresaria-pola`
- `mesa-de-dulces-infantil-guia-completa-para-fiestas-magi-polanco`
- `mesa-de-dulces-infantil-un-sueno-hecho-realidad-interlomas`
- `la-magia-de-la-mesa-de-dulces-en-baby-showers-bosques-de-las-loma`
- `mesa-de-dulces-baby-shower-transforma-tu-celebracion-con-enc-pedr`
- `mesa-de-dulces-para-baby-shower-magia-en-cada-dulce-interlomas`

### 2) Redirects permanentes en `astro.config.mjs`

Cada slug anterior ahora redirige a su URL canonica/pilar para conservar equity y evitar 404.

### 3) Interlinking interno actualizado

Se reemplazaron enlaces internos que aun apuntaban a slugs movidos a `draft`, priorizando URLs pilar vivas.

### 4) Reduccion de tags de baja densidad

Se aplico umbral de publicacion de tags:

- `MIN_TAG_POSTS = 3` en `src/pages/blog/tag/[tag].astro` para generar solo paginas de tag con masa critica.
- `src/layouts/BlogPostLayout.astro` calcula tags habilitados solo desde posts publicados.
- `src/components/blog/ArticleSidebar.astro` renderiza solo tags habilitados.

## Validacion tecnica

- `npm run check`: OK (0 errores, 0 warnings; 3 hints preexistentes en `mesa-de-donas-y-cupcakes.astro`).
- `npm run build`: OK.
- Verificacion adicional: no hay referencias desde posts publicados hacia slugs movidos a `draft`.

## Resultado esperado

- Menos canibalizacion entre URLs similares.
- Mejor concentracion de autoridad en articulos pilar.
- Menor ruido en taxonomias de tags y mejor crawl budget.
