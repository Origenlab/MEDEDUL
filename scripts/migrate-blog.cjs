/**
 * Blog Migration Script: HTML to Markdown
 * Converts 61 blog articles from static HTML to Astro Content Collections
 */

const fs = require('fs');
const path = require('path');

// Source and destination paths
const SOURCE_DIR = path.join(__dirname, '../../blog');
const DEST_DIR = path.join(__dirname, '../src/content/blog');

// Category detection rules - more specific patterns first
function detectCategory(filename, title, _content) {
  const fname = filename.toLowerCase();
  const titleLower = title.toLowerCase();

  // Check filename first (most reliable)
  if (fname.includes('xv-anos') || fname.includes('quinceanera') || fname.includes('xv_anos')) {
    return 'xv-anos';
  }
  if (fname.includes('baby-shower') || fname.includes('baby_shower')) {
    return 'baby-shower';
  }
  if (fname.includes('bautizo') || fname.includes('bautismo')) {
    return 'bautizos';
  }
  if (fname.includes('corporativ') || fname.includes('empresa') || fname.includes('team-building') || fname.includes('lanzamiento') || fname.includes('conferencia') || fname.includes('congreso')) {
    return 'corporativos';
  }
  if (fname.includes('infantil') || fname.includes('cumpleanos') || fname.includes('ninos')) {
    return 'fiestas-infantiles';
  }
  if (fname.includes('estacion') || fname.includes('fuente-de-chocolate') || fname.includes('interactiv')) {
    return 'estaciones';
  }
  if (fname.includes('tendencia') || fname.includes('2025') || fname.includes('2026')) {
    return 'tendencias';
  }
  if (fname.includes('graduacion')) {
    return 'graduaciones';
  }

  // Check title next
  if (titleLower.includes('xv años') || titleLower.includes('quinceañera') || titleLower.includes('quince años') || titleLower.includes('xv-anos')) {
    return 'xv-anos';
  }
  if (titleLower.includes('baby shower')) {
    return 'baby-shower';
  }
  if (titleLower.includes('bautizo') || titleLower.includes('bautismo')) {
    return 'bautizos';
  }
  if (titleLower.includes('corporativ') || titleLower.includes('empresa') || titleLower.includes('roi')) {
    return 'corporativos';
  }
  if (titleLower.includes('infantil') || titleLower.includes('cumpleaños') || titleLower.includes('niños')) {
    return 'fiestas-infantiles';
  }
  if (titleLower.includes('estación') || titleLower.includes('fuente') || titleLower.includes('interactiv')) {
    return 'estaciones';
  }
  if (titleLower.includes('tendencia')) {
    return 'tendencias';
  }

  // Default to bodas if it mentions boda, otherwise tips
  if (fname.includes('boda') || titleLower.includes('boda') || titleLower.includes('matrimonio')) {
    return 'bodas';
  }

  return 'tips-consejos';
}

function extractMetaContent(html, name) {
  const regex = new RegExp(`<meta\\s+(?:name|property)=["']${name}["']\\s+content=["']([^"']+)["']`, 'i');
  const match = html.match(regex);
  if (match) return match[1];

  const regex2 = new RegExp(`<meta\\s+content=["']([^"']+)["']\\s+(?:name|property)=["']${name}["']`, 'i');
  const match2 = html.match(regex2);
  return match2 ? match2[1] : null;
}

function extractTitle(html) {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  if (match) {
    return match[1].replace(/\s*\|\s*Mededul.*$/i, '').trim();
  }
  return null;
}

