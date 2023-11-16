import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from "@astrojs/mdx";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: 'prism',
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
    ]
  },
  site: 'https://caseyjamesperno.com',
  integrations: [react(), sitemap(), mdx()],
});