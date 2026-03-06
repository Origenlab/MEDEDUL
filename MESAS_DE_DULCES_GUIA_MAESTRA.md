# GUIA MAESTRA PROFESIONAL Y ESTANDARIZADA
## Protocolo oficial para generar articulos en mesas-de-dulces.com (MEDEDUL)

Version: 2.0  
Estado: Oficial (uso local)  
Referencia editorial: /blog/mesa-de-dulces-cdmx-guia-profesional-para-contratar/

---

## 0) Objetivo del sistema editorial

Esta guia define el estandar unico para crear articulos del blog con calidad profesional, consistencia visual, cumplimiento tecnico y enfoque SEO/comercial.

Cada articulo debe cumplir 4 objetivos simultaneos:
1. Posicionar keywords transaccionales e informativas del nicho.
2. Educar al lector con criterio profesional aplicable.
3. Mover al usuario hacia contacto/cotizacion.
4. Reforzar autoridad de marca de MEDEDUL en CDMX.

Ningun articulo se publica si no cumple este documento.

---

## 1) Realidad tecnica del proyecto (obligatoria)

## 1.1 Arquitectura vigente

```text
src/
  content/
    blog/
      [slug].mdx
    config.ts
  pages/
    blog/
      [slug].astro
  layouts/
    BlogPostLayout.astro
  components/content/
    CTABox.astro
    InfoCard.astro
    AlertBox.astro
public/
  img/
```

## 1.2 Render real de articulos
1. El archivo `.mdx` vive en `src/content/blog/`.
2. Astro genera el `slug` desde el nombre del archivo.
3. `src/pages/blog/[slug].astro` renderiza la entrada.
4. `BlogPostLayout.astro` aplica estilos, sidebar y CTA final automatica.

## 1.3 Implicaciones editoriales
1. No usar campos de frontmatter fuera del schema real.
2. No usar HTML/CSS inline para "forzar" diseno.
3. El CTA final antes de footer ya lo inyecta el layout; en el cuerpo usar maximo 2 CTAs adicionales.

---

## 2) Frontmatter oficial (schema real)

Todo articulo DEBE usar exactamente estos campos:

```yaml
---
title: "Mesa de Dulces en CDMX: Guia Profesional para Contratar"
description: "Aprende a contratar una mesa de dulces en CDMX con criterios profesionales de diseno, operacion y servicio para tu evento."
publishDate: 2026-02-15
category: "tips-consejos"
heroImage: "/img/galeria/mesa-dulces-ejemplo-horizontal.avif"
heroImageAlt: "Mesa de dulces profesional en CDMX con composicion horizontal y diseno elegante"
tags: ["mesa de dulces", "mesa de dulces cdmx", "candy bar", "eventos", "contratar mesa de dulces"]
readTime: "14 min lectura"
location: "CDMX, Ciudad de Mexico"
faqs:
  - question: "Como elegir una mesa de dulces en CDMX sin improvisar?"
    answer: "Debes revisar portafolio, metodo, alcance operativo y coordinacion con venue."
draft: false
---
```

## 2.1 Campos requeridos
1. `title`
2. `description`
3. `publishDate`
4. `category`
5. `heroImage`
6. `heroImageAlt`
7. `tags`
8. `draft`

## 2.2 Campos opcionales recomendados
1. `readTime`
2. `location`
3. `faqs` (altamente recomendado para SEO + UX)

## 2.3 Campos NO usar
1. `author`
2. `date`
3. `image`
4. `canonical`
5. Cualquier otro campo fuera de `src/content/config.ts`

## 2.4 Categorias validas
1. `bodas`
2. `xv-anos`
3. `baby-shower`
4. `bautizos`
5. `corporativos`
6. `fiestas-infantiles`
7. `infantiles`
8. `graduaciones`
9. `despedidas-soltero`
10. `tips-consejos`
11. `tendencias`
12. `estaciones`

---

## 3) Estructura editorial homologada (basada en articulo modelo)

