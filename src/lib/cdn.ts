/**
 * ExactDN CDN Configuration
 * EWWW.io Image Optimization
 */

export const CDN_CONFIG = {
  enabled: true,
  baseUrl: 'https://e2pex68gctc.exactdn.com',
  // ExactDN optimization parameters
  defaultParams: {
    // Auto WebP/AVIF conversion
    // Lazy loading support
    // Responsive images
  }
} as const;

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

  // Add optimization parameters if provided
  if (params && Object.keys(params).length > 0) {
    const url = new URL(baseUrl, CDN_CONFIG.baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
    return /^https?:\/\//i.test(baseUrl) ? url.toString() : `${baseUrl}?${url.searchParams.toString()}`;
  }

  return baseUrl;
}

/**
 * Get responsive image srcset for ExactDN
 * @param imagePath - Local image path
 * @param widths - Array of widths for srcset
 * @returns srcset string
 */
export function getCdnSrcset(imagePath: string, widths: number[] = [320, 640, 960, 1280, 1920]): string {
  if (!CDN_CONFIG.enabled || !imagePath) {
    return '';
  }

  return widths
    .map(width => `${getCdnUrl(imagePath, { w: width })} ${width}w`)
    .join(', ');
}

/**
 * Image component props helper
 * @param imagePath - Local image path
 * @param alt - Alt text
 * @param width - Display width
 * @param height - Display height
 */
export function getImageProps(
  imagePath: string,
  alt: string,
  width?: number,
  height?: number
) {
  return {
    src: getCdnUrl(imagePath),
    srcset: getCdnSrcset(imagePath),
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    alt,
    width,
    height,
    loading: 'lazy' as const,
    decoding: 'async' as const,
  };
}
