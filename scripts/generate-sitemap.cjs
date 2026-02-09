/**
 * Generate sitemap.xml after build
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://mesas-de-dulces.com';
const DIST_DIR = path.join(__dirname, '../dist');

function getAllHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      getAllHtmlFiles(fullPath, files);
    } else if (item === 'index.html') {
      files.push(fullPath);
    }
  }

  return files;
}

function generateSitemap() {
  const htmlFiles = getAllHtmlFiles(DIST_DIR);

  const urls = htmlFiles.map(file => {
    const relativePath = path.relative(DIST_DIR, path.dirname(file));
    const url = relativePath ? `${SITE_URL}/${relativePath}/` : `${SITE_URL}/`;

    // Determine priority based on path depth
    const depth = relativePath.split('/').filter(Boolean).length;
    let priority = '0.7';
    let changefreq = 'weekly';

    if (depth === 0) {
      priority = '1.0';
      changefreq = 'daily';
    } else if (relativePath === 'blog') {
      priority = '0.9';
      changefreq = 'daily';
    } else if (relativePath.startsWith('blog/')) {
      priority = '0.8';
      changefreq = 'weekly';
    }

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
  console.log(`Generated sitemap.xml with ${urls.length} URLs`);
}

generateSitemap();
