#!/usr/bin/env node
/**
 * Editorial cleanup sweep for MEDEDUL blog articles.
 *
 * What it does:
 *   1. Removes address-dump paragraphs (any line containing "Av. Ejercito Nacional Mexicano 216")
 *   2. Removes "## N. Interlinking recomendado" sections entirely (redundant with auto RelatedArticles)
 *   3. Removes dangling "Solicita tambien una [...]" single-line link paragraphs that usually sit below the interlink block
 *   4. Removes "Interlinking activo para decision" bullet from checklists
 *   5. Re-numbers remaining `## N. Title` sections in sequence so the numbering stays clean
 *   6. Collapses 3+ consecutive blank lines to 1
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.resolve('src/content/blog');

const ADDRESS_NEEDLE = /Av\.\s*Ejercito Nacional Mexicano\s*216/;

async function processFile(file) {
  const full = path.join(BLOG_DIR, file);
  const src = await fs.readFile(full, 'utf8');

  // 1) Split frontmatter from body
  const fmMatch = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!fmMatch) return { file, changed: false, reason: 'no-frontmatter' };
  const frontmatter = fmMatch[0];
  let body = src.slice(frontmatter.length);

  const before = body;

  // 2) Remove address-dump lines
  body = body
    .split('\n')
    .filter((line) => !ADDRESS_NEEDLE.test(line))
    .join('\n');

  // 3) Remove "## N. Interlinking ..." section (any flavor) up to next ## / CTABox / InfoCard / EOF
  body = body.replace(
    /\n##\s+\d+\.\s+Interlinking[^\n]*[\s\S]*?(?=\n##\s|\n<CTABox|\n<InfoCard|$)/gi,
    '\n'
  );

  // 4) Remove dangling "Solicita tambien una [...](wa.me/...)" paragraphs that were
  //    a sidekick to the removed interlink block
  body = body.replace(
    /\n[^\n]*Solicita tambien[^\n]*wa\.me[^\n]*\n/gi,
    '\n'
  );

  // 5) Remove placeholder-flavored checklist bullets that read like SEO meta:
  //    "Interlinking ... distribuido/activo", "CTA de ... distribuido", "Enlaces internos ...", etc.
  const metaBulletPatterns = [
    /Interlinking[^\n]*/i,
    /CTA\s+de\s+[^\n]*distribuid[oa][^\n]*/i,
    /Enlaces?\s+internos\s+(para|que)[^\n]*/i,
    /Conversion\s+distribuida[^\n]*/i,
    /Funnel\s+de\s+contenido[^\n]*/i,
  ];
  body = body
    .split('\n')
    .filter((line) => {
      // Only filter bullet lines, not headings or prose
      if (!/^-\s/.test(line)) return true;
      const text = line.replace(/^-\s*✓?\s*/, '').trim();
      return !metaBulletPatterns.some((p) => p.test(text));
    })
    .join('\n');

  // 5b) Rename generic "## N. Cierre..." heading (and variants) to something more natural
  body = body.replace(/^(##\s+\d+\.\s+)Cierre(?:\s*:\s*.*)?$/gm, '$1En resumen');

  // 6) Renumber "## N. Title" sequentially (only those that start with a number)
  {
    let counter = 0;
    body = body.replace(/^(##\s+)(\d+)(\.\s+)(.+)$/gm, (_m, pre, _num, dot, title) => {
      counter += 1;
      return `${pre}${counter}${dot}${title}`;
    });
  }

  // 7) Collapse 3+ blank lines to 1
  body = body.replace(/\n{3,}/g, '\n\n');

  if (body === before) {
    return { file, changed: false };
  }

  await fs.writeFile(full, frontmatter + body, 'utf8');
  return { file, changed: true };
}

async function main() {
  const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith('.mdx'));
  const results = await Promise.all(files.map(processFile));

  const changed = results.filter((r) => r.changed);
  const unchanged = results.length - changed.length;

  console.log(`Processed ${results.length} files`);
  console.log(`  Changed:   ${changed.length}`);
  console.log(`  Unchanged: ${unchanged}`);
  if (changed.length) {
    console.log('\nChanged files:');
    for (const r of changed) console.log('  -', r.file);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
