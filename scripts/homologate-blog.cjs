#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');

const CATEGORY_LABEL = {
  'bodas': 'boda',
  'xv-anos': 'xv años',
  'baby-shower': 'baby shower',
  'bautizos': 'bautizo',
  'corporativos': 'evento corporativo',
  'fiestas-infantiles': 'fiesta infantil',
  'infantiles': 'fiesta infantil',
  'graduaciones': 'graduación',
  'tendencias': 'tendencias de mesas de dulces',
  'tips-consejos': 'mesa de dulces',
  'estaciones': 'estaciones interactivas'
};

const DEFAULT_TAGS = {
  'bodas': ['bodas', 'mesa de dulces', 'candy bar', 'cdmx', 'eventos'],
  'xv-anos': ['xv años', 'mesa de dulces', 'quinceañera', 'cdmx', 'eventos'],
  'baby-shower': ['baby shower', 'mesa de dulces', 'candy bar', 'cdmx', 'ideas'],
  'bautizos': ['bautizo', 'mesa de dulces', 'candy bar', 'cdmx', 'eventos'],
  'corporativos': ['corporativos', 'mesa de dulces', 'eventos empresariales', 'cdmx', 'branding'],
  'fiestas-infantiles': ['fiestas infantiles', 'mesa de dulces', 'candy bar', 'cdmx', 'niños'],
  'infantiles': ['fiestas infantiles', 'mesa de dulces', 'candy bar', 'cdmx', 'niños'],
  'graduaciones': ['graduaciones', 'mesa de dulces', 'candy bar', 'cdmx', 'eventos'],
  'tendencias': ['tendencias', 'mesa de dulces', 'candy bar', 'cdmx', 'eventos'],
  'tips-consejos': ['tips', 'mesa de dulces', 'candy bar', 'cdmx', 'guía'],
  'estaciones': ['estaciones', 'mesa de dulces', 'candy bar', 'cdmx', 'eventos']
};

const SECTION_TITLES = {
  'bodas': ['Definir concepto y estilo de la mesa', 'Calcular cantidades por número de invitados', 'Elegir dulces según clima y horario', 'Alinear montaje con el venue', 'Cuidar presentación y experiencia visual', 'Asegurar logística y plan de respaldo'],
  'xv-anos': ['Alinear la mesa con temática de la fiesta', 'Definir paleta de color sin saturación', 'Elegir dulces para distintos perfiles de invitado', 'Diseñar montaje con impacto en fotos', 'Coordinar tiempos de servicio y reposición', 'Cerrar con operación profesional y contingencias'],
  'baby-shower': ['Definir temática y narrativa visual', 'Controlar paleta de color y decoración', 'Seleccionar dulces funcionales y atractivos', 'Diseñar un montaje con altura y equilibrio', 'Calcular cantidades sin desperdicio', 'Validar señalización y logística de servicio'],
  'bautizos': ['Definir una estética sobria y elegante', 'Elegir dulces acordes al tipo de celebración', 'Controlar proporciones y cantidades', 'Diseñar mesa con lectura visual clara', 'Coordinar montaje en iglesia o salón', 'Mantener operación y reposición ordenada'],
  'corporativos': ['Definir objetivo del catering en el evento', 'Alinear diseño con identidad de marca', 'Organizar flujo de servicio para asistentes', 'Incluir opciones para distintos perfiles', 'Medir impacto y percepción del servicio', 'Asegurar continuidad con plan de contingencias'],
  'fiestas-infantiles': ['Ajustar diseño a la edad y temática', 'Seleccionar dulces seguros y variados', 'Construir una mesa visualmente divertida', 'Controlar porciones por invitado', 'Mantener orden durante el evento', 'Cerrar con logística y limpieza eficiente'],
  'infantiles': ['Ajustar diseño a la edad y temática', 'Seleccionar dulces seguros y variados', 'Construir una mesa visualmente divertida', 'Controlar porciones por invitado', 'Mantener orden durante el evento', 'Cerrar con logística y limpieza eficiente'],
  'graduaciones': ['Definir estilo de la celebración', 'Planear cantidades por tipo de asistente', 'Seleccionar dulces y postres balanceados', 'Montar una mesa con estética editorial', 'Coordinar tiempos y zonas de consumo', 'Implementar protocolo de reposición y cierre'],
  'tendencias': ['Evaluar tendencias con criterio práctico', 'Priorizar diseño funcional sobre moda', 'Seleccionar materiales y acabados actuales', 'Integrar personalización sin saturación', 'Alinear tendencia con presupuesto real', 'Ejecutar con logística profesional'],
  'tips-consejos': ['Definir objetivo antes de contratar', 'Diseñar la mesa con estructura visual', 'Seleccionar productos por calidad y rotación', 'Calcular cantidades de forma realista', 'Coordinar montaje, servicio y desmontaje', 'Validar checklist final de operación'],
  'estaciones': ['Definir tipo de estación según evento', 'Dimensionar capacidad por asistentes', 'Elegir insumos y acompañamientos adecuados', 'Diseñar flujo de servicio y circulación', 'Integrar montaje con estética general', 'Asegurar soporte técnico y contingencias']
};

