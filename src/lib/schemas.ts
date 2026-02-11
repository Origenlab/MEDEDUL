/**
 * Schema.org Helpers for Mededul
 * ===============================
 * Utility functions to generate structured data schemas.
 */

export interface Package {
  name: string;
  price: string;
  currency?: string;
  guests?: string;
  features?: string[];
  [key: string]: unknown;
}

export interface ServiceSchemaOptions {
  name: string;
  description: string;
  packages?: Package[];
  areaServed?: string;
}

/**
 * Generates a Service schema with AggregateOffer for pricing
 */
export function generateServiceSchema(options: ServiceSchemaOptions) {
  const { name, description, packages = [], areaServed = 'Ciudad de Mexico' } = options;

  // Extract numeric prices from packages
  const prices = packages
    .map(pkg => {
      const match = pkg.price.replace(/[,$]/g, '').match(/\d+/);
      return match ? parseInt(match[0], 10) : null;
    })
    .filter((p): p is number => p !== null);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Mededul',
      telephone: '+525525226442',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ciudad de México',
        addressRegion: 'CDMX',
        addressCountry: 'MX'
      }
    },
    areaServed: {
      '@type': 'City',
      name: areaServed
    }
  };

  // Add AggregateOffer if we have prices
  if (prices.length > 0) {
    schema.offers = {
      '@type': 'AggregateOffer',
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      priceCurrency: 'MXN',
      offerCount: packages.length,
      offers: packages.map(pkg => ({
        '@type': 'Offer',
        name: pkg.name,
        price: pkg.price.replace(/[,$]/g, '').match(/\d+/)?.[0] || '0',
        priceCurrency: pkg.currency || 'MXN',
        description: pkg.guests || '',
        availability: 'https://schema.org/InStock'
      }))
    };
  }

  return schema;
}

/**
 * Generates a FAQPage schema from an array of Q&A items
 */
export function generateFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generates a BreadcrumbList schema from navigation items
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  siteUrl = 'https://mesas-de-dulces.com'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: siteUrl
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.name,
        item: `${siteUrl}${item.url}`
      }))
    ]
  };
}