## 3.1 Estructura minima obligatoria
1. H1 unico.
2. Introduccion de 4 parrafos.
3. Imagen destacada horizontal + caption.
4. 5 a 7 H2.
5. H3 de soporte en secciones clave.
6. Al menos 1 tabla comparativa cuando el tema lo permita.
7. 1 bloque `InfoCard` utilizable como checklist.
8. 2 CTAs inline con `CTABox`.
9. FAQ final (4 a 6 preguntas).
10. Conclusion con bullets de decision.
11. Seccion de geolocalizacion con sucursales y zonas premium de CDMX.

## 3.2 Longitud objetivo
1. Minimo: 1800 palabras.
2. Recomendado: 2200 a 3000 palabras.
3. Maximo sugerido: 3500 palabras.

## 3.3 Tono y voz
1. Profesional y directo.
2. Enfoque consultivo, no agresivo.
3. Segunda persona (tu).
4. Orientado a decisiones reales de contratacion.
5. Posicionar a MEDEDUL con sustento metodologico, no hype.

---

## 4) SEO operativo obligatorio

## 4.1 Keyword strategy
1. Definir 1 keyword principal (ej. `mesa de dulces en cdmx`).
2. Definir 4 a 8 secundarias semanticas.
3. Incluir intencion local en el contenido cuando aplique.

## 4.2 Distribucion minima de keyword principal
1. H1.
2. Primer parrafo.
3. Minimo 2 H2.
4. Description.
5. Alt de al menos 2 imagenes.

## 4.3 Enlazado interno
1. Minimo 6, maximo 10 enlaces internos.
2. Mezclar rutas a:
3. `/blog` (articulos relacionados)
4. `/candy-bar-eventos/...` (servicios por tipo de evento)
5. `/servicios`
6. `/contacto`
7. Anchor text descriptivo; nunca "haz clic aqui".
8. En cada articulo incluir al menos 2 enlaces de servicios dentro del bloque de geolocalizacion.

## 4.4 FAQ para rich results
1. Incluir 4 a 6 preguntas reales.
2. Respuestas concretas y accionables.
3. Evitar respuestas vacias o marketing puro.

---

## 5) Reglas de imagenes (criticas)

## 5.1 Politica obligatoria
1. Solo rutas existentes en `/img/...`.
2. Solo imagenes horizontales en articulos.
3. Hero y contenido con preferencia 16:9 o 3:2.
4. Alt text descriptivo de 10 a 18 palabras.
5. Evitar imagenes verticales en cuerpo del articulo.

## 5.2 Frecuencia
1. 1 imagen cada 250 a 450 palabras.
2. Minimo 5 imagenes por articulo largo.
3. No saturar: priorizar utilidad narrativa.

## 5.3 Geolocalizacion SEO (obligatoria)
1. Cada articulo debe incluir una seccion con menciones de sucursales activas en CDMX.
2. Sucursales base obligatorias:
3. `Anzures`: Av. Ejercito Nacional Mexicano 216, Anzures, Miguel Hidalgo, 11590.
4. `Condesa`: Torre A, Av. Baja California 255, Condesa, Cuauhtemoc, 06170.
5. Incluir telefono `55 2522 6442` y enlace `Ver en Maps` por sucursal.
6. Mencionar zonas premium atendidas para reforzar posicionamiento local.
7. Zonas recomendadas: Polanco, Lomas de Chapultepec, Bosques de las Lomas, Santa Fe, Pedregal, Interlomas, Roma Norte y Condesa.
8. La seccion de geolocalizacion debe incluir enlaces internos a paginas de servicios relacionadas.
9. En el sidebar de articulo debe existir modulo de sucursales y modulo de zonas premium con enlaces de interlinking a servicios.

---

## 6) Componentes homologados para articulos

Usar componentes del sistema, no estilos inventados.

## 6.1 CTA inline
```mdx
import CTABox from '@/components/content/CTABox.astro';

<CTABox
  title="Te ayudamos a estructurar tu mesa de dulces en CDMX"
  description="MEDEDUL convierte tu idea en una propuesta integral visual y operativa."
  buttonText="Solicitar asesoria por WhatsApp"
  buttonUrl="https://wa.me/525525226442?text=Hola%2C%20quiero%20asesoria"
  variant="brand-whatsapp"
/>
```

