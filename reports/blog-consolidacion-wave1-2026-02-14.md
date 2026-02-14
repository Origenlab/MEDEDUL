# Blog Consolidacion Wave 1

Fecha: 2026-02-14

## Objetivo de esta ola
Reducir canibalizacion por variaciones zonales y consolidar autoridad en URLs pilar sin romper rutas existentes.

## Cambios aplicados

### 1) Slugs retirados de indexacion
Se marcaron como `draft: true` en `src/content/blog/`:

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

### 2) Redirects configurados
Se agregaron redirects en `astro.config.mjs`:

- XV:
  - `...cele-pedregal` -> `/blog/mesa-de-dulces-para-xv-anos-guia-completa`
- Corporativos:
  - `...emp-roma` -> `/blog/mesa-dulces-eventos-corporativos-cdmx`
  - `...condesa` -> `/blog/mesa-dulces-eventos-corporativos-cdmx`
  - `...sant` -> `/blog/mesa-dulces-eventos-corporativos-cdmx`
  - `...pola` -> `/blog/mesa-dulces-eventos-corporativos-cdmx`
- Infantiles:
  - `...magi-polanco` -> `/blog/mesa-de-dulces-cumpleanos-infantil-en-cdmx`
  - `...interlomas` -> `/blog/mesa-de-dulces-cumpleanos-infantil-en-cdmx`
- Baby shower:
  - `...bosques-de-las-loma` -> `/blog/mesa-de-dulces-para-baby-shower-guia-completa`
  - `...enc-pedr` -> `/blog/mesa-de-dulces-para-baby-shower-guia-completa`
  - `...magia-en-cada-dulce-interlomas` -> `/blog/mesa-de-dulces-para-baby-shower-guia-completa`

### 3) Correccion de enlaces internos
Se actualizaron enlaces en articulos publicados para evitar referencias a slugs ahora en draft.

## Validacion

- `npm run check`: OK
- `npm run build`: OK
- Resultado: rutas de redirect generadas y build estable.

## Efecto inmediato

- Menor competencia interna entre slugs muy similares.
- Conservacion de accesibilidad via redirects.
- Mejora del enlazado interno hacia URLs canónicas.
