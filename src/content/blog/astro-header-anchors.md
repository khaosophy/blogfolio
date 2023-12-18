---
title: Section Header Anchors in Astro
slug: astro-header-anchors
excerpt: Ever see a link icon next to a header when reading a blog post or piece of documentation? It's a great trick that lets you quickly share a specific section with other people. Let's see how easy it is to get started with this pattern in Astro.
date: 2023-11-22
---

# Section Header Anchors in Astro

If you spend much time on the web reading blogs or documentation, you may have encountered a little *link* icon next to a header. If you click on it, it will "anchor" to that section, meaning it will scroll to it and update the URL. It's a great way to share a specific section of a page with someone else. For example, maybe you're reading up [on Astro components](https://docs.astro.build/en/core-concepts/astro-components), and you want to link a coworker specifically to [the section on "Slots."](https://docs.astro.build/en/core-concepts/astro-components/#slots) Astro gives you the ability to do that! 

Just click on the link icon, copy the updated URL, and share. In order to accomplish this in your own project, you need two things:

1. Something needs to have a unique ID, typically a header
2. You need something for the user to click to update the URL

In this post, I will walk you through how to set it up in an Astro project when using markdown for the content. Although the exact steps are specific to Astro and markdown, the packages are not, and can be adjusted to work pretty much anywhere.

## Examples Across the Web

I mentioned Astro as an example above, but there are lots of places that utilize this pattern. Here are some more examples I found in my research.

<figure>
  <img src="/images/blog/astro-header-anchors/astro-slots.png" alt="screenshot of part of the Astro documentation" />
  <figcaption>Astro documentation includes a link icon to the left of the section title.</figcaption>
</figure>

<figure>
  <img src="/images/blog/astro-header-anchors/css-tricks-nodes.png" alt="screenshot of a section of a CSS Tricks blog post" />
  <figcaption>CSS Tricks includes a link icon tot he left of the section title.</figcaption>
</figure>

<figure>
  <img src="/images/blog/astro-header-anchors/smashing-mag-css-media.png" alt="screenshot of a section of a Smashing Magazine blog post" />
  <figcaption>Smashing Magazine includes a hash symbol to the right of the section title.</figcaption>
</figure>

### Generate Unique IDs

In order to have an anchor, you need to have a unique ID. You could manually include this throughout your content by including it in the code, like `<h3 id="unique-ids">Unique IDs</h3>`, but we wouldn't be developers if we wanted to do things manually. Thankfully there is a quick and painless way to do it programmatically: [rehype-slug](https://github.com/rehypejs/rehype-slug).

1. `npm install rehype-slug`
1. Configure the package in `astro.config.mjs`
    1. Import the package (`import rehypeSlug from 'rehype-slug'`)
    2. Add to the configuration:
        ```
        export default defineConfig({
          ...
          markdown: {
            rehypePlugins: [
              rehypeSlug,
            ],
          },
          ...
        });
        ```
1. Celebrate how easy that was

## Building the Link

Now that each heading has a unique ID, we can start building out the link system on top of it. 

1. Let's install `rehype-autolink-headings` to get started.
1. Then we need to configure the package in `astro.config.mjs`, just like we did before:
    ```
    rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'prepend',
            content: {
              type: 'text',
              value: '#',
            },
            headingProperties: {
              className: ['anchor'],
            },
            properties: {
              className: ['anchor-link'],
            },
          },
        ],
      ]
    ```

These are the settings I'm using on my blog, but there is a *ton* you can customize. You can check out [the documentation for their options](https://github.com/rehypejs/rehype-autolink-headings#options), but we'll go over some of them here too, hopefully illuminating some things.

## A Note on Rehype

Throughout this process we relied on two packages to do our heavy lifting, `rehype-slug` and `rehype-autolink-headings`. Both are plugins for `rehype`, which is a project that transforms content -- specifically HTML -- using ASTs or abstract syntax trees. Delving deeper into this topic is well beyond the scope of this blog post, but you can learn more about the core project at [unifiedjs.com](unifiedjs.com).