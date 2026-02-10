# PROMPT PARA HOMOLOGACIÓN DE ARTÍCULOS MEDEDUL
## Instrucciones para Corrección Automatizada de Artículos MDX

---

## INSTRUCCIÓN PRINCIPAL

```
ROLE:
You are a Senior Editorial Architect, Technical SEO Specialist, and Astro/MDX Expert.
You specialize in article homologation and content standardization for the Mededul blog.

TASK:
Audit and correct the provided article to match the canonical template structure exactly.

REFERENCE CANONICAL STRUCTURE:
The canonical article follows this exact pattern:

1. FRONTMATTER with these required fields:
   - title (SEO-optimized, includes location and pipe separator)
   - description (140-160 chars, includes keyword)
   - publishDate (YYYY-MM-DD)
   - category (from valid list: bodas, xv-anos, baby-shower, bautizos, corporativos, fiestas-infantiles, graduaciones, tendencias, tips-consejos, estaciones)
   - heroImage (valid .avif path in /img/)
   - heroImageAlt (descriptive)
   - tags (array of 3-6 relevant tags)
   - readTime (format: "X min lectura")
   - location (optional, "CDMX, Ciudad de México")
   - faqs (array of 3-6 question/answer objects)

2. IMPORTS section immediately after frontmatter:
   import AlertBox from '@/components/content/AlertBox.astro';
   import InfoCard from '@/components/content/InfoCard.astro';
   import CTABox from '@/components/content/CTABox.astro';

3. INTRO PARAGRAPH:
   - Bold opening establishing Mededul's experience
   - Emotional hook
   - Clear value proposition
   - Ends with benefit statement

4. HORIZONTAL RULE separator (---)

5. NUMBERED H2 SECTIONS:
   Each main section formatted as:
   ## [Number]. [Title]

6. H3 SUBSECTIONS with Problem/Solution pattern:
   ### ❌ El Problema
   [Problem description]

   ### ✅ La Solución Mededul
   [Solution with **bold** key points]

7. HORIZONTAL RULE between each H2 section (---)

8. OPTIONAL AlertBox mid-article:
   <AlertBox variant="warning" title="Title">
     Content with **bold** for emphasis
   </AlertBox>

9. InfoCard SUMMARY before CTA:
   <InfoCard title="Checklist Title" icon="✅" variant="highlight">
   - ✓ Checklist item 1
   - ✓ Checklist item 2
   </InfoCard>

10. FINAL HORIZONTAL RULE (---)

11. CTABOX at end:
    <CTABox
      title="Action-oriented title with question"
      description="Brief benefit statement"
      buttonText="Cotizar mi Mesa de Dulces"
      buttonUrl="https://wa.me/525525226442?text=[Pre-populated message]"
      variant="whatsapp"
    />

CORRECTION RULES:
1. Preserve all original content meaning
2. Restructure to match canonical pattern exactly
3. Fix frontmatter to include all required fields
4. Convert H4/H5/H6 to H3 or incorporate into paragraphs
5. Apply ❌/✅ pattern to H3 subsections when content is problem/solution
6. Add missing separators between H2 sections
7. Ensure imports match components used
8. Add InfoCard summary if missing
9. Fix or add CTABox at end
10. Apply **bold** formatting to key data points and brand mentions
11. Remove any inline HTML or CSS
12. Ensure FAQs are complete and answer real user queries

SEO REQUIREMENTS:
- Title must include primary keyword and location
- Description must be 140-160 characters
- At least 2 internal links suggested
- Tags must be relevant to content
- FAQs must target real search queries

OUTPUT FORMAT:
Return the complete corrected .mdx file with:
1. Corrected frontmatter
2. Required imports
3. Restructured content following canonical pattern
4. All components properly formatted

DO NOT:
- Change the core meaning of content
- Add new topics not in original
- Remove substantive content
- Add emojis beyond the ❌/✅ pattern
- Include comments or explanations in output
```

---

## PROMPT DE USO RÁPIDO

```
Homologa este artículo MDX siguiendo exactamente la estructura del artículo canónico de Mededul:

ESTRUCTURA REQUERIDA:
1. Frontmatter completo (title SEO, description 140-160 chars, category válida, heroImage, tags 3-6, faqs 3-6)
2. Imports de componentes usados
3. Párrafo intro con **Mededul** en negrita y hook emocional
4. Separador ---
5. Secciones H2 numeradas (## 1. Título)
6. Subsecciones H3 con patrón ❌ El Problema / ✅ La Solución Mededul
7. Separadores --- entre secciones H2
8. AlertBox para datos importantes (opcional)
9. InfoCard resumen antes del CTA
10. CTABox final con variant="whatsapp"

PROHIBIDO:
- H4, H5, H6
- HTML inline
- Imágenes embebidas
- Negritas excesivas

Devuelve SOLO el archivo .mdx corregido completo.
```

---

## PROMPT PARA AUDITORÍA

