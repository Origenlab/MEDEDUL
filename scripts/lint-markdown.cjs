#!/usr/bin/env node
/* Markdown/MDX lint for blog content.
 * Checks:
 * 1) Required frontmatter keys exist.
 * 2) Non-draft files contain meaningful body content.
 * 3) Non-draft files contain at least one H2/H3 heading.
 * 4) Markdown internal links point to existing routes/assets.
 * 5) Non-draft posts do not link to draft blog posts.
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const PUBLIC_DIR = path.join(ROOT, 'public');
const PAGES_DIR = path.join(ROOT, 'src', 'pages');
const REQUIRED_KEYS = ['title', 'description', 'publishDate', 'category', 'heroImage', 'heroImageAlt', 'tags'];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(abs, files);
    else if (entry.isFile() && entry.name.endsWith('.mdx')) files.push(abs);
  }
  return files;
}

function walkPages(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) walkPages(abs, files);
    else if (entry.isFile() && entry.name.endsWith('.astro')) files.push(abs);
  }
  return files;
}

function parseSections(raw) {
  if (!raw.startsWith('---')) return { frontmatter: '', body: raw };
  const parts = raw.split('---');
  if (parts.length < 3) return { frontmatter: '', body: raw };
  return {
    frontmatter: parts[1] || '',
    body: parts.slice(2).join('---') || ''
  };
}

function routeFromPage(absFile) {
  let rel = path.relative(PAGES_DIR, absFile).replace(/\\/g, '/');
  if (!rel.endsWith('.astro')) return null;
  rel = rel.slice(0, -'.astro'.length);
  if (rel.includes('[')) return null;
  if (rel === 'index') return '/';
  if (rel.endsWith('/index')) rel = rel.slice(0, -'/index'.length);
  return `/${rel}`;
}

function collectStaticRoutes() {
  const routes = new Set(['/']);
  for (const file of walkPages(PAGES_DIR)) {
    const route = routeFromPage(file);
    if (route) routes.add(route);
  }
  ['/blog', '/blog/categoria', '/blog/tag'].forEach((base) => routes.add(base));
  return routes;
}

function parseTags(frontmatter) {
  const inline = frontmatter.match(/^tags:\s*\[(.*?)\]\s*$/m);
  if (inline && inline[1]) {
    return inline[1]
      .split(',')
      .map((tag) => tag.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean);
  }

  const block = frontmatter.match(/^tags:\s*\n([\s\S]*?)(?:\n\w|$)/m);
  if (!block || !block[1]) return [];
  return block[1]
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
    .filter(Boolean);
}

function slugifyTag(tag) {
  return tag.toLowerCase().replace(/\s+/g, '-');
}

function normalizeInternalPath(href) {
  return href.replace(/\/$/, '') || '/';
}

function isIgnoredInternal(href) {
  return (
    href.startsWith('/img/') ||
    href.startsWith('/assets/') ||
    href.startsWith('/_astro/') ||
    href.startsWith('/api/')
  );
}

function routeExists(href, routes) {
  const normalized = normalizeInternalPath(href);
  if (isIgnoredInternal(normalized)) return true;
  const publicFile = path.join(PUBLIC_DIR, normalized.slice(1));
  if (fs.existsSync(publicFile)) return true;
  return routes.has(normalized);
}

const errors = [];
const files = walk(BLOG_DIR);
const routes = collectStaticRoutes();
const blogMeta = new Map();
const categories = new Set();
const tagSlugs = new Set();

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  const { frontmatter } = parseSections(raw);
  const slug = path.basename(file, '.mdx');
  const isDraft = /^\s*draft:\s*true\s*$/m.test(frontmatter);
  const categoryMatch = frontmatter.match(/^category:\s*["']?([^"'\n]+)["']?\s*$/m);
  const category = categoryMatch ? categoryMatch[1].trim() : '';
  const tags = parseTags(frontmatter);

  blogMeta.set(slug, { isDraft });
  routes.add(`/blog/${slug}`);
  if (category) categories.add(category);
  for (const tag of tags) tagSlugs.add(slugifyTag(tag));
}

for (const category of categories) routes.add(`/blog/categoria/${category}`);
for (const tagSlug of tagSlugs) routes.add(`/blog/tag/${tagSlug}`);

for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const raw = fs.readFileSync(file, 'utf8');
  const { frontmatter, body } = parseSections(raw);
  const slug = path.basename(file, '.mdx');
  const { isDraft } = blogMeta.get(slug) || { isDraft: false };

  if (!frontmatter.trim()) {
    errors.push(`${rel}: missing or malformed frontmatter`);
    continue;
  }

  for (const key of REQUIRED_KEYS) {
    const keyRegex = new RegExp(`^\\s*${key}:\\s*.+$`, 'm');
    if (!keyRegex.test(frontmatter)) {
      errors.push(`${rel}: missing frontmatter key "${key}"`);
    }
  }

  if (!isDraft) {
    const bodyLines = body
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => !line.startsWith('import ') && !line.startsWith('//'));

    if (bodyLines.length === 0) {
      errors.push(`${rel}: empty body (non-draft article)`);
      continue;
    }

    if (!/^##\s+/m.test(body) && !/^###\s+/m.test(body)) {
      errors.push(`${rel}: missing section heading (use ## ... or ### ...)`);
    }
  }

  const markdownLinkRegex = /\[[^\]]+\]\((\/[^)\s#?]+)[^)]*\)/g;
  let markdownLinkMatch;

  while ((markdownLinkMatch = markdownLinkRegex.exec(raw)) !== null) {
    const href = markdownLinkMatch[1];
    if (!routeExists(href, routes)) {
      errors.push(`${rel}: broken markdown link ${href}`);
      continue;
    }

    if (isDraft) continue;

    const normalized = normalizeInternalPath(href);
    if (!normalized.startsWith('/blog/')) continue;

    const blogRemainder = normalized.slice('/blog/'.length);
    if (!blogRemainder || blogRemainder.includes('/')) continue;

    const targetMeta = blogMeta.get(blogRemainder);
    if (targetMeta && targetMeta.isDraft) {
      errors.push(`${rel}: links to draft article ${normalized}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Markdown lint failed with ${errors.length} issue(s):`);
  for (const err of errors) console.error(`- ${err}`);
  process.exit(1);
}

console.log(`Markdown lint passed (${files.length} files checked).`);
