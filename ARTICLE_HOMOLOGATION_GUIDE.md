# GUÍA MAESTRA DE HOMOLOGACIÓN DE ARTÍCULOS
## Mededul - Sistema de Estandarización Editorial v1.0

---

## CONTEXTO Y PROPÓSITO

Este documento establece el **estándar definitivo** para todos los artículos del blog de Mededul.
Cada artículo existente y futuro debe cumplir al 100% con esta guía.

**Artículo de Referencia Canónico:**
`/blog/errores-comunes-mesa-dulces-boda`

**Archivo Fuente:**
`src/content/blog/errores-comunes-mesa-dulces-boda.mdx`

---

## 1. FRONTMATTER OBLIGATORIO

Todo artículo DEBE incluir estos campos en el frontmatter:

```yaml
---
title: "Título SEO del Artículo | Palabra Clave CDMX"
description: "Meta descripción optimizada de 140-160 caracteres que incluya palabra clave principal."
publishDate: 2026-01-15
category: "bodas"
heroImage: "/img/galeria/nombre-imagen-descriptivo.avif"
heroImageAlt: "Descripción accesible de la imagen hero"
tags: ["tag1", "tag2", "tag3", "tag4", "tag5"]
readTime: "8 min lectura"
location: "CDMX, Ciudad de México"
faqs:
  - question: "¿Pregunta frecuente 1?"
    answer: "Respuesta completa y útil a la pregunta."
  - question: "¿Pregunta frecuente 2?"
    answer: "Respuesta completa y útil a la pregunta."
  - question: "¿Pregunta frecuente 3?"
    answer: "Respuesta completa y útil a la pregunta."
  - question: "¿Pregunta frecuente 4?"
    answer: "Respuesta completa y útil a la pregunta."
---
```

### REGLAS DEL FRONTMATTER

| Campo | Requisito | Límite | Ejemplo |
|-------|-----------|--------|---------|
| `title` | OBLIGATORIO | Máx 150 chars | `"10 Errores que Arruinan tu Mesa de Dulces de Boda \| Guía CDMX"` |
| `description` | OBLIGATORIO | 140-160 chars | `"Errores comunes en mesas de dulces para bodas y cómo evitarlos..."` |
| `publishDate` | OBLIGATORIO | Formato YYYY-MM-DD | `2026-01-15` |
| `modifiedDate` | Opcional | Formato YYYY-MM-DD | `2026-02-10` |
| `category` | OBLIGATORIO | Ver lista válida | `"bodas"` |
| `heroImage` | OBLIGATORIO | Ruta válida .avif | `"/img/galeria/imagen.avif"` |
| `heroImageAlt` | OBLIGATORIO | Descriptivo | `"Mesa de dulces elegante para boda"` |
| `tags` | OBLIGATORIO | 3-6 tags | `["bodas", "mesa de dulces", "candy bar"]` |
| `readTime` | OBLIGATORIO | Formato "X min" | `"8 min lectura"` |
| `location` | Opcional | Ciudad, Estado | `"CDMX, Ciudad de México"` |
| `faqs` | RECOMENDADO | 3-6 FAQs | Ver estructura arriba |
| `draft` | Opcional | Boolean | `false` |

### CATEGORÍAS VÁLIDAS

```
bodas           → Artículos sobre mesas de dulces para bodas
xv-anos         → Contenido de quinceañeras
baby-shower     → Eventos de baby shower
bautizos        → Bautizos y primeras comuniones
corporativos    → Eventos empresariales
fiestas-infantiles → Cumpleaños y fiestas de niños
infantiles      → Alias de fiestas-infantiles
graduaciones    → Eventos de graduación
tendencias      → Tendencias y novedades del sector
tips-consejos   → Guías prácticas y consejos
estaciones      → Estaciones interactivas (fuentes, etc.)
```

❌ **NO usar categorías no listadas**

---

## 2. IMPORTS DE COMPONENTES MDX

Inmediatamente después del frontmatter, declarar los imports necesarios:

```mdx
import AlertBox from '@/components/content/AlertBox.astro';
import InfoCard from '@/components/content/InfoCard.astro';
import CTABox from '@/components/content/CTABox.astro';
```

### COMPONENTES DISPONIBLES

| Componente | Propósito | Cuándo Usar |
|------------|-----------|-------------|
| `AlertBox` | Avisos, advertencias, tips | Datos importantes, estadísticas, alertas |
| `InfoCard` | Tarjetas informativas | Definiciones, resúmenes, checklists |
| `CTABox` | Llamadas a la acción | Final del artículo, conversión |
| `Quote` | Citas y testimonios | Opiniones de expertos, clientes |
| `StepList` | Listas de pasos | Procesos, tutoriales |
| `ProsCons` | Comparativas | Ventajas vs desventajas |
| `ComparisonTable` | Tablas comparativas | Comparar opciones |
| `FeatureList` | Lista de características | Features de servicios |
| `StatCard` | Estadísticas | Datos numéricos destacados |
| `StatsGrid` | Grid de estadísticas | Múltiples métricas |

