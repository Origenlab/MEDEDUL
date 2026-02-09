/**
 * Migration Script: .md → .mdx
 *
 * This script converts Markdown blog posts to MDX format.
 * It preserves frontmatter, slugs, and URLs while enabling
 * the use of content components.
 *
 * Usage:
 *   node scripts/migrate-to-mdx.cjs           # Dry run (preview changes)
 *   node scripts/migrate-to-mdx.cjs --apply   # Apply changes
 *   node scripts/migrate-to-mdx.cjs --file=slug.md  # Migrate single file
 *
 * What it does:
 *   1. Renames .md files to .mdx
 *   2. Adds component imports at the top (after frontmatter)
 *   3. Identifies patterns that could use components (manual review needed)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const BACKUP_DIR = path.join(__dirname, '../_md-backup');

// Components to import (only add those that are likely to be used)
const DEFAULT_IMPORTS = `
import AlertBox from '@/components/content/AlertBox.astro';
import InfoCard from '@/components/content/InfoCard.astro';
import CTABox from '@/components/content/CTABox.astro';
import Quote from '@/components/content/Quote.astro';
import FeatureList from '@/components/content/FeatureList.astro';
import StepList from '@/components/content/StepList.astro';
import StatsGrid from '@/components/content/StatsGrid.astro';
import StatCard from '@/components/content/StatCard.astro';
import ProsCons from '@/components/content/ProsCons.astro';
import ComparisonTable from '@/components/content/ComparisonTable.astro';
`;

// Patterns to identify for potential component replacement
const PATTERNS_TO_REVIEW = [
  {
    name: 'Blockquote (potential Quote component)',
    regex: /^>\s+.+$/gm,
    suggestion: 'Consider using <Quote text="..." author="..." />'
  },
  {
    name: 'Numbered list with headers (potential StepList)',
    regex: /^(\d+\.\s+\*\*.+\*\*)/gm,
    suggestion: 'Consider using <StepList steps={[...]} />'
  },
  {
    name: 'Pros/Cons pattern (explicit headers)',
    regex: /(ventajas|pros|beneficios|desventajas|cons|contras)/gi,
    suggestion: 'Consider using <ProsCons pros={[...]} cons={[...]} />'
  },
  {
    name: 'Important/Note/Tip pattern',
    regex: /(\*\*(?:importante|nota|tip|consejo|advertencia|cuidado)\*\*:?)/gi,
    suggestion: 'Consider using <AlertBox variant="info/warning" title="..." />'
  },
  {
    name: 'Statistics pattern (numbers with context)',
    regex: /(\d+%|\d+\+|\$[\d,]+)/g,
    suggestion: 'Consider using <StatsGrid><StatCard value="..." label="..." /></StatsGrid>'
  }
];

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = !args.includes('--apply');
const singleFile = args.find(a => a.startsWith('--file='))?.split('=')[1];

console.log('\n🔄 MDX Migration Script');
console.log('========================');
console.log(isDryRun ? '📋 DRY RUN MODE (use --apply to execute)\n' : '⚡ APPLYING CHANGES\n');

// Get files to process
let files;
if (singleFile) {
  const filePath = path.join(BLOG_DIR, singleFile);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${singleFile}`);
    process.exit(1);
  }
  files = [singleFile];
} else {
  files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
}

if (files.length === 0) {
  console.log('✅ No .md files found. Migration may already be complete.');
  process.exit(0);
}

console.log(`📁 Found ${files.length} Markdown file(s) to migrate:\n`);

// Create backup directory if applying changes
if (!isDryRun && !fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  console.log(`📦 Created backup directory: ${BACKUP_DIR}\n`);
}

// Process each file
const results = {
  success: [],
  patterns: []
};

files.forEach((file, index) => {
  const filePath = path.join(BLOG_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  console.log(`${index + 1}. ${file}`);

  // Find patterns that might benefit from components
  const foundPatterns = [];
  PATTERNS_TO_REVIEW.forEach(pattern => {
    const matches = content.match(pattern.regex);
    if (matches && matches.length > 0) {
      foundPatterns.push({
        name: pattern.name,
        count: matches.length,
        suggestion: pattern.suggestion
      });
    }
  });

  if (foundPatterns.length > 0) {
    console.log('   📝 Patterns found for potential component use:');
    foundPatterns.forEach(p => {
      console.log(`      - ${p.name}: ${p.count} occurrence(s)`);
    });
    results.patterns.push({ file, patterns: foundPatterns });
  }

  // Prepare MDX content
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.log('   ⚠️  No frontmatter found, skipping\n');
    return;
  }

  const frontmatter = frontmatterMatch[0];
  const restOfContent = content.slice(frontmatter.length);

  // Create new MDX content with imports
  const mdxContent = `${frontmatter}
${DEFAULT_IMPORTS}
${restOfContent}`;

  const newFileName = file.replace('.md', '.mdx');
  const newFilePath = path.join(BLOG_DIR, newFileName);

  if (!isDryRun) {
    // Backup original file
    const backupPath = path.join(BACKUP_DIR, file);
    fs.copyFileSync(filePath, backupPath);

    // Write new MDX file
    fs.writeFileSync(newFilePath, mdxContent);

    // Remove original .md file
    fs.unlinkSync(filePath);

    console.log(`   ✅ Migrated to ${newFileName}`);
  } else {
    console.log(`   → Would create: ${newFileName}`);
  }

  results.success.push(file);
  console.log('');
});

// Summary
console.log('\n📊 MIGRATION SUMMARY');
console.log('====================');
console.log(`✅ Files processed: ${results.success.length}`);
console.log(`📝 Files with component opportunities: ${results.patterns.length}`);

if (results.patterns.length > 0) {
  console.log('\n📋 FILES REQUIRING MANUAL REVIEW:');
  console.log('(These files have patterns that could benefit from components)\n');
  results.patterns.forEach(({ file, patterns }) => {
    console.log(`• ${file.replace('.md', '.mdx')}`);
    patterns.forEach(p => {
      console.log(`  └─ ${p.suggestion}`);
    });
  });
}

if (isDryRun) {
  console.log('\n⚠️  This was a DRY RUN. No files were modified.');
  console.log('Run with --apply to execute the migration.');
} else {
  console.log(`\n✅ Migration complete! Backups saved to: ${BACKUP_DIR}`);
  console.log('\nNext steps:');
  console.log('1. Review the migrated .mdx files');
  console.log('2. Add component usage where appropriate');
  console.log('3. Run `npm run build` to verify everything works');
}
