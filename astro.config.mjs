import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: 'prism'
  },
  site: 'https://caseyjamesperno.com',
  integrations: [react(), sitemap(), mdx()]
});