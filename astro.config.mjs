import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  markdown: {
    syntaxHighlight: 'prism',
  },
  integrations: [
    react(),
  ],
});