#!/usr/bin/env node
/* Markdown/MDX lint for blog content.
 * Checks:
 * 1) Required frontmatter keys exist.
 * 2) Non-draft files contain meaningful body content.
 * 3) Non-draft files contain at least one H2 heading.
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
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

function parseSections(raw) {
  if (!raw.startsWith('---')) return { frontmatter: '', body: raw };
  const parts = raw.split('---');
  if (parts.length < 3) return { frontmatter: '', body: raw };
  return {
    frontmatter: parts[1] || '',
    body: parts.slice(2).join('---') || ''
  };
}

const errors = [];
const files = walk(BLOG_DIR);

for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const raw = fs.readFileSync(file, 'utf8');
  const { frontmatter, body } = parseSections(raw);

  if (!frontmatter.trim()) {
    errors.push(`${rel}: missing or malformed frontmatter`);
    continue;
  }

  const isDraft = /^\s*draft:\s*true\s*$/m.test(frontmatter);
  for (const key of REQUIRED_KEYS) {
    const keyRegex = new RegExp(`^\\s*${key}:\\s*.+$`, 'm');
    if (!keyRegex.test(frontmatter)) {
      errors.push(`${rel}: missing frontmatter key "${key}"`);
    }
  }

  if (isDraft) continue;

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

if (errors.length > 0) {
  console.error(`Markdown lint failed with ${errors.length} issue(s):`);
  for (const err of errors) console.error(`- ${err}`);
  process.exit(1);
}

console.log(`Markdown lint passed (${files.length} files checked).`);
