/**
 * Content Components Library
 *
 * A collection of reusable components designed for MDX blog posts.
 * These components enhance content readability and visual appeal
 * while maintaining performance and accessibility.
 *
 * Usage in MDX:
 * ```mdx
 * import { AlertBox, Quote, StepList } from '@/components/content';
 *
 * <AlertBox variant="info" title="Nota">
 *   Contenido importante aquí.
 * </AlertBox>
 * ```
 */

// Re-export all content components
export { default as AlertBox } from './AlertBox.astro';
export { default as StatCard } from './StatCard.astro';
export { default as StatsGrid } from './StatsGrid.astro';
export { default as ComparisonTable } from './ComparisonTable.astro';
export { default as FeatureList } from './FeatureList.astro';
export { default as Quote } from './Quote.astro';
export { default as CTABox } from './CTABox.astro';
export { default as StepList } from './StepList.astro';
export { default as InfoCard } from './InfoCard.astro';
export { default as ProsCons } from './ProsCons.astro';
