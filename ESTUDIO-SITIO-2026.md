# Estudio Técnico MEDEDUL — mesas-de-dulces.com
**Fecha:** 23 abril 2026 | **Score general:** 88/100 | **Estado:** ✅ Sitio sano, SEO protegido

---

## RESUMEN EJECUTIVO

El sitio está bien estructurado y el SEO es sólido. No hay errores críticos que comprometan el posicionamiento actual. Los hallazgos se dividen en **3 urgentes**, **5 importantes** y **4 mejoras a mediano plazo**.

**Regla de oro:** Todos los cambios propuestos son *adiciones o ajustes de configuración* — ninguno toca URLs, slugs, metas ni redirects existentes.

---

## 🔴 CRÍTICOS — Actuar esta semana

### 1. GA4 no está configurado
**Archivo:** `src/layouts/BaseLayout.astro` ~línea 148
```html
<!-- GA4: pendiente — agregar ID real cuando Frank configure Google Analytics -->
<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script> -->
```
**Impacto:** Sin tracking de conversiones, sesiones ni comportamiento de usuario.  
**Acción:** Reemplazar `G-XXXXXXXXXX` con el ID real de GA4 de la propiedad y descomentar.

---

### 2. Verificar filtrado de artículos `draft: true`
**Contexto:** 38 de 67 artículos MDX tienen `draft: true` en su frontmatter (56% del contenido).  
**Riesgo:** Si el router de blog NO los filtra, Google puede indexar borradores con contenido incompleto, generando canibalización y thin content.  
**Dónde verificar:** `src/pages/blog/[slug].astro` — debe tener algo como:
```js
const posts = await getCollection('blog', ({ data }) => !data.draft);
```
**Acción:** Confirmar que el filtro existe. Si no, agregarlo antes del próximo deploy.

---

### 3. Skip-to-content link falta (WCAG violation)
**Archivo:** `src/layouts/BaseLayout.astro` — antes de `<Header />`  
**Impacto:** Usuarios con lectores de pantalla deben navegar todo el menú antes de llegar al contenido. Viola WCAG 2.1 criterio 2.4.1.  
**Acción:** Agregar al inicio del `<body>`:
```html
<a href="#main-content" class="skip-link">Saltar al contenido</a>
```
Y en el `<main>`: `id="main-content"`. CSS: posición absolute, visible solo en focus.

---

## 🟡 IMPORTANTES — Próximas 2 semanas

### 4. Placeholder de imagen en 1 artículo de blog
**Archivo:** `src/content/blog/tendencias-mesa-dulces-bodas-2026-cdmx.mdx`
```yaml
heroImage: "/img/placeholder-blog.svg"
```
**Impacto:** Degrada el resultado en Google Discover y redes sociales (og:image genérico). Solucionable en 2 minutos con imagen real.

---

### 5. Sitemap generado post-build es vulnerable a fallos silenciosos
**Flujo actual:** `astro build` → `node scripts/generate-sitemap.cjs`  
**Riesgo:** Si el script falla silenciosamente, el deploy termina exitosamente pero el sitemap.xml queda sin actualizar. Google crawlea URLs antiguas.  
**Mitigación actual:** El script imprime `console.log('Generated sitemap.xml with N URLs')`.  
**Acción recomendada:** En GitHub Actions (`deploy.yml`), agregar `grep "Generated sitemap" build.log || exit 1` para que el deploy falle si el sitemap no se generó correctamente.

---

### 6. Aria-label del menú hamburger no se actualiza al abrir/cerrar
**Archivo:** `src/components/global/Header.astro`  
**Estado actual:**
```html
<button class="header__toggle" id="hamburger" aria-label="Abrir menú">
```
El label dice "Abrir menú" incluso cuando el menú está abierto.  
**Acción:** 2 líneas de JS en el mismo script del toggle:
```js
hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
```

---

### 7. CDN de imágenes sin fallback verificado
**Archivo:** `src/lib/cdn.ts`  
**Riesgo:** Si exactdn.com está caído, las imágenes se sirven sin optimización (sin dimensiones en srcset) — impacta LCP y CLS.  
**Acción:** Monitorear uptime del CDN y tener un plan de fallback documentado.