---

## 3. ESTRUCTURA DE CONTENIDO OBLIGATORIA

### A. PÁRRAFO INTRODUCTORIO

**Primer elemento después de imports.** Debe:
- Establecer credibilidad (experiencia de Mededul)
- Presentar el tema con claridad
- Enganchar emocionalmente al lector
- Usar negritas para frases clave

```mdx
**Después de más de 10 años creando mesas de dulces para [EVENTO] en CDMX, hemos visto de todo.**
[Contexto emocional]. En **Mededul** queremos que tu [evento] sea perfecto, por eso te compartimos
[qué ofrece el artículo]. Aprende de la experiencia ajena.
```

### B. SEPARADOR ANTES DEL CONTENIDO PRINCIPAL

```mdx
---
```

### C. SECCIONES PRINCIPALES (H2)

Cada sección principal usa formato H2 numerado:

```mdx
## 1. Título de la Sección Principal

## 2. Segunda Sección Principal

## 3. Tercera Sección Principal
```

**Reglas:**
- Numeración secuencial obligatoria
- Títulos claros y descriptivos
- Sin puntos finales en títulos
- 6-12 secciones por artículo típico

### D. SUBSECCIONES CON PATRÓN PROBLEMA/SOLUCIÓN (H3)

Para artículos tipo "errores" o "guías", usar este patrón:

```mdx
## 1. Título del Error o Tema

### ❌ El Problema

Descripción clara del problema, error o situación negativa.
Explicar consecuencias reales. Ser específico y relatable.

### ✅ La Solución Mededul

Solución práctica y accionable. Usar **negritas** para puntos clave.
Incluir datos específicos cuando sea posible.
```

**Reglas del Patrón:**
- ❌ para problemas (emoji rojo X)
- ✅ para soluciones (emoji verde check)
- Mantener consistencia en TODO el artículo
- Nunca mezclar con otros patrones de H3

### E. SEPARADORES ENTRE SECCIONES

Entre cada sección H2, usar separador:

```mdx
---

## 2. Siguiente Sección
```

### F. USO DE COMPONENTES EN CONTENIDO

**AlertBox** - Para datos importantes mid-article:

```mdx
<AlertBox variant="warning" title="Estadística importante">
  En el **85% de las bodas** hay al menos un invitado con alguna restricción
  alimentaria significativa. No es opcional considerarlo, es responsabilidad.
</AlertBox>
```

Variantes: `info` | `success` | `warning` | `danger`

**InfoCard** - Para resúmenes o checklists:

```mdx
<InfoCard title="Checklist Anti-Errores Mededul" icon="✅" variant="highlight">

- ✓ Punto 1 del checklist
- ✓ Punto 2 del checklist
- ✓ Punto 3 del checklist

</InfoCard>
```

Variantes: `default` | `tip` | `definition` | `highlight`

### G. CTA FINAL OBLIGATORIO

Todo artículo DEBE terminar con CTABox:

```mdx
---

<CTABox
  title="¿Lista para tu mesa de dulces de ensueño?"
  description="Transforma tu [evento] en un evento lleno de dulzura y estilo. Cotiza sin compromiso."
  buttonText="Cotizar mi Mesa de Dulces"
  buttonUrl="https://wa.me/525525226442?text=Hola!%20Me%20interesa%20cotizar%20una%20mesa%20de%20dulces%20para%20mi%20[evento]"
  variant="whatsapp"
/>
```

**Reglas del CTA:**
- Título orientado a la acción
- Descripción breve (1-2 líneas)
- URL de WhatsApp con mensaje pre-poblado
- Variante `whatsapp` para conversión principal
- Adaptar texto al tipo de evento del artículo

---

## 4. REGLAS DE FORMATO Y ESTILO

### MARKDOWN PERMITIDO

```
**texto**           → Negritas (para puntos clave)
*texto*             → Cursiva (uso moderado)
[texto](url)        → Enlaces
- item              → Listas con viñetas
1. item             → Listas numeradas
> cita              → Blockquotes (usar Quote component preferiblemente)
`código`            → Código inline (solo si es relevante)
```

### PROHIBICIONES

