# CHANGELOG SEO — MEDEDUL — 2026-07-10

Auditoría + reparación con el Prompt Maestro (SEO técnico + Schema + Social Cards). Ola 1 del portafolio. Alcance técnico estricto: cero datos de negocio nuevos.

## Cambios aplicados (commit `bb16b714`)

1. **OG/Twitter en JPEG** — las 395 páginas servían `og:image` en AVIF vía CDN ExactDN (redes no lo soportan → shares sin imagen). Fix arquitectónico en `src/components/seo/SEO.astro` (único emisor de og en el sitio): si la imagen resuelta es `.avif/.webp`, se sirve `/images/og/<ruta-aplanada>.jpg` del propio dominio. Generados **52 JPEG 1200×630** (crop cover, q82, progressive) en `public/images/og/`. Naming aplanado (ruta bajo `/img/` con guiones) porque había 2 colisiones de basename entre `/img/galeria/` y `/img/eventos/`.
2. **`og:image:type`** dinámico (image/jpeg | image/png) en SEO.astro — faltaba en 395/395 páginas. `og:image:alt` y `og:image:width/height` ya existían.
3. **4 imágenes OG rotas** (404 verificado en CDN Y origen): `mesa-dulces-boda-elegante-blanco-dorado`, `candy-bar-infantil-colorido` (variante /img/galeria/), `mesa-dulces-cumpleanos-infantil-arcoiris`, `mesa-dulces-xv-anos-rosa-plateado-cristales`. Remapeadas a imágenes REALES existentes del mismo tema en 20 archivos (35 referencias: ogImage, heroes y cards que también daban 404 visible): → `mesa-dulces-boda-elegante-dorado-clasica`, `/img/eventos/cumpleanos/infantiles/candy-bar-infantil-colorido` (misma imagen, ruta correcta), `mesa-dulces-unicornio-arcoiris-cumpleanos-nina`, `mesa-dulces-xv-anos-lujosa-cristaleria-rosa`.
4. **Logo schema** — `JsonLd.astro`: logo de Organization y publisher de Article ahora `ImageObject` con `width: 777, height: 268` (dimensiones reales del AVIF verificadas con PIL).
5. **Sitemap lastmod dinámico** — el sitemap NO emitía lastmod (0/380 URLs). `astro.config.mjs`: `lastmodForUrl()` URL → archivo fuente (src/pages exactos → colección blog por ruta y slug) → `git log -1 --format=%cI` → fallback mtime → si no resuelve se OMITE. Resultado: **302/380 con fecha real (21 fechas distintas)**, 78 omitidas honestamente (rutas dinámicas).
6. **Workflow** — `deploy.yml`: `fetch-depth: 0` en checkout (sin historia completa git log devuelve la fecha del HEAD para todo).
7. **BreadcrumbList duplicado en /sucursales** — la página emitía el breadcrumb 2 veces (embebido en el @graph del WebPage + componente Breadcrumbs). Eliminado el embebido; queda 1, igual que el resto del sitio.
8. **Canónico www → non-www** — regla defensiva al inicio de `public/_redirects`. OJO: www YA responde 301 en vivo, pero lo sirve el GitHub Pages legacy (header `x-github-request-id`), no Cloudflare — ver pendiente manual #1.

## Hallazgos NO aplicados (con razón)

- **Product schema en 3 páginas** (`/dulces/a-granel/`, `/tipos-de-mesas-de-dulces/`, `/precios/`): AISO intencional documentado (Fase 1 verificada 2026-06-23). No son bloques duplicados. Se conservan.
- **FAQPage duplicado idéntico en `/precios/`** (2 bloques con las mismas 8 preguntas: JSON-LD propio de la página + el que emite `FAQContactModule`). Fuera del alcance del SOP (solo autoriza dedupe de Product); anotado para la siguiente pasada.
- **foundingDate/dirección/teléfonos/sameAs/openingHours existentes**: no se tocaron (regla de oro).
- **Breadcrumb home**: 0, correcto. Resto de páginas: máx 1, correcto tras fix #7.
- **@astrojs/sitemap**: quedó en `3.2.1` exacto, sin tocar deps (Astro ^4.15).

## Pendientes manuales (dashboard) — el #1 es CRÍTICO

1. **El dominio vivo NO sirve el proyecto de Cloudflare Pages.** `mesas-de-dulces.com` lo sirve un **GitHub Pages congelado al 24-jun-2026** detrás del proxy de Cloudflare (evidencia: `access-control-allow-origin: *`, `last-modified: 24 Jun`, `/sitemap.xml` → 404 porque GH Pages no procesa `_redirects`, y `mededul.pages.dev` sí sirve el build nuevo). El workflow GH Pages se eliminó del repo (`fe74ab52`) pero el DNS sigue apuntando al artefacto viejo. **Fix en dashboard Cloudflare**: Pages → proyecto `mededul` → Custom domains → agregar `mesas-de-dulces.com` y `www.mesas-de-dulces.com` (el DNS del zone se actualiza a CNAME del proyecto). Hasta entonces NINGÚN deploy llega al dominio. Después: deshabilitar GitHub Pages en el repo para que no quede origen fantasma.
2. **Cloudflare Redirect Rule** (fix garantizado www): When `Hostname equals www.mesas-de-dulces.com` → Dynamic 301 → `concat("https://mesas-de-dulces.com", http.request.uri.path)`. Hoy el 301 de www depende del GH Pages legacy que desaparecerá con el paso 1.
3. **Facebook Sharing Debugger**: re-scrape home + /precios + 1 zona (https://developers.facebook.com/tools/debug/) cuando el dominio sirva el build nuevo.
4. **Rich Results Test**: home + /sucursales + /tipos-de-mesas-de-dulces.
5. **Search Console**: reenviar sitemap cuando el dominio sirva el build nuevo (ahora ya trae lastmod real).

## Validación post-deploy (resultado 2026-07-10)

Action verde: run `29114081981` (commit `bb16b714`). Gate de deploy cumplido; el dominio NO refleja el build por el pendiente manual #1 (DNS → GH Pages congelado). Validación hecha contra `mededul.pages.dev` (el artefacto que el dominio servirá al arreglar el DNS):

- [x] `og:image` .jpg propio + `og:image:type: image/jpeg` en HTML servido ✓
- [x] JPEG OG → `200 image/jpeg` (incluidos los remapeados) ✓
- [x] sitemap live con lastmod real variado (21 fechas) ✓
- [x] `/sitemap.xml` → 301 → sitemap-index.xml ✓
- [x] /sucursales con 1 solo BreadcrumbList ✓
- [ ] Dominio `mesas-de-dulces.com` sirviendo el build: **BLOQUEADO por pendiente manual #1**
- [x] www → 301 (vía GH Pages legacy; consolidar con Redirect Rule, manual #2)

## Mejora para el prompt maestro (Regla 6)

- **Nuevo chequeo FASE 0**: comparar `<proyecto>.pages.dev` vs dominio (etag/last-modified/marcador del build). Aquí la Action estaba verde y el deploy funcionaba, pero el dominio llevaba 16 días sirviendo un GitHub Pages fantasma — "Action verde" NO implica "dominio actualizado" si el DNS no apunta al proyecto Pages.
- Los OG rotos pueden vivir en `.astro` (props/arrays de datos), no solo en frontmatter — grep por basename, no por ruta exacta.
- Con CDN de imágenes (ExactDN), verificar existencia del archivo en `public/` Y en el CDN: aquí 404 en ambos.
- Colisiones de basename reales (2): el naming aplanado dir-a-guiones debería ser el estándar del patrón OG JPEG.
