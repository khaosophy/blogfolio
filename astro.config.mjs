import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  markdown: {
    syntaxHighlight: 'prism',
  },
  site: 'https://caseyjamesperno.com',
  integrations: [
    react(),
    sitemap(),
  ],
});