const INTERNAL_LINKS = {
  'bodas': ['/blog/mesa-dulces-boda-cdmx-elegancia-y-estilo', '/blog/errores-comunes-mesa-dulces-boda'],
  'xv-anos': ['/blog/mesa-de-dulces-para-xv-anos-guia-completa', '/blog/errores-comunes-mesa-dulces-xv-anos'],
  'baby-shower': ['/blog/mesa-de-dulces-para-baby-shower-guia-completa', '/blog/ideas-mesa-dulces-baby-shower-perfecta'],
  'bautizos': ['/blog/mesa-dulces-bautizo-elegante-cdmx', '/blog/mesa-dulces-mexicanos-tradicionales-eventos'],
  'corporativos': ['/blog/mesa-dulces-eventos-corporativos-cdmx', '/blog/catering-dulces-eventos-empresariales-cdmx'],
  'fiestas-infantiles': ['/blog/mesa-dulces-cumpleanos-infantil-ideas', '/blog/magia-de-mesas-dulces-en-fiestas-infantiles-condesa'],
  'infantiles': ['/blog/mesa-dulces-cumpleanos-infantil-ideas', '/blog/magia-de-mesas-dulces-en-fiestas-infantiles-condesa'],
  'graduaciones': ['/blog/mesa-dulces-conferencias-congresos', '/blog/mesa-dulces-eventos-corporativos-empresas'],
  'tendencias': ['/blog/tendencias-mesas-dulces-2025-cdmx', '/blog/tendencias-mesa-dulces-xv-anos-2025'],
  'tips-consejos': ['/blog/mesa-dulces-bodas-guia-completa', '/blog/mesa-de-dulces-para-baby-shower-guia-completa'],
  'estaciones': ['/blog/estaciones-interactivas-gourmet-para-eventos-exquisitos', '/blog/guia-completa-fuentes-chocolate-eventos-cdmx']
};

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(abs, files);
    if (entry.isFile() && entry.name.endsWith('.mdx')) files.push(abs);
  }
  return files;
}

function splitFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return null;
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return null;
  return { fm: raw.slice(4, end), body: raw.slice(end + 5) };
}

function getField(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return m ? m[1].trim() : '';
}

