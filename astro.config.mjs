import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';

// ─── Sitemap lastmod dinámico ──────────────────────────────────────────────
// Resuelve URL → archivo fuente → fecha real (git log → mtime → omitir).
// Mejor omitir lastmod que mentir con la fecha del build.
// Requiere fetch-depth: 0 en el checkout del workflow (si no, git log da HEAD).
const ROOT = dirname(fileURLToPath(import.meta.url));
const _dateCache = new Map();

function sourceDate(relPath) {
  if (_dateCache.has(relPath)) return _dateCache.get(relPath);
  let date = null;
  const abs = join(ROOT, relPath);
  if (existsSync(abs)) {
    try {
      const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
        cwd: ROOT,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
      if (out) date = new Date(out);
    } catch {}
    if (!date) {
      try {
        date = statSync(abs).mtime;
      } catch {}
    }
  }
  _dateCache.set(relPath, date);
  return date;
}

function lastmodForUrl(url) {
  const path = new URL(url).pathname.replace(/\/+$/, '');
  const rel = path === '' ? 'index' : path.replace(/^\//, '');
  const last = rel.split('/').pop();
  const candidates = [
    `src/pages/${rel}/index.astro`,
    `src/pages/${rel}.astro`,
    `src/pages/${rel}/index.md`,
  ];
  // Content collections: ruta completa bajo la colección y slug final
  for (const col of ['blog']) {
    const sub = rel.startsWith(`${col}/`) ? rel.slice(col.length + 1) : rel;
    for (const ext of ['md', 'mdx']) {
      candidates.push(`src/content/${col}/${sub}.${ext}`);
      candidates.push(`src/content/${col}/${sub}/index.${ext}`);
      candidates.push(`src/content/${col}/${last}.${ext}`);
    }
  }
  for (const c of candidates) {
    const d = sourceDate(c);
    if (d) return d;
  }
  return null;
}

export default defineConfig({
  site: 'https://mesas-de-dulces.com',
  output: 'static',
  redirects: {
    '/blog/mesa-de-dulces-para-bodas-endulza-tu-dia-perfecto-cdmx': '/blog/mesa-dulces-bodas-guia-completa',
    '/blog/mesa-dulces-boda-cdmx-elegancia-y-estilo': '/blog/mesa-dulces-bodas-guia-completa',
    '/blog/mesa-dulces-bodas-exclusivas-cdmx': '/blog/elegancia-dulce-mesas-bodas-exclusivas-cdmx',
    '/blog/mesas-de-dulces-para-bodas-elegantes-en-cdmx': '/blog/mesa-dulces-bodas-guia-completa',
    '/blog/mesa-de-dulces-para-xv-anos-guia-completa-para-una-cele-pedregal': '/blog/mesa-de-dulces-para-xv-anos-guia-completa',
    '/blog/mesa-de-dulces-corporativo-catering-premium-para-eventos-emp-roma': '/blog/mesa-dulces-eventos-corporativos-cdmx',
    '/blog/mesa-de-dulces-corporativos-eleva-tus-eventos-empresari-condesa': '/blog/mesa-dulces-eventos-corporativos-cdmx',
    '/blog/mesa-de-dulces-corporativos-endulza-tus-eventos-empresariale-sant': '/blog/mesa-dulces-eventos-corporativos-cdmx',
    '/blog/mesa-de-dulces-corporativos-impresiona-en-eventos-empresaria-pola': '/blog/mesa-dulces-eventos-corporativos-cdmx',
    '/blog/mesa-de-dulces-infantil-guia-completa-para-fiestas-magi-polanco': '/blog/mesa-de-dulces-cumpleanos-infantil-en-cdmx',
    '/blog/mesa-de-dulces-infantil-un-sueno-hecho-realidad-interlomas': '/blog/mesa-de-dulces-cumpleanos-infantil-en-cdmx',
    '/blog/la-magia-de-la-mesa-de-dulces-en-baby-showers-bosques-de-las-loma': '/blog/mesa-de-dulces-para-baby-shower-guia-completa',
    '/blog/mesa-de-dulces-baby-shower-transforma-tu-celebracion-con-enc-pedr': '/blog/mesa-de-dulces-para-baby-shower-guia-completa',
    '/blog/mesa-de-dulces-para-baby-shower-magia-en-cada-dulce-interlomas': '/blog/mesa-de-dulces-para-baby-shower-guia-completa'
  },
  integrations: [
    mdx(),
    sitemap({
      serialize: (item) => {
        // lastmod real por archivo fuente; si no se resuelve, se omite
        const lm = lastmodForUrl(item.url);
        if (lm) {
          item.lastmod = lm.toISOString();
        } else {
          delete item.lastmod;
        }
        return item;
      }
    })
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    domains: ['e2pex68gctc.exactdn.com', 'mesas-de-dulces.com', 'www.mesas-de-dulces.com']
  },
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    build: {
      cssMinify: true
    }
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  }
});
