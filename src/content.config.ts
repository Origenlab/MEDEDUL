import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(150),
    description: z.string().max(300),
    publishDate: z.coerce.date().optional(),
    modifiedDate: z.coerce.date().optional(),
    category: z.enum([
      'bodas',
      'xv-anos',
      'baby-shower',
      'bautizos',
      'corporativos',
      'fiestas-infantiles',
      'infantiles',
      'graduaciones',
      'despedidas-soltero',
      'tips-consejos',
      'tendencias',
      'estaciones',
    ]),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    location: z.string().optional(),
    readTime: z.string().optional(),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
