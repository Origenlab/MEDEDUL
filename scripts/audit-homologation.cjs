#!/usr/bin/env node
/*
 * Strict homologation audit for Mededul blog articles.
 * Based on ARTICLE_HOMOLOGATION_GUIDE.md
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');

const VALID_CATEGORIES = new Set([
  'bodas',
  'xv-anos',
  'baby-shower',
  'bautizos',
  'corporativos',
  'fiestas-infantiles',
  'infantiles',
  'graduaciones',
  'tendencias',
  'tips-consejos',
  'estaciones'
]);

const ALLOWED_COMPONENTS = new Set([
  'AlertBox',
  'InfoCard',
  'CTABox',
  'Quote',
  'StepList',
  'ProsCons',
  'ComparisonTable',
  'FeatureList',
  'StatCard',
  'StatsGrid'
]);

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
  return {
    frontmatter: raw.slice(4, end),
    body: raw.slice(end + 5)
  };
}

function getField(frontmatter, key) {
  const re = new RegExp(`^${key}:\\s*(.+)$`, 'm');
  const match = frontmatter.match(re);
  return match ? match[1].trim() : null;
}

function parseTags(frontmatter) {
  const raw = getField(frontmatter, 'tags');
  if (!raw) return null;
  const m = raw.match(/^\[(.*)\]$/);
  if (!m) return null;
  const content = m[1].trim();
  if (!content) return [];
  return content
    .split(',')
    .map((v) => v.trim())
    .map((v) => v.replace(/^['\"]|['\"]$/g, ''))
    .filter(Boolean);
}

function countFaqs(frontmatter) {
  const idx = frontmatter.search(/^faqs:\s*$/m);
  if (idx === -1) return 0;
  const block = frontmatter.slice(idx);
  const q = (block.match(/^\s*-\s+question:\s+.+$/gm) || []).length;
  const a = (block.match(/^\s+answer:\s+.+$/gm) || []).length;
  return Math.min(q, a);
}

function getImports(body) {
  return (body.match(/^import\s+.+$/gm) || []).map((line) => line.trim());
}

function stripImports(body) {
  return body
    .split('\n')
    .filter((line) => !line.trim().startsWith('import '))
    .join('\n');
}

function firstContentLine(bodyNoImports) {
  const lines = bodyNoImports.split('\n').map((l) => l.trim());
  for (const line of lines) {
    if (!line) continue;
    return line;
  }
  return '';
}

function hasInternalLinks(body) {
  const links = body.match(/\[[^\]]+\]\(([^)]+)\)/g) || [];
  let count = 0;
  for (const l of links) {
    const m = l.match(/\[[^\]]+\]\(([^)]+)\)/);
    if (!m) continue;
    const url = m[1];
    if (url.startsWith('/') || url.includes('mesas-de-dulces.com')) count += 1;
  }
  return count >= 2;
}

function hasDisallowedHtml(body) {
  const tags = body.match(/<\/?([A-Za-z][A-Za-z0-9-]*)\b[^>]*>/g) || [];
  for (const t of tags) {
    const m = t.match(/<\/?([A-Za-z][A-Za-z0-9-]*)\b/);
    if (!m) continue;
    const name = m[1];
    if (!ALLOWED_COMPONENTS.has(name)) return true;
  }
  return false;
}

function auditFile(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const raw = fs.readFileSync(file, 'utf8');
  const parsed = splitFrontmatter(raw);
  const issues = [];

  if (!parsed) {
    return { file: rel, issues: ['Frontmatter faltante o malformado'], score: 0, draft: false };
  }

  const { frontmatter, body } = parsed;
  const isDraft = /^draft:\s*true\s*$/m.test(frontmatter);

  const requiredFields = [
    'title',
    'description',
    'publishDate',
    'category',
    'heroImage',
    'heroImageAlt',
    'tags',
    'readTime'
  ];

  for (const field of requiredFields) {
    if (!getField(frontmatter, field)) issues.push(`Frontmatter: falta ${field}`);
  }

  const title = (getField(frontmatter, 'title') || '').replace(/^['\"]|['\"]$/g, '');
  if (title && title.length > 150) issues.push('SEO: title > 150 caracteres');
  if (title && !title.includes('|')) issues.push('SEO: title sin separador "|"');

  const desc = (getField(frontmatter, 'description') || '').replace(/^['\"]|['\"]$/g, '');
  if (desc && (desc.length < 140 || desc.length > 160)) issues.push('SEO: description fuera de 140-160 caracteres');

  const publishDate = (getField(frontmatter, 'publishDate') || '').replace(/^['\"]|['\"]$/g, '');
  if (publishDate && !/^\d{4}-\d{2}-\d{2}$/.test(publishDate)) issues.push('Frontmatter: publishDate debe ser YYYY-MM-DD');

  const category = (getField(frontmatter, 'category') || '').replace(/^['\"]|['\"]$/g, '');
  if (category && !VALID_CATEGORIES.has(category)) issues.push(`Frontmatter: categoría no válida (${category})`);

  const heroImage = (getField(frontmatter, 'heroImage') || '').replace(/^['\"]|['\"]$/g, '');
  if (heroImage && !heroImage.endsWith('.avif')) issues.push('Frontmatter: heroImage debe ser .avif');
  if (heroImage && !heroImage.startsWith('/img/')) issues.push('Frontmatter: heroImage debe iniciar con /img/');

  const tags = parseTags(frontmatter);
  if (!tags) issues.push('Frontmatter: tags mal formateado (debe ser array inline)');
  if (tags && (tags.length < 3 || tags.length > 6)) issues.push('Frontmatter: tags debe tener 3-6 elementos');

  const readTime = (getField(frontmatter, 'readTime') || '').replace(/^['\"]|['\"]$/g, '');
  if (readTime && !/^\d+\s+min\s+lectura$/i.test(readTime)) issues.push('Frontmatter: readTime debe tener formato "X min lectura"');

  const faqsCount = countFaqs(frontmatter);
  if (!isDraft && faqsCount < 3) issues.push('Frontmatter: faqs insuficientes (mínimo 3)');
  if (faqsCount > 6) issues.push('Frontmatter: faqs excede 6 elementos');

  const imports = getImports(body);
  const requiredImports = [
    "import AlertBox from '@/components/content/AlertBox.astro';",
    "import InfoCard from '@/components/content/InfoCard.astro';",
    "import CTABox from '@/components/content/CTABox.astro';"
  ];

  for (const imp of requiredImports) {
    if (!imports.includes(imp)) issues.push(`Estructura: falta import obligatorio (${imp})`);
  }

  const bodyNoImports = stripImports(body);
  const firstLine = firstContentLine(bodyNoImports);
  if (!isDraft && firstLine && !firstLine.includes('**') ) issues.push('Estructura: intro inicial no tiene apertura en negritas');
  if (!isDraft && !bodyNoImports.includes('**Mededul**')) issues.push('Estructura: intro debe mencionar **Mededul**');

  const hrAfterIntro = bodyNoImports.split('\n').slice(0, 20).join('\n');
  if (!isDraft && !/\n---\n/.test(hrAfterIntro)) issues.push('Estructura: falta separador --- después de la intro');

  const h2Matches = [...bodyNoImports.matchAll(/^##\s+(\d+)\.\s+.+$/gm)].map((m) => Number(m[1]));
  if (!isDraft && h2Matches.length === 0) issues.push('Estructura: no hay H2 numerados (## 1. ...)');
  if (h2Matches.length > 0) {
    for (let i = 0; i < h2Matches.length; i += 1) {
      if (h2Matches[i] !== i + 1) {
        issues.push('Estructura: H2 no están numerados secuencialmente');
        break;
      }
    }
  }

  if (/^####\s+/m.test(bodyNoImports) || /^#####\s+/m.test(bodyNoImports) || /^######\s+/m.test(bodyNoImports)) {
    issues.push('Formato: contiene H4/H5/H6 (no permitido)');
  }

  if (!isDraft) {
    const problems = (bodyNoImports.match(/^###\s+❌\s+El\s+Problema\s*$/gm) || []).length;
    const solutions = (bodyNoImports.match(/^###\s+✅\s+La\s+Solución\s+Mededul\s*$/gm) || []).length;
    if (problems === 0 || solutions === 0) issues.push('Estructura: falta patrón H3 ❌/✅');
    if (problems !== solutions) issues.push('Estructura: patrón H3 ❌/✅ desbalanceado');
  }

  if (!isDraft && !/<InfoCard\b[\s\S]*?<\/InfoCard>/m.test(bodyNoImports)) {
    issues.push('Estructura: falta InfoCard resumen antes del CTA');
  }

  if (!isDraft && !/<CTABox\b[\s\S]*variant="whatsapp"[\s\S]*\/>/m.test(bodyNoImports)) {
    issues.push('Estructura: falta CTABox final con variant="whatsapp"');
  }

  if (hasDisallowedHtml(bodyNoImports)) {
    issues.push('Formato: contiene HTML inline no permitido');
  }

  if (!isDraft && !hasInternalLinks(bodyNoImports)) {
    issues.push('SEO: faltan al menos 2 enlaces internos');
  }

  const score = Math.max(0, 100 - issues.length * 5);
  return { file: rel, issues, score, draft: isDraft };
}

const files = walk(BLOG_DIR);
const results = files.map(auditFile);
const failing = results.filter((r) => r.issues.length > 0);
failing.sort((a, b) => b.issues.length - a.issues.length || a.file.localeCompare(b.file));

const report = {
  generatedAt: new Date().toISOString(),
  total: results.length,
  failing: failing.length,
  passing: results.length - failing.length,
  results
};

const outPath = path.join(ROOT, 'reports', 'homologation-audit.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(report, null, 2));

console.log(`Auditoría completada: ${results.length} archivos`);
console.log(`Con incidencias: ${failing.length}`);
console.log(`Sin incidencias: ${results.length - failing.length}`);
console.log(`Reporte: ${path.relative(ROOT, outPath)}`);

console.log('\nTop 10 artículos con más incidencias:');
failing.slice(0, 10).forEach((item, idx) => {
  console.log(`${idx + 1}. ${item.file} (${item.issues.length} incidencias)`);
});

process.exit(0);