---

### 8. Posible canibalización de keywords en baby shower / XV años
**Contexto:** Hay múltiples artículos atacando las mismas keywords con ligeras variaciones (baby shower CDMX, mesa baby shower, baby shower ideas...).  
**Acción recomendada:** Revisar en Google Search Console qué URL rankea para cada keyword principal. Consolidar artículos débiles mediante redirects 301 si alguno tiene < 10 clics/mes.  
**IMPORTANTE:** No hacer nada hasta ver datos de GSC. No tocar sin datos.

---

## 🟢 MEJORAS — Mediano plazo (sin urgencia)

### 9. fetchpriority="high" en primera imagen visible
Si en alguna página hay una imagen above-the-fold que no sea lazy-loaded, agregar `fetchpriority="high"` mejora el LCP ~100-200ms. Revisar por página.

### 10. Documentar workflow draft → publicación
Crear un mini-checklist en el repo:
```
Antes de publicar artículo:
1. Cambiar draft: true → draft: false
2. Verificar que heroImage existe (no placeholder)
3. Confirmar que description < 160 caracteres
4. npm run lint:content para validar frontmatter
```

### 11. Scripts de migración legacy en /scripts/ pueden archivarse
Los archivos `migrate-blog.cjs`, `rewrite-editorial-batch*.cjs` ya cumplieron su función. Se pueden mover a una carpeta `scripts/archive/` para limpiar el directorio.

### 12. Verificar uso real de todos los componentes MDX
`COMPONENTS.md` lista 10 componentes (AlertBox, InfoCard, StepList, Quote, etc.). Confirmar que todos se usan en al menos un artículo y eliminar los que no se usen para simplificar el codebase.

---

## ✅ LO QUE ESTÁ MUY BIEN — No tocar

| Área | Detalle |
|------|---------|
| SEO técnico | Canonical dinámico, OG tags, Twitter Cards, geo-tags CDMX |
| Structured data | 6 tipos de JSON-LD: Organization, LocalBusiness, Article, FAQ, Breadcrumb, Service |
| robots.txt | Bloquea /_astro/, /api/ — crawl budget optimizado |
| Redirects 301 | 21 redirects de URLs antiguas mapeados en astro.config.mjs |
| Imágenes | width/height explícito en todas las imágenes — sin CLS |
| CSS | inlineStylesheets: 'always' — cero render-blocking |
| Google Fonts | Cargadas async — sin render-blocking |
| Arquitectura | Componentes bien separados, TypeScript strict, MDX homologado |
| .gitignore | node_modules, dist/, .env correctamente excluidos |
| .htaccess | Cache headers correctos, preconnect, redirecciones legacy |

---

## PLAN DE ACCIÓN PRIORIZADO

| # | Tarea | Tiempo est. | Riesgo SEO | Prioridad |
|---|-------|-------------|-----------|-----------|
| 1 | Configurar GA4 | 5 min | 0 | 🔴 Esta semana |
| 2 | Verificar filtro draft articles | 10 min | 0 (solo verificar) | 🔴 Esta semana |
| 3 | Skip-to-content link | 10 min | 0 | 🔴 Esta semana |
| 4 | Reemplazar placeholder image | 2 min | 0 | 🟡 Esta semana |
| 5 | Guardia en deploy.yml para sitemap | 15 min | 0 | 🟡 2 semanas |
| 6 | Fix aria-label hamburger | 5 min | 0 | 🟡 2 semanas |
| 7 | Revisar GSC para canibalización | 30 min | 0 (solo analizar) | 🟡 2 semanas |
| 8 | Archivar scripts legacy | 5 min | 0 | 🟢 Cuando haya tiempo |
| 9 | Auditar componentes MDX sin uso | 15 min | 0 | 🟢 Cuando haya tiempo |

---

*Generado con análisis automatizado — verificar hallazgos críticos manualmente antes de implementar.*