function normStr(v) {
  return (v || '').replace(/^['\"]|['\"]$/g, '').trim();
}

function ensureTitle(title) {
  let t = normStr(title) || 'Guía Profesional de Mesa de Dulces';
  if (!t.includes('|')) t = `${t} | CDMX`;
  if (!/\bCDMX\b/i.test(t)) t = `${t} CDMX`;
  if (t.length > 150) t = `${t.slice(0, 147).trim()}...`;
  return t;
}

function ensureDescription(desc, topic) {
  let d = normStr(desc);
  if (!d || d.length < 140 || d.length > 160) {
    d = `Descubre ${topic} en CDMX con una guía profesional de planeación, diseño y ejecución para lograr un evento elegante, funcional y memorable.`;
  }
  if (d.length > 160) d = `${d.slice(0, 157).trim()}...`;
  if (d.length < 140) d = `${d} Ideal para eventos sociales y corporativos en Ciudad de México.`;
  if (d.length > 160) d = `${d.slice(0, 157).trim()}...`;
  return d;
}

function ensureDate(v) {
  const d = normStr(v);
  return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : '2026-01-15';
}

function parseTags(raw, category) {
  const m = raw.match(/^\[(.*)\]$/);
  if (!m) return DEFAULT_TAGS[category] || DEFAULT_TAGS['tips-consejos'];
  const tags = m[1]
    .split(',')
    .map((t) => normStr(t))
    .filter(Boolean);
  if (tags.length >= 3 && tags.length <= 6) return tags;
  return DEFAULT_TAGS[category] || DEFAULT_TAGS['tips-consejos'];
}

function qaForCategory(label) {
  return [
    {
      q: `¿Cómo planear una ${label} sin errores?`,
      a: `Empieza por definir objetivo, estilo visual, cantidad por invitado y logística completa de montaje, reposición y desmontaje.`
    },
    {
      q: `¿Cuántas piezas se recomiendan por invitado?`,
      a: `Como base operativa se recomienda proyectar entre 5 y 8 piezas por persona, ajustando por duración del evento y perfil de asistentes.`
    },
    {
      q: `¿Qué factores impactan más en el resultado final?`,
      a: `La coherencia visual, la calidad de los productos, el flujo de servicio y la capacidad de reposición son variables críticas para una experiencia sólida.`
    },
    {
      q: `¿Por qué conviene contratar un servicio profesional en CDMX?`,
      a: `Porque garantiza diseño, operación y control de contingencias, reduciendo riesgos y elevando la experiencia del evento de principio a fin.`
    }
  ];
}

function encodeMsg(text) {
  return encodeURIComponent(text);
}

function generateBody(title, category) {
  const sections = SECTION_TITLES[category] || SECTION_TITLES['tips-consejos'];
  const links = INTERNAL_LINKS[category] || INTERNAL_LINKS['tips-consejos'];

  const h2 = sections.map((s, i) => {
    const base = `## ${i + 1}. ${s}\n\n### ❌ El Problema\n\nCuando este punto no se planea correctamente, aparecen desviaciones de presupuesto, problemas de montaje y una experiencia inconsistente para los invitados.\n\n### ✅ La Solución Mededul\n\nAplicamos una metodología de planeación por etapas con **criterios técnicos**, validación previa y ejecución operativa para asegurar resultados estéticos y funcionales.`;
    if (i === 2) {
      return `${base}\n\n<AlertBox variant="warning" title="Punto crítico de ejecución">\n  En eventos con alta expectativa, la diferencia entre una mesa promedio y una experiencia premium está en el control operativo y la consistencia visual.\n</AlertBox>`;
    }
    if (i === 3) {
      return `${base}\n\nPara fortalecer la estrategia, puedes revisar [esta guía relacionada](${links[0]}) y complementar con [este artículo especializado](${links[1]}).`;
    }
    return base;
  }).join('\n\n---\n\n');

  const intro = `**Después de más de 10 años diseñando experiencias dulces en CDMX, en Mededul sabemos que una buena planeación marca la diferencia entre una mesa improvisada y un resultado memorable.** ${title.replace(/\s*\|.*$/, '')} requiere coherencia visual, control de cantidades y ejecución profesional. En **Mededul** te compartimos una guía práctica para lograrlo con estándar alto.`;

  const checklist = `<InfoCard title="Checklist de Ejecución Profesional" icon="✅" variant="highlight">\n\n- ✓ Objetivo y concepto visual claramente definidos\n- ✓ Paleta, productos y montaje alineados al evento\n- ✓ Cantidades calculadas por número real de invitados\n- ✓ Logística de montaje, servicio y reposición confirmada\n- ✓ Plan de contingencia validado para imprevistos\n- ✓ Cierre operativo con desmontaje ordenado\n\n</InfoCard>`;

  const cta = `<CTABox\n  title="¿Quieres una mesa de dulces impecable para tu evento?"\n  description="Diseñamos y operamos experiencias dulces en CDMX con enfoque estético, técnico y logístico para resultados profesionales."\n  buttonText="Cotizar mi Mesa de Dulces"\n  buttonUrl="https://wa.me/525525226442?text=${encodeMsg('Hola! Quiero cotizar una mesa de dulces para mi evento en CDMX')}"\n  variant="whatsapp"\n/>`;

  return [
    "import AlertBox from '@/components/content/AlertBox.astro';",
    "import InfoCard from '@/components/content/InfoCard.astro';",
    "import CTABox from '@/components/content/CTABox.astro';",
    '',
    intro,
    '',
    '---',
    '',
    h2,
    '',
    '---',
    '',
    checklist,
    '',
    '---',
    '',
    cta,
    ''
  ].join('\n');
}

function toYamlArrayInline(arr) {
  return `[${arr.map((x) => `"${x.replace(/"/g, "'")}"`).join(', ')}]`;
}

function run() {
  const files = walk(BLOG_DIR);
  let count = 0;

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const parsed = splitFrontmatter(raw);
    if (!parsed) continue;

    const fm = parsed.fm;
    const draft = /^draft:\s*true\s*$/m.test(fm);
    const category = normStr(getField(fm, 'category')) || 'tips-consejos';
    const label = CATEGORY_LABEL[category] || 'mesa de dulces';

    const title = ensureTitle(getField(fm, 'title'));
    const description = ensureDescription(getField(fm, 'description'), label);
    const publishDate = ensureDate(getField(fm, 'publishDate'));
    const heroImage = normStr(getField(fm, 'heroImage')) || '/img/galeria/candy-bar-elegante-terraza-atardecer.avif';
    const heroImageAlt = normStr(getField(fm, 'heroImageAlt')) || `${title.replace(/\s*\|.*$/, '')}`;
    const tags = parseTags(getField(fm, 'tags'), category);
    const readTime = normStr(getField(fm, 'readTime')) || '8 min lectura';
    const location = 'CDMX, Ciudad de México';
    const faqs = qaForCategory(label);

    const frontmatter = [
      '---',
      `title: "${title.replace(/"/g, "'")}"`,
      `description: "${description.replace(/"/g, "'")}"`,
      `publishDate: ${publishDate}`,
      `category: "${category}"`,
      `heroImage: "${heroImage}"`,
      `heroImageAlt: "${heroImageAlt.replace(/"/g, "'")}"`,
      `tags: ${toYamlArrayInline(tags)}`,
      `readTime: "${readTime}"`,
      `location: "${location}"`,
      'faqs:',
      ...faqs.flatMap((f) => [
        `  - question: "${f.q.replace(/"/g, "'")}"`,
        `    answer: "${f.a.replace(/"/g, "'")}"`
      ]),
      ...(draft ? ['draft: true'] : []),
      '---',
      ''
    ].join('\n');

    const body = generateBody(title, category);
    fs.writeFileSync(file, `${frontmatter}${body}`);
    count += 1;
  }

  console.log(`Homologación aplicada a ${count} artículos.`);
}

run();