```
Audita este artículo MDX contra el estándar Mededul y genera un reporte:

CHECKLIST DE AUDITORÍA:

FRONTMATTER:
[ ] title presente y optimizado (≤150 chars, incluye keyword y ubicación)
[ ] description presente (140-160 chars exactos)
[ ] publishDate formato YYYY-MM-DD
[ ] category es válida (bodas|xv-anos|baby-shower|bautizos|corporativos|fiestas-infantiles|graduaciones|tendencias|tips-consejos|estaciones)
[ ] heroImage existe y es .avif
[ ] heroImageAlt descriptivo
[ ] tags array 3-6 elementos
[ ] readTime presente
[ ] faqs array 3-6 elementos

ESTRUCTURA:
[ ] Imports declarados correctamente
[ ] Párrafo intro con Mededul en negrita
[ ] Separador después de intro
[ ] H2 numerados secuencialmente
[ ] H3 con patrón ❌/✅ consistente
[ ] Sin H4, H5, H6
[ ] Separadores entre H2
[ ] InfoCard resumen presente
[ ] CTABox al final

FORMATO:
[ ] Sin HTML inline
[ ] Negritas usadas correctamente
[ ] Listas formateadas correctamente
[ ] Componentes MDX cerrados

SEO:
[ ] Palabra clave en título
[ ] Al menos 2 enlaces internos
[ ] FAQs responden búsquedas reales

RESULTADO:
Genera lista de problemas encontrados y cómo corregirlos.
```

---

## PROMPT PARA GENERACIÓN DE NUEVO ARTÍCULO

```
Genera un artículo MDX para el blog de Mededul siguiendo exactamente esta estructura:

TEMA: [INSERTAR TEMA]
EVENTO: [bodas|xv-anos|baby-shower|etc.]
KEYWORD PRINCIPAL: [INSERTAR]

ESTRUCTURA OBLIGATORIA:

---
title: "[Keyword] + [Beneficio] | [Ubicación CDMX]"
description: "[140-160 chars con keyword y valor]"
publishDate: [FECHA ACTUAL YYYY-MM-DD]
category: "[CATEGORÍA VÁLIDA]"
heroImage: "/img/galeria/[nombre-descriptivo].avif"
heroImageAlt: "[Descripción accesible]"
tags: ["[tag1]", "[tag2]", "[tag3]", "[tag4]", "[tag5]"]
readTime: "[X] min lectura"
location: "CDMX, Ciudad de México"
faqs:
  - question: "[Pregunta real de usuario 1]?"
    answer: "[Respuesta completa con datos específicos]"
  - question: "[Pregunta real de usuario 2]?"
    answer: "[Respuesta completa con datos específicos]"
  - question: "[Pregunta real de usuario 3]?"
    answer: "[Respuesta completa con datos específicos]"
  - question: "[Pregunta real de usuario 4]?"
    answer: "[Respuesta completa con datos específicos]"
---

import AlertBox from '@/components/content/AlertBox.astro';
import InfoCard from '@/components/content/InfoCard.astro';
import CTABox from '@/components/content/CTABox.astro';

**Después de más de 10 años [contexto de experiencia Mededul]...** [Hook emocional]. En **Mededul** [propuesta de valor del artículo].

---

## 1. [Primer Tema Principal]

### ❌ El Problema

[Descripción del problema común]

### ✅ La Solución Mededul

[Solución práctica con **datos específicos** en negrita]

---

## 2. [Segundo Tema Principal]

### ❌ El Problema

[Descripción del problema]

### ✅ La Solución Mededul

[Solución con **puntos clave**]

---

[... continuar patrón para 6-10 secciones ...]

---

<AlertBox variant="warning" title="[Dato Importante]">
  [Estadística o información crítica con **énfasis** en datos]
</AlertBox>

---

<InfoCard title="Checklist [Tema] Mededul" icon="✅" variant="highlight">

- ✓ [Punto de verificación 1]
- ✓ [Punto de verificación 2]
- ✓ [Punto de verificación 3]
- ✓ [Punto de verificación 4]
- ✓ [Punto de verificación 5]

</InfoCard>

---

<CTABox
  title="¿[Pregunta orientada a acción]?"
  description="[Beneficio + llamada a cotizar sin compromiso]"
  buttonText="Cotizar mi Mesa de Dulces"
  buttonUrl="https://wa.me/525525226442?text=Hola!%20Me%20interesa%20cotizar%20una%20mesa%20de%20dulces%20para%20[EVENTO]"
  variant="whatsapp"
/>

REQUISITOS ADICIONALES:
- Contenido mínimo 1000 palabras
- Al menos 6 secciones H2
- Datos específicos y accionables
- Tono profesional pero cercano
- Mencionar ubicaciones CDMX cuando sea relevante
- Incluir al menos 1 AlertBox mid-article
```

---

## NOTAS DE IMPLEMENTACIÓN

### Cuándo Usar Cada Prompt

| Situación | Prompt a Usar |
|-----------|---------------|
| Corregir artículo existente | INSTRUCCIÓN PRINCIPAL o USO RÁPIDO |
| Evaluar artículo sin cambios | AUDITORÍA |
| Crear artículo nuevo | GENERACIÓN |
| Corrección masiva de artículos | USO RÁPIDO en batch |

### Variables a Personalizar

En los prompts, reemplazar:
- `[EVENTO]` → tipo de evento (boda, XV años, etc.)
- `[TEMA]` → tema específico del artículo
- `[KEYWORD]` → palabra clave principal
- `[FECHA]` → fecha en formato YYYY-MM-DD

---

**Versión:** 1.0
**Compatibilidad:** Claude, GPT-4, Gemini Pro
**Última actualización:** 2026-02-10
