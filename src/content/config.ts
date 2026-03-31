import { defineCollection, z } from 'astro:content';

// Blog Collection Schema
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(150), // Extended to accommodate longer SEO titles
    description: z.string().max(300), // Extended for longer meta descriptions
    publishDate: z.coerce.date(),
    modifiedDate: z.coerce.date().optional(),
    category: z.enum([
      'bodas',
      'xv-anos',
      'baby-shower',
      'bautizos',
      'corporativos',
      'fiestas-infantiles',
      'infantiles', // Alias for fiestas-infantiles
      'graduaciones',
      'despedidas-soltero',
      'tips-consejos',
      'tendencias',
      'estaciones' // For interactive stations articles
    ]),
    heroImage: z.string().optional(), // Path to image in public folder
    heroImageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    location: z.string().optional(),
    readTime: z.string().optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional(),
    draft: z.boolean().default(false)
  })
});

// Service Pages Collection (Candy Bar, Tipos de Mesas, etc.)
const serviceCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    heroImage: image(),
    heroImageAlt: z.string().optional(),
    packages: z.array(z.object({
      name: z.string(),
      price: z.string(),
      features: z.array(z.string()),
      popular: z.boolean().default(false)
    })).optional(),
    gallery: z.array(z.object({
      src: image(),
      alt: z.string()
    })).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional(),
    order: z.number().default(0)
  })
});

// Category metadata for blog
export const categoryMeta = {
  'bodas': {
    name: 'Bodas',
    icon: '💒',
    color: '#D1007A',
    description: 'Mesas de dulces para bodas elegantes'
  },
  'xv-anos': {
    name: 'XV Años',
    icon: '👑',
    color: '#7A2BC2',
    description: 'Candy bar para fiestas de quinceañera'
  },
  'baby-shower': {
    name: 'Baby Shower',
    icon: '👶',
    color: '#7A2BC2',
    description: 'Mesas de dulces tiernas para baby shower'
  },
  'bautizos': {
    name: 'Bautizos',
    icon: '✝️',
    color: '#8E5AD3',
    description: 'Candy bar para bautizos y primeras comuniones'
  },
  'corporativos': {
    name: 'Corporativos',
    icon: '🏢',
    color: '#636E72',
    description: 'Mesas de dulces para eventos empresariales'
  },
  'fiestas-infantiles': {
    name: 'Fiestas Infantiles',
    icon: '🎈',
    color: '#FF149A',
    description: 'Candy bar divertido para niños'
  },
  'infantiles': {
    name: 'Fiestas Infantiles',
    icon: '🎈',
    color: '#FF149A',
    description: 'Candy bar divertido para niños'
  },
  'graduaciones': {
    name: 'Graduaciones',
    icon: '🎓',
    color: '#2D3436',
    description: 'Mesas de dulces para graduaciones'
  },
  'despedidas-soltero': {
    name: 'Despedidas',
    icon: '🥂',
    color: '#FFE66D',
    description: 'Candy bar para despedidas de soltero/a'
  },
  'tips-consejos': {
    name: 'Tips y Consejos',
    icon: '💡',
    color: '#7A2BC2',
    description: 'Consejos para tu mesa de dulces'
  },
  'tendencias': {
    name: 'Tendencias',
    icon: '✨',
    color: '#A0005F',
    description: 'Las últimas tendencias en candy bar'
  },
  'estaciones': {
    name: 'Estaciones',
    icon: '🍫',
    color: '#8B4513',
    description: 'Estaciones interactivas para eventos'
  }
};

export const collections = {
  blog: blogCollection,
  'candy-bar': serviceCollection,
  'tipos-mesas': serviceCollection,
  'estaciones': serviceCollection,
  'porque-mededul': serviceCollection
};
