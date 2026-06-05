/**
 * ExactDN CDN Configuration
 * EWWW.io Image Optimization
 */

export const CDN_CONFIG = {
  enabled: true,
  baseUrl: 'https://e2pex68gctc.exactdn.com',
} as const;

// Calidad por defecto para imagenes servidas por el CDN.
// AVIF a 75 es visualmente equivalente a 80 y reduce ~15-20% el peso.
// Cualquier llamada que pase su propio `q` lo sobreescribe.
const DEFAULT_QUALITY = 75;

const SITE_IMAGE_HOSTS = new Set([
  'mesas-de-dulces.com',
  'www.mesas-de-dulces.com'
]);

/**
 * Get CDN URL for an image path
 * @param imagePath - Local image path (e.g., "/img/galeria/mesa-dulces-elegante-01.avif")
 * @param params - Optional ExactDN parameters
 * @returns Full CDN URL
 */
export function getCdnUrl(imagePath: string, params?: Record<string, string | number>): string {
  if (!CDN_CONFIG.enabled || !imagePath) {
    return imagePath;
  }

  let baseUrl = '';

  try {
    if (/^https?:\/\//i.test(imagePath)) {
      const parsed = new URL(imagePath);
      if (parsed.hostname === new URL(CDN_CONFIG.baseUrl).hostname) {
        baseUrl = `${CDN_CONFIG.baseUrl}${parsed.pathname}`;
      } else if (SITE_IMAGE_HOSTS.has(parsed.hostname) && parsed.pathname.startsWith('/img/')) {
        baseUrl = `${CDN_CONFIG.baseUrl}${parsed.pathname}`;
      } else {
        baseUrl = imagePath;
      }
    } else {
      const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
      baseUrl = `${CDN_CONFIG.baseUrl}${cleanPath}`;
    }
  } catch {
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    baseUrl = `${CDN_CONFIG.baseUrl}${cleanPath}`;
  }

  // Aplicar calidad por defecto solo a URLs del CDN (no a externas).
  const isCdnUrl = baseUrl.startsWith(CDN_CONFIG.baseUrl);
  const effectiveParams = isCdnUrl
    ? { q: DEFAULT_QUALITY, ...(params || {}) }
    : (params || {});

  // Add optimization parameters if provided
  if (effectiveParams && Object.keys(effectiveParams).length > 0) {
    const url = new URL(baseUrl, CDN_CONFIG.baseUrl);
    Object.entries(effectiveParams).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
    return /^https?:\/\//i.test(baseUrl) ? url.toString() : `${baseUrl}?${url.searchParams.toString()}`;
  }

  return baseUrl;
}

/**
 * Build a responsive srcset for CDN images.
 * @param imagePath - Local image path or full URL
 * @param widths - Width candidates in px
 * @param params - Shared optimization params
 * @returns srcset string for use in <img srcset="">
 */
export function getCdnSrcSet(
  imagePath: string,
  widths: number[],
  params?: Record<string, string | number>
): string {
  return widths
    .map((width) => `${getCdnUrl(imagePath, { ...params, w: width })} ${width}w`)
    .join(', ');
}
