import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://mesas-de-dulces.com',
  output: 'static',
  redirects: {
    '/blog/mesa-de-dulces-para-bodas-endulza-tu-dia-perfecto-cdmx': '/blog/mesa-dulces-bodas-guia-completa',
    '/blog/mesa-dulces-boda-cdmx-elegancia-y-estilo': '/blog/mesa-dulces-bodas-guia-completa',
    '/blog/mesa-dulces-bodas-exclusivas-cdmx': '/blog/elegancia-dulce-mesas-bodas-exclusivas-cdmx',
    '/blog/mesas-de-dulces-para-bodas-elegantes-en-cdmx': '/blog/mesa-dulces-bodas-guia-completa',
    '/blog/mesa-de-dulces-para-xv-anos-guia-completa-para-una-cele-pedregal': '/blog/mesa-de-dulces-para-xv-anos-guia-completa',
    '/blog/mesa-de-dulces-corporativo-catering-premium-para-eventos-emp-roma': '/blog/mesa-dulces-eventos-corporativos-cdmx',
    '/blog/mesa-de-dulces-corporativos-eleva-tus-eventos-empresari-condesa': '/blog/mesa-dulces-eventos-corporativos-cdmx',
    '/blog/mesa-de-dulces-corporativos-endulza-tus-eventos-empresariale-sant': '/blog/mesa-dulces-eventos-corporativos-cdmx',
    '/blog/mesa-de-dulces-corporativos-impresiona-en-eventos-empresaria-pola': '/blog/mesa-dulces-eventos-corporativos-cdmx',
    '/blog/mesa-de-dulces-infantil-guia-completa-para-fiestas-magi-polanco': '/blog/mesa-de-dulces-cumpleanos-infantil-en-cdmx',
    '/blog/mesa-de-dulces-infantil-un-sueno-hecho-realidad-interlomas': '/blog/mesa-de-dulces-cumpleanos-infantil-en-cdmx',
    '/blog/la-magia-de-la-mesa-de-dulces-en-baby-showers-bosques-de-las-loma': '/blog/mesa-de-dulces-para-baby-shower-guia-completa',
    '/blog/mesa-de-dulces-baby-shower-transforma-tu-celebracion-con-enc-pedr': '/blog/mesa-de-dulces-para-baby-shower-guia-completa',
    '/blog/mesa-de-dulces-para-baby-shower-magia-en-cada-dulce-interlomas': '/blog/mesa-de-dulces-para-baby-shower-guia-completa'
  },
  integrations: [
    mdx()
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    domains: ['e2pex68gctc.exactdn.com', 'mesas-de-dulces.com', 'www.mesas-de-dulces.com']
  },
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    build: {
      cssMinify: true
    }
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  }
});