## 6.2 Bloque de checklist o marco practico
```mdx
import InfoCard from '@/components/content/InfoCard.astro';

<InfoCard title="Checklist profesional" icon="✅" variant="highlight">

- Objetivo del montaje definido
- Alcance de servicio documentado
- Timeline validado con venue

</InfoCard>
```

## 6.3 Reglas para CTA
1. Maximo 2 CTAs en cuerpo.
2. Primera CTA despues de una seccion de alto valor.
3. Segunda CTA antes de conclusion/FAQ.
4. Mantener coherencia de mensaje con la seccion donde aparece.

## 6.4 Contraste visual obligatorio en CTAs
1. En variantes oscuras (`default`, `whatsapp`, `brand-whatsapp`), titulo, descripcion y boton deben renderizarse en blanco.
2. No publicar CTAs con texto del mismo color que el fondo.
3. Validar contraste en desktop y mobile antes de publicar.

---

## 7) Reglas de estilo y UX

1. No usar lineas verticales decorativas en contenido manual.
2. No insertar HTML complejo innecesario.
3. No insertar emojis en exceso (solo si aportan escaneo).
4. No repetir el mismo bloque de CTA con texto identico en exceso.
5. Parrafos de longitud media; evitar bloques gigantes o frases sueltas.

---

## 8) Restricciones editoriales (evergreen)

Nunca incluir:
1. Precios exactos o cotizaciones numericas.
2. Fechas de "temporada" en el cuerpo (ej. "este mes", "este ano").
3. Claims absolutos sin soporte (ej. "somos los numero 1").
4. Datos inventados o estadisticas no verificables.

Si se menciona marca:
1. Integrar MEDEDUL en contexto consultivo y profesional.
2. Evitar tono de anuncio duro.
3. Priorizar evidencia de metodo, ejecucion y alcance.

---

## 9) Flujo paso a paso para crear un articulo

1. Definir tema + keyword principal + intencion.
2. Elegir categoria valida del schema.
3. Definir slug final en kebab-case.
4. Preparar frontmatter oficial.
5. Construir outline H2/H3 segun plantilla homologada.
6. Redactar contenido completo con enfoque practico.
7. Integrar enlaces internos (6-10).
8. Integrar imagenes horizontales reales de `/img`.
9. Insertar 1 `InfoCard` y hasta 2 `CTABox`.
10. Crear FAQ (4-6 preguntas).
11. Incluir bloque de geolocalizacion (sucursales + zonas premium + interlinking de servicios).
12. Cerrar con conclusion accionable.
13. Validar con checklist de publicacion.

---

## 10) Checklist de validacion pre-publicacion

## 10.1 Estructura
- [ ] Un solo H1.
- [ ] 5-7 H2.
- [ ] FAQ incluida.
- [ ] Conclusion con bullets.

## 10.2 Frontmatter
- [ ] Campos exactos del schema real.
- [ ] Categoria valida.
- [ ] `heroImage` existente.
- [ ] `draft` correcto.

## 10.3 SEO
- [ ] Keyword principal en H1, intro y H2.
- [ ] Description clara y competitiva.
- [ ] 6-10 enlaces internos correctos.
- [ ] Anchors semanticos.
- [ ] Seccion local con sucursales y zonas premium incluida.

## 10.4 Visual
- [ ] Todas las imagenes en horizontal.
- [ ] Alt text en todas las imagenes.
- [ ] CTA visibles y legibles.
- [ ] Sin estilos inline ni hacks visuales.
- [ ] Texto en blanco dentro de CTAs oscuras.

## 10.5 Tecnico
- [ ] `npm run lint:content`
- [ ] `npm run lint:markdown`
- [ ] `npm run check`
- [ ] Build sin fallas atribuibles al articulo

---

## 11) Plantilla base recomendada (MDX)

