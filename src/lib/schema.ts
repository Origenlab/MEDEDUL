/**
 * Helpers de JSON-LD reutilizables para páginas de servicio.
 * Centralizan el boilerplate de Service/AggregateOffer y FAQPage que antes
 * se repetía (~50 líneas) en cada página.
 */
import { getCdnUrl } from './cdn';

const SITE_URL = 'https://mesas-de-dulces.com';
const PROVIDER_LOGO = '/img/branding/logo-mededul-mesas-de-dulces.avif';
// Zonas de cobertura reales del negocio (CDMX + Valle de Toluca + EdoMex).
const DEFAULT_AREA_SERVED = [
  { '@type': 'City', name: 'Ciudad de Mexico' },
  { '@type': 'City', name: 'Toluca' },
  { '@type': 'City', name: 'Metepec' },
  { '@type': 'AdministrativeArea', name: 'Estado de Mexico' }
];

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
  /** Ruta canónica de la página (ej. "/tipos-de-mesas-de-dulces/mesa-de-postres") para el @id. */
  canonical?: string;
  /** Tipo de servicio; por defecto usa offerPrefix. */
  serviceType?: string;
  /** Lista de zonas; por defecto CDMX + Toluca + Metepec + EdoMex. */
  areaServed?: { '@type': string; name: string }[];
  telephone?: string;        // default: "+525525226442"
  ratingValue?: string;      // default: "4.9"
  reviewCount?: string;      // default: "127"
  /** Solo se incluye si se pasa (algunas páginas lo declaran, otras no). */
  bestRating?: string;
}

/** Service + AggregateOffer; lowPrice/highPrice se derivan de los paquetes. */
export function buildServiceSchema(o: ServiceSchemaOptions) {
  const nums = o.packages.map((p) => Number(p.price.replace(/[$,]/g, '')));

  // Integridad: NO se emite AggregateRating salvo reseñas reales y verificables.
  // (Los defaults fabricados 4.9/127 fueron retirados — 2026-06-20.)
  const service: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: o.name,
    serviceType: o.serviceType ?? o.offerPrefix,
    description: o.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Mededul',
      image: getCdnUrl(PROVIDER_LOGO),
      telephone: o.telephone ?? '+525525226442',
      url: SITE_URL
    },
    areaServed: o.areaServed ?? DEFAULT_AREA_SERVED,
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

  // @id estable y enlazable cuando se conoce la ruta canónica.
  if (o.canonical) service['@id'] = `${SITE_URL}${o.canonical}#service`;

  return service;
}