❌ HTML inline directo
❌ Estilos CSS inline
❌ Imágenes embebidas en contenido (usar solo heroImage)
❌ H4, H5, H6 (solo H2 y H3)
❌ Saltar niveles de heading (H2 → H4)
❌ Múltiples líneas en blanco seguidas
❌ Emojis excesivos (solo en H3 de patrón problema/solución)

### NEGRITAS - CUÁNDO USAR

✅ **SÍ usar:**
- Datos numéricos importantes: **6-8 piezas por invitado**
- Conceptos clave: **servicio profesional**
- Marca: **Mededul**
- Ubicaciones relevantes: **Polanco y Santa Fe**

❌ **NO usar:**
- Párrafos enteros en negrita
- Palabras comunes sin importancia
- Más de 2-3 elementos por párrafo

### LISTAS

✅ **Formato correcto:**
```mdx
- ✓ Item con checkmark para checklists
- Item normal para listas regulares

1. Primer paso
2. Segundo paso
3. Tercer paso
```

---

## 5. REGLAS SEO OBLIGATORIAS

### TÍTULO (title)

- Incluir palabra clave principal al inicio
- Incluir ubicación (CDMX, Ciudad de México) cuando aplique
- Usar separador `|` para segundas frases
- Máximo 60 caracteres visibles en SERP

**Fórmula:** `[Número] + [Tema] + [Evento] | [Beneficio/Ubicación]`

Ejemplos:
- `10 Errores que Arruinan tu Mesa de Dulces de Boda | Guía CDMX`
- `5 Ideas Creativas para Mesa de Dulces XV Años | Tendencias 2026`
- `Guía Completa: Mesa de Dulces Baby Shower | CDMX`

### DESCRIPCIÓN (description)

- Incluir palabra clave principal
- Prometer valor claro
- Call to action implícito
- 140-160 caracteres exactos

**Fórmula:** `[Qué aprenderás] + [Para qué evento] + [Beneficio/Ubicación]`

### FAQS

Mínimo 3, máximo 6 preguntas. Deben:
- Responder búsquedas reales de usuarios
- Ser específicas del tema del artículo
- Tener respuestas completas (3-5 líneas)
- Incluir datos numéricos cuando sea posible

```yaml
faqs:
  - question: "¿Cuántos dulces necesito por invitado en mi boda?"
    answer: "Calcula 6-8 piezas por adulto y 10-12 por niño. Para una boda de 100 personas, necesitarás aproximadamente 650-800 dulces totales. Siempre agrega un 10% extra de margen."
```

### ENLACES INTERNOS

Todo artículo debe incluir al menos 2 enlaces internos:
- A servicios relacionados (`/candy-bar-eventos/...`)
- A otros artículos del blog (`/blog/...`)
- A estaciones interactivas si aplica (`/estaciones-interactivas/...`)

### IMÁGENES

- Formato: `.avif` obligatorio
- Naming: descriptivo con guiones (`candy-bar-boda-vintage-madera-flores.avif`)
- Alt text: descriptivo y accesible
- Una heroImage por artículo (procesada por el layout)

---

## 6. CHECKLIST DE AUDITORÍA

Usar esta lista para verificar cada artículo existente:

### FRONTMATTER
- [ ] `title` presente y optimizado SEO (≤150 chars)
- [ ] `description` presente (140-160 chars)
- [ ] `publishDate` en formato correcto
- [ ] `category` es una categoría válida
- [ ] `heroImage` existe y es .avif
- [ ] `heroImageAlt` es descriptivo
- [ ] `tags` incluye 3-6 tags relevantes
- [ ] `readTime` presente
- [ ] `faqs` tiene 3-6 preguntas (recomendado)

### IMPORTS
- [ ] Componentes importados están declarados
- [ ] Solo se importan componentes que se usan
- [ ] Path correcto: `@/components/content/[Nombre].astro`

### ESTRUCTURA
- [ ] Párrafo introductorio presente
- [ ] Separador `---` después de intro
- [ ] Secciones H2 numeradas correctamente
- [ ] Patrón H3 consistente (❌/✅ si aplica)
- [ ] Separadores entre secciones H2
- [ ] InfoCard o resumen antes del CTA
- [ ] CTABox al final del artículo
- [ ] Separador `---` antes del CTA

### CONTENIDO
- [ ] Sin H4, H5, H6
- [ ] Sin HTML inline
- [ ] Sin imágenes embebidas
- [ ] Negritas usadas correctamente
- [ ] Listas formateadas correctamente
- [ ] Componentes MDX cerrados correctamente

### SEO
- [ ] Palabra clave en título
- [ ] Palabra clave en descripción
- [ ] Al menos 2 enlaces internos
- [ ] FAQs responden búsquedas reales
- [ ] Contenido suficiente (>800 palabras)

---

## 7. PROCESO DE HOMOLOGACIÓN

