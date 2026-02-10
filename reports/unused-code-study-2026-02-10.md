# Unused Code Study - 2026-02-10

## Scope
Audit focused on `src/` to identify high-confidence dead code while avoiding risky deletions that could affect routes or content rendering.

## Method
- Static reference scan with `rg` for component/path imports.
- Validation with `npm run check` after cleanup.
- Conservative rule: only remove files/functions with zero references in active pages/layouts/components/content pipelines.

## Findings

### High-confidence unused items (removed)
1. `src/components/content/index.ts`
- No imports in `src/pages`, `src/layouts`, `src/components`, or content imports.
- It was only a barrel export and not consumed.

2. `src/components/ui/` (empty directory)
- Directory existed with no files.

3. `src/lib/cdn.ts` dead helpers
- Removed unused `CDN_CONFIG.defaultParams` placeholder.
- Removed unused exports:
  - `getCdnSrcset`
  - `getImageProps`
- `getCdnUrl` remains active and widely used.

### Potentially unused but kept (to avoid accidental regressions)
1. Content components used mostly for editorial/docs workflows:
- `src/components/content/ComparisonTable.astro`
- `src/components/content/FeatureList.astro`
- `src/components/content/ProsCons.astro`
- `src/components/content/StatCard.astro`
- `src/components/content/StatsGrid.astro`
- `src/components/content/StepList.astro`

Notes:
- These appear in `src/content/docs/content-components.mdx` and may be intended for future editorial usage.
- Not removed due product/editorial risk.

## Result
- Technical validation passed after cleanup:
  - `npm run check` => 0 errors, 0 warnings, 0 hints.

## Next recommended cleanup wave (optional)
- Define if `src/content/docs/` is part of production scope.
- If excluded from production, remove docs-only demo content and related demo components.
- If included, wire docs routes properly and keep components.
