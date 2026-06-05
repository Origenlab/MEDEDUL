/**
 * Helpers de JSON-LD reutilizables para páginas de servicio.
 * Centralizan el boilerplate de Service/AggregateOffer y FAQPage que antes
 * se repetía (~50 líneas) en cada página. La forma del objeto y el orden de
 * claves se conservan EXACTOS para no alterar el HTML generado.
 */

export interface SchemaPackageLike {
  name: string;
  price: string;   // ej. "$5,200"
  guests: string;  // ej. "30-50 personas"
}

export interface FaqLike {
  question: string;
  answer: string;
}

/** FAQPage idéntico para todas las páginas. */
export function buildFaqSchema(faqs: FaqLike[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  };
}

export interface ServiceSchemaOptions {
  name: string;
  description: string;
  /** Prefijo del nombre de cada Offer, ej. "Tabla de Quesos" -> "Tabla de Quesos Esencial". */
  offerPrefix: string;
  packages: SchemaPackageLike[];
  areaServedName?: string;   // default: "Ciudad de Mexico"
  telephone?: string;        // default: "+525525226442"
  ratingValue?: string;      // default: "4.9"
  reviewCount?: string;      // default: "127"
  /** Solo se incluye si se pasa (algunas páginas lo declaran, otras no). */
  bestRating?: string;
}

/** Service + AggregateOffer; lowPrice/highPrice se derivan de los paquetes. */
export function buildServiceSchema(o: ServiceSchemaOptions) {
  const nums = o.packages.map((p) => Number(p.price.replace(/[$,]/g, '')));

  const aggregateRating: Record<string, string> = {
    '@type': 'AggregateRating',
    ratingValue: o.ratingValue ?? '4.9',
    reviewCount: o.reviewCount ?? '127'
  };
  if (o.bestRating) aggregateRating.bestRating = o.bestRating;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: o.name,
    description: o.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Mededul',
      telephone: o.telephone ?? '+525525226442',
      aggregateRating
    },
    areaServed: { '@type': 'City', name: o.areaServedName ?? 'Ciudad de Mexico' },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: String(Math.min(...nums)),
      highPrice: String(Math.max(...nums)),
      priceCurrency: 'MXN',
      offerCount: String(o.packages.length),
      offers: o.packages.map((pkg) => ({
        '@type': 'Offer',
        name: `${o.offerPrefix} ${pkg.name}`,
        price: pkg.price.replace(/[$,]/g, ''),
        priceCurrency: 'MXN',
        description: pkg.guests,
        availability: 'https://schema.org/InStock'
      }))
    }
  };
}
