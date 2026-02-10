import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://mesas-de-dulces.com',
  output: 'static',
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
    inlineStylesheets: 'auto'
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