### PASO 1: LECTURA INICIAL
1. Abrir el artículo a homologar
2. Abrir el artículo de referencia en paralelo
3. Identificar diferencias estructurales

### PASO 2: CORRECCIÓN DE FRONTMATTER
1. Verificar todos los campos obligatorios
2. Optimizar title y description para SEO
3. Agregar/corregir FAQs si faltan
4. Validar que heroImage existe

### PASO 3: CORRECCIÓN DE ESTRUCTURA
1. Agregar imports faltantes
2. Reescribir párrafo introductorio si necesario
3. Renumerar secciones H2
4. Aplicar patrón ❌/✅ en H3 si aplica
5. Agregar separadores faltantes
6. Agregar InfoCard de resumen
7. Agregar/corregir CTABox final

### PASO 4: CORRECCIÓN DE CONTENIDO
1. Convertir H4+ a H3 o eliminar
2. Remover HTML inline
3. Formatear listas correctamente
4. Aplicar negritas según reglas
5. Agregar enlaces internos

### PASO 5: VALIDACIÓN FINAL
1. Ejecutar checklist completo
2. Verificar render local (`npm run dev`)
3. Confirmar que no hay errores de consola
4. Comparar visualmente con artículo de referencia

---

## 8. EJEMPLOS DE CORRECCIÓN

### ANTES (Incorrecto)

```mdx
---
title: Errores en mesas de dulces
description: Errores que debes evitar
publishDate: 2026-01-15
---

# Errores comunes

Los errores son muy comunes...

#### Primer error

Mucha gente comete errores.

#### Segundo error

Otro error común.
```

### DESPUÉS (Correcto)

```mdx
---
title: "10 Errores que Arruinan tu Mesa de Dulces de Boda | Guía CDMX"
description: "Errores comunes en mesas de dulces para bodas y cómo evitarlos. Guía profesional para un candy bar perfecto en tu boda en CDMX."
publishDate: 2026-01-15
category: "bodas"
heroImage: "/img/galeria/candy-bar-boda-vintage.avif"
heroImageAlt: "Mesa de dulces elegante para boda con decoración vintage"
tags: ["bodas", "mesa de dulces", "candy bar", "errores", "guía"]
readTime: "8 min lectura"
location: "CDMX, Ciudad de México"
faqs:
  - question: "¿Cuántos dulces necesito por invitado?"
    answer: "Calcula 6-8 piezas por adulto y 10-12 por niño..."
---

import AlertBox from '@/components/content/AlertBox.astro';
import InfoCard from '@/components/content/InfoCard.astro';
import CTABox from '@/components/content/CTABox.astro';

**Después de más de 10 años creando mesas de dulces para bodas en CDMX, hemos visto de todo.** Desde novias llorando hasta mesas vacías. En **Mededul** te compartimos los errores más comunes y cómo evitarlos.

---

## 1. Primer Error Común

### ❌ El Problema

Descripción clara del problema...

### ✅ La Solución Mededul

Solución práctica con **datos específicos**...

---

## 2. Segundo Error Común

### ❌ El Problema

Descripción del segundo problema...

### ✅ La Solución Mededul

Solución con consejos accionables...

---

<InfoCard title="Checklist Mededul" icon="✅" variant="highlight">

- ✓ Punto verificado 1
- ✓ Punto verificado 2

</InfoCard>

---

<CTABox
  title="¿Lista para tu mesa de dulces?"
  description="Cotiza sin compromiso para tu boda."
  buttonText="Cotizar por WhatsApp"
  buttonUrl="https://wa.me/525525226442?text=Hola!%20Quiero%20cotizar%20mesa%20de%20dulces%20para%20boda"
  variant="whatsapp"
/>
```

---

## 9. MÉTRICAS DE ÉXITO

Un artículo está **100% homologado** cuando:

1. ✅ Pasa todos los items del checklist
2. ✅ Estructura visual idéntica al artículo de referencia
3. ✅ Renderiza sin errores en desarrollo
4. ✅ FAQs visibles y funcionales (accordion)
5. ✅ CTA visible y clickeable
6. ✅ Sidebar con servicios visible
7. ✅ Breadcrumbs correctos

---

## 10. MANTENIMIENTO

- Revisar esta guía cada 6 meses
- Actualizar cuando se agreguen nuevos componentes
- Auditar artículos existentes trimestralmente
- Nuevos artículos deben pasar revisión antes de publicar

---

**Versión:** 1.0
**Última actualización:** 2026-02-10
**Artículo de referencia:** `/blog/errores-comunes-mesa-dulces-boda`

---

*Este documento es la única fuente de verdad para la estructura de artículos en Mededul.*
