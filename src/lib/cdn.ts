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

  // Remove leading slash if present for clean concatenation
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

  let url = `${CDN_CONFIG.baseUrl}${cleanPath}`;

  // Add optimization parameters if provided
  if (params && Object.keys(params).length > 0) {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    url += `?${queryString}`;
  }

  return url;
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
