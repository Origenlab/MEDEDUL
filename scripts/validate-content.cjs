#!/usr/bin/env node
/* Content validation for Astro + Markdown files.
 * Checks:
 * 1) Absolute /img references point to existing files in /public.
 * 2) Internal href links point to existing static Astro routes.
 * 3) blog heroImage frontmatter points to existing file in /public.
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const SRC_DIR = path.join(ROOT, 'src');
const PAGES_DIR = path.join(SRC_DIR, 'pages');
const BLOG_DIR = path.join(SRC_DIR, 'content', 'blog');

const SCAN_EXTS = new Set(['.astro', '.md', '.mdx', '.ts', '.js', '.cjs']);
const LINK_EXTS = new Set(['.astro', '.md', '.mdx']);

function walk(dir, exts, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(abs, exts, files);
    else if (exts.has(path.extname(entry.name))) files.push(abs);
  }
  return files;
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

function collectRoutes() {
  const routes = new Set(['/']);
  for (const file of walk(PAGES_DIR, new Set(['.astro']))) {
    const route = routeFromPage(file);
    if (route) routes.add(route);
  }
  ['/blog', '/blog/categoria', '/blog/tag'].forEach((base) => routes.add(base));
  return routes;
}

function toPosix(p) {
  return p.replace(/\\/g, '/');
}

const errors = [];
const routes = collectRoutes();
const allScanFiles = walk(SRC_DIR, SCAN_EXTS).concat(walk(path.join(ROOT, 'scripts'), SCAN_EXTS));

for (const file of allScanFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relFile = toPosix(path.relative(ROOT, file));

  // /img absolute literal references
  const assetRegex = /(["'`])(\/img\/[A-Za-z0-9_./-]+)\1/g;
  let assetMatch;
  while ((assetMatch = assetRegex.exec(content)) !== null) {
    const absolutePublic = path.join(PUBLIC_DIR, assetMatch[2].slice(1));
    if (!fs.existsSync(absolutePublic)) {
      errors.push(`${relFile}: missing asset ${assetMatch[2]}`);
    }
  }

  if (!LINK_EXTS.has(path.extname(file))) continue;

  // Internal links
  const hrefRegex = /href\s*=\s*(["'])(\/[^"'#?]*)[^"']*\1/g;
  let hrefMatch;
  while ((hrefMatch = hrefRegex.exec(content)) !== null) {
    const href = hrefMatch[2].replace(/\/$/, '') || '/';
    if (href.startsWith('/img/') || href.startsWith('/assets/') || href.startsWith('/_astro/')) continue;
    const publicFile = path.join(PUBLIC_DIR, href.slice(1));
    if (fs.existsSync(publicFile)) continue;
    if (!routes.has(href)) {
      errors.push(`${relFile}: broken internal link ${href}`);
    }
  }
}

// Validate heroImage in blog frontmatter
if (fs.existsSync(BLOG_DIR)) {
  const blogFiles = walk(BLOG_DIR, new Set(['.md', '.mdx']));
  const heroRegex = /^heroImage:\s*["']?([^"'\n]+)["']?\s*$/m;
  for (const file of blogFiles) {
    const raw = fs.readFileSync(file, 'utf8');
    const relFile = toPosix(path.relative(ROOT, file));
    const match = raw.match(heroRegex);
    if (!match) continue;
    const heroImage = match[1].trim();
    if (!heroImage.startsWith('/')) continue;
    const absolutePublic = path.join(PUBLIC_DIR, heroImage.slice(1));
    if (!fs.existsSync(absolutePublic)) {
      errors.push(`${relFile}: missing heroImage ${heroImage}`);
    }
  }
}

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} issue(s):`);
  for (const err of errors) console.error(`- ${err}`);
  process.exit(1);
}

console.log('Content validation passed: links and image references are consistent.');