function extractHeroImage(html) {
  // Try to find the hero image from og:image
  const ogImage = extractMetaContent(html, 'og:image');
  if (ogImage) {
    // Convert to relative path
    return ogImage.replace('https://mesas-de-dulces.com', '');
  }

  // Try to find from article featured image
  const imgMatch = html.match(/<figure class="article-featured-image">[^]*?<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) {
    return imgMatch[1].replace(/^\.\.\//, '/');
  }

  return '/img/galeria/mesa-dulces-elegante-01.avif';
}

function extractFAQs(html) {
  const faqs = [];

  // Try to extract from JSON-LD
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">[^]*?"@type":\s*"FAQPage"[^]*?<\/script>/i);
  if (jsonLdMatch) {
    try {
      const jsonStart = jsonLdMatch[0].indexOf('{');
      const jsonEnd = jsonLdMatch[0].lastIndexOf('}') + 1;
      const jsonStr = jsonLdMatch[0].slice(jsonStart, jsonEnd);
      const data = JSON.parse(jsonStr);

      if (data.mainEntity) {
        for (const item of data.mainEntity) {
          if (item['@type'] === 'Question') {
            faqs.push({
              question: item.name,
              answer: item.acceptedAnswer?.text || ''
            });
          }
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  }

  // Also try to extract from HTML FAQ section
  const faqItems = html.matchAll(/<div class="faq-item">[^]*?<div class="faq-question"[^>]*>([^<]+)<[^]*?<div class="faq-answer">[^]*?<p>([^<]+)<\/p>/gi);
  for (const match of faqItems) {
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    const answer = match[2].trim();
    if (question && answer && !faqs.some(f => f.question === question)) {
      faqs.push({ question, answer });
    }
  }

  return faqs;
}

function extractArticleContent(html) {
  // Find article-content div
  const contentMatch = html.match(/<div class="article-content">[^]*?<\/div>\s*<\/div>\s*<aside/i);
  if (!contentMatch) {
    const altMatch = html.match(/<div class="article-content">([^]*?)<div class="article-cta">/i);
    if (altMatch) {
      return htmlToMarkdown(altMatch[1]);
    }
    return '';
  }

  let content = contentMatch[0];

  // Remove wrapping divs and aside
  content = content.replace(/<div class="article-content">/, '');
  content = content.replace(/<\/div>\s*<\/div>\s*<aside.*$/i, '');

  return htmlToMarkdown(content);
}

function htmlToMarkdown(html) {
  let md = html;

  // Remove article intro and TOC
  md = md.replace(/<div class="article-intro">[^]*?<\/div>/gi, '');
  md = md.replace(/<nav class="toc">[^]*?<\/nav>/gi, '');

  // Remove FAQ section (we handle it separately)
  md = md.replace(/<div class="faq-section">[^]*?<\/div>\s*<div class="article-cta">/gi, '');
  md = md.replace(/<h2 id="faq">[^]*$/gi, '');

  // Remove highlight boxes, tips boxes, CTA boxes
  md = md.replace(/<div class="highlight-box">[^]*?<\/div>/gi, '');
  md = md.replace(/<div class="tips-box">[^]*?<\/div>/gi, '');
  md = md.replace(/<div class="article-cta">[^]*?<\/div>/gi, '');
  md = md.replace(/<div class="article-share">[^]*?<\/div>/gi, '');

  // Convert headers
  md = md.replace(/<h2[^>]*>([^<]+)<\/h2>/gi, '\n## $1\n');
  md = md.replace(/<h3[^>]*>([^<]+)<\/h3>/gi, '\n### $1\n');
  md = md.replace(/<h4[^>]*>([^<]+)<\/h4>/gi, '\n#### $1\n');

  // Convert paragraphs
  md = md.replace(/<p>([^]*?)<\/p>/gi, '\n$1\n');

  // Convert bold and strong
  md = md.replace(/<strong>([^<]+)<\/strong>/gi, '**$1**');
  md = md.replace(/<b>([^<]+)<\/b>/gi, '**$1**');

  // Convert emphasis
  md = md.replace(/<em>([^<]+)<\/em>/gi, '*$1*');
  md = md.replace(/<i>([^<]+)<\/i>/gi, '*$1*');

  // Convert links
  md = md.replace(/<a[^>]+href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi, '[$2]($1)');

  // Convert unordered lists
  md = md.replace(/<ul[^>]*>/gi, '\n');
  md = md.replace(/<\/ul>/gi, '\n');
  md = md.replace(/<li>([^<]+)<\/li>/gi, '- $1');

  // Convert ordered lists
  md = md.replace(/<ol[^>]*>/gi, '\n');
  md = md.replace(/<\/ol>/gi, '\n');

  // Remove figures and images (we'll reference them separately)
  md = md.replace(/<figure[^>]*>[^]*?<\/figure>/gi, '');

  // Remove remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Clean up whitespace
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.trim();

  // Decode HTML entities
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");
  md = md.replace(/&aacute;/g, 'á');
  md = md.replace(/&eacute;/g, 'é');
  md = md.replace(/&iacute;/g, 'í');
  md = md.replace(/&oacute;/g, 'ó');
  md = md.replace(/&uacute;/g, 'ú');
  md = md.replace(/&ntilde;/g, 'ñ');
  md = md.replace(/&Aacute;/g, 'Á');
  md = md.replace(/&Eacute;/g, 'É');
  md = md.replace(/&Iacute;/g, 'Í');
  md = md.replace(/&Oacute;/g, 'Ó');
  md = md.replace(/&Uacute;/g, 'Ú');
  md = md.replace(/&Ntilde;/g, 'Ñ');

  return md;
}

function generateSlug(filename) {
  return filename.replace('.html', '');
}

function extractLocation(filename, title) {
  const locations = ['polanco', 'pedregal', 'santa-fe', 'condesa', 'roma', 'interlomas', 'lomas', 'bosques', 'cdmx'];
  const text = (filename + ' ' + title).toLowerCase();

  for (const loc of locations) {
    if (text.includes(loc)) {
      return loc.charAt(0).toUpperCase() + loc.slice(1) + ', CDMX';
    }
  }
  return 'CDMX';
}

function extractTags(_title, category) {
  const tags = new Set();

  // Add category-based tags
  const categoryTags = {
    'bodas': ['bodas', 'boda', 'matrimonio'],
    'xv-anos': ['XV años', 'quinceañera', 'quince años'],
    'baby-shower': ['baby shower', 'bebé', 'embarazo'],
    'bautizos': ['bautizo', 'bautismo', 'primera comunión'],
    'corporativos': ['corporativo', 'empresa', 'evento empresarial'],
    'fiestas-infantiles': ['fiesta infantil', 'cumpleaños', 'niños'],
    'estaciones': ['estación interactiva', 'fuente', 'experiencia'],
    'tendencias': ['tendencias', '2025', '2026'],
    'tips-consejos': ['tips', 'consejos', 'guía']
  };

  if (categoryTags[category]) {
    categoryTags[category].forEach(t => tags.add(t));
  }

  // Add common tags
  tags.add('mesa de dulces');
  tags.add('candy bar');
  tags.add('CDMX');

  return Array.from(tags).slice(0, 5);
}

function migrateFile(filename) {
  const sourcePath = path.join(SOURCE_DIR, filename);

  if (!fs.existsSync(sourcePath)) {
    console.log(`Skipping ${filename} - file not found`);
    return;
  }

  const html = fs.readFileSync(sourcePath, 'utf-8');

  // Extract metadata
  const title = extractTitle(html) || filename.replace('.html', '').replace(/-/g, ' ');
  const description = extractMetaContent(html, 'description') || title;
  const heroImage = extractHeroImage(html);
  const heroImageAlt = extractMetaContent(html, 'og:title') || title;
  const category = detectCategory(filename, title, html);
  const location = extractLocation(filename, title);
  const faqs = extractFAQs(html);
  const tags = extractTags(title, category);
  const content = extractArticleContent(html);
  const slug = generateSlug(filename);

  // Generate frontmatter
  let frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
publishDate: 2026-01-15
category: "${category}"
heroImage: "${heroImage}"
heroImageAlt: "${heroImageAlt.replace(/"/g, '\\"')}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
readTime: "8 min lectura"
location: "${location}"`;

  if (faqs.length > 0) {
    frontmatter += `\nfaqs:`;
    for (const faq of faqs) {
      frontmatter += `\n  - question: "${faq.question.replace(/"/g, '\\"')}"
    answer: "${faq.answer.replace(/"/g, '\\"')}"`;
    }
  }

  frontmatter += `\n---\n\n`;

  // Combine frontmatter and content
  const markdown = frontmatter + content;

  // Write to destination
  const destPath = path.join(DEST_DIR, `${slug}.md`);
  fs.writeFileSync(destPath, markdown);

  console.log(`Migrated: ${filename} -> ${slug}.md (${category})`);
}

function main() {
  // Ensure destination directory exists
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }

  // Get all HTML files
  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => f.endsWith('.html') && f !== 'index.html');

  console.log(`Found ${files.length} blog articles to migrate\n`);

  let migrated = 0;
  let failed = 0;

  for (const file of files) {
    try {
      migrateFile(file);
      migrated++;
    } catch (error) {
      console.error(`Failed to migrate ${file}: ${error.message}`);
      failed++;
    }
  }

  console.log(`\nMigration complete!`);
  console.log(`Migrated: ${migrated}`);
  console.log(`Failed: ${failed}`);
}

main();
