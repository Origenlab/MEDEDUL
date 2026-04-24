# 🧭 MEDEDUL — Sistema de Navegación Dinámica

> **Objetivo:** Hero + barra de llamada a la acción contextual en todas las páginas del sitio para mejorar navegación interna y SEO.

---

## Módulo QuickEventNav — Diseño aprobado ✅

**Estilo:** Inspirado en rentadeiluminacion.com (REDEIL)
**Archivo:** `src/components/global/QuickEventNav.astro`

### Visual
- Barra horizontal, fondo **#D1007A** (rosa MEDEDUL)
- Cada ítem: `[ícono en círculo] Título bold / Subtítulo › `
- Divisores semitransparentes entre ítems
- Hover: oscurece el ítem
- Último ítem "Cotizar Gratis" con fondo diferenciado
- **Desktop:** 4 columnas iguales, ancho completo
- **Móvil:** scroll horizontal sin scrollbar

### Ítems base (L2 globales)
| Ícono | Título | Subtítulo | Destino |
|---|---|---|---|
| 🍬 | Tipos de Mesas | Dulces · Postres · Frutas · Quesos | `/tipos-de-mesas-de-dulces/` |
| 🎉 | Candy Bar por Evento | Bodas · XV · Baby Shower · Más | `/candy-bar-eventos/` |
| ⭐ | Estaciones Interactivas | Chocolate · Chamoy · Candy Wall | `/estaciones-interactivas/` |
| 💬 | Cotizar Gratis | Respuesta en menos de 2 horas | `/cotizar` |

---

## Plan de implementación

### Fase 1 — QuickEventNav dinámico
Hacer que el componente acepte props opcionales:
```ts
interface NavItem {
  href: string;
  icon: string;
  title: string;
  sub: string;
  cta?: boolean;
}

interface Props {
  items?: NavItem[];       // override completo
  highlight?: string;      // href del ítem activo
}
```

### Fase 2 — Mapeo por página

| Página | Ítems |
|---|---|
| `/` | 4 L2 globales |
| `/candy-bar-eventos/` | Bodas · XV · Baby Shower · Bautizos · Cotizar |
| `/candy-bar-eventos/mesa-dulces-boda` | Bodas · XV · Baby Shower · Ver todos · Cotizar |
| `/candy-bar-eventos/mesa-dulces-xv-anos` | XV · Bodas · Baby Shower · Ver todos · Cotizar |
| `/tipos-de-mesas-de-dulces/` | Mesa Dulces · Frutas · Postres · Quesos · Cotizar |
| `/tipos-de-mesas-de-dulces/mesa-de-dulces` | Mesa Dulces · Frutas · Postres · Más tipos · Cotizar |
| `/estaciones-interactivas/` | Fuente Choc · Fuente Chamoy · Candy Wall · Stand Pastel · Cotizar |
| `/blog/` | 4 L2 globales |
| `/directorio/` | 4 L2 globales |
| `/cotizar` | 3 L2 (sin CTA de cotizar) |
| `/precios` | 4 L2 globales |

### Fase 3 — Hero dinámico
- `Hero.astro` ya existe — revisar props actuales
- Cada L2/L3 define su propio: título H1, subtítulo, imagen, CTAs
- Los layouts (`BaseLayout`, `BlogPostLayout`) pasan `heroProps`

---

## Estado

- [x] Diseño QuickEventNav aprobado
- [x] Implementación base (4 ítems L2)
- [ ] Props dinámicas en QuickEventNav
- [ ] Hero visible en todas las páginas
- [ ] Ítems contextuales por sección
- [ ] QA visual en mobile

---

*Registro: 2026-04-23*