```mdx
---
title: "[Titulo SEO 50-70 caracteres]"
description: "[Meta description clara y competitiva]"
publishDate: 2026-02-15
category: "tips-consejos"
heroImage: "/img/[ruta-horizontal].avif"
heroImageAlt: "[Descripcion visual SEO de la imagen principal]"
tags: ["mesa de dulces", "candy bar", "cdmx", "[tag 4]", "[tag 5]"]
readTime: "[12-16 min lectura]"
location: "CDMX, Ciudad de Mexico"
faqs:
  - question: "[Pregunta 1]"
    answer: "[Respuesta 1]"
  - question: "[Pregunta 2]"
    answer: "[Respuesta 2]"
draft: false
---

import InfoCard from '@/components/content/InfoCard.astro';
import CTABox from '@/components/content/CTABox.astro';

# [H1]

[Introduccion 4 parrafos]

![Alt descriptivo](/img/[ruta-horizontal].avif)
*Caption util*

## [H2]
### [H3]
[Desarrollo]

<InfoCard title="Checklist profesional" icon="✅" variant="highlight">

- Punto 1
- Punto 2
- Punto 3

</InfoCard>

<CTABox
  title="[CTA consultiva]"
  description="[Contexto claro de valor]"
  buttonText="[Accion]"
  buttonUrl="https://wa.me/525525226442?text=Hola"
  variant="brand-whatsapp"
/>

## Cobertura local y sucursales en CDMX

- **Anzures (24 horas):** Av. Ejercito Nacional Mexicano 216, Anzures, Miguel Hidalgo, 11590. [Ver en Maps](https://www.google.com/maps/search/?api=1&query=Av.+Ejercito+Nacional+Mexicano+216,+Anzures,+Miguel+Hidalgo,+11590,+Ciudad+de+Mexico)
- **Condesa (Lun-Sab 10-19h):** Torre A, Av. Baja California 255, Condesa, Cuauhtemoc, 06170. [Ver en Maps](https://www.google.com/maps/search/?api=1&query=Torre+A,+Av.+Baja+California+255,+Condesa,+Cuauhtemoc,+06170,+Ciudad+de+Mexico)

Cobertura frecuente en zonas premium: **Polanco, Lomas de Chapultepec, Bosques de las Lomas, Santa Fe, Pedregal, Interlomas, Roma Norte y Condesa**.

Enlaces de servicio recomendados:
- [Mesa de dulces para bodas](/candy-bar-eventos/mesa-dulces-boda)
- [Mesa de dulces corporativa](/candy-bar-eventos/mesa-dulces-corporativos)
- [Mesa de dulces para XV anos](/candy-bar-eventos/mesa-dulces-xv-anos)
- [Mesa de dulces para baby shower](/candy-bar-eventos/mesa-dulces-baby-shower)

## Preguntas frecuentes sobre [tema]
### [Pregunta]
[Respuesta]

## Conclusion
- [Decision clave 1]
- [Decision clave 2]
- [Decision clave 3]
```

---

## 12) Prompt maestro para pedir articulos (uso interno)

Usar este bloque al solicitar un nuevo articulo:

1. Tema principal:
2. Keyword principal:
3. Categoria:
4. Slug objetivo:
5. Intencion principal (SEO, conversion, autoridad, educacion):
6. Tipo de evento principal (boda, XV, baby shower, corporativo, etc.):
7. Enlaces internos obligatorios (si aplica):
8. CTA objetivo (WhatsApp, contacto, servicios):
9. Numero de palabras objetivo:
10. Si inicia como `draft: true` o `draft: false`:
11. Zonas premium a priorizar en geolocalizacion:

Respuesta esperada del generador:
1. Archivo `.mdx` completo y valido para Astro.
2. Frontmatter 100% compatible con schema.
3. Estructura homologada de esta guia.
4. Contenido evergreen, profesional y accionable.
5. Integracion de componentes (`CTABox`, `InfoCard`) sin romper compilacion.

---

## 13) Regla final de calidad

La velocidad de generacion no esta por encima de la calidad.

Un articulo solo es valido si:
1. Cumple schema tecnico.
2. Cumple estructura editorial.
3. Cumple SEO operativo.
4. Cumple consistencia visual.
5. Cumple objetivo comercial de MEDEDUL.
