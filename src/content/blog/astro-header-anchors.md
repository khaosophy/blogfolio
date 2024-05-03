---
title: Section Header Anchors in Astro
slug: astro-header-anchors
excerpt: Ever see a link icon next to a header when reading a blog post or piece of documentation? It's a great trick that lets you quickly share a specific section with other people. Let's see how easy it is to get started with this pattern in Astro.
date: 2023-11-22
---

If you spend much time on the web reading blogs or documentation, you may have encountered a little *link* icon next to a header. If you click on it, it will "anchor" to that section, meaning it will scroll to it and update the URL. It's a great way to share a specific section of a page with someone else. For example, maybe you're reading up [on Astro components](https://docs.astro.build/en/core-concepts/astro-components), and you want to link a coworker specifically to [the section on "Slots."](https://docs.astro.build/en/core-concepts/astro-components/#slots) Astro gives you the ability to do that! Just click on the link icon, copy the updated URL, and share. 

In order to accomplish this in your own project, you need two things:

1. An element needs to have a unique ID, typically a header
2. You need an element for the user to click

In this post, I will walk you through how to set it up in an Astro project that uses markdown for content. Although the *exact* steps are specific to Astro with markdown, the packages are not. You can use them pretty much anywhere that uses JavaScript.

## Examples Across the Web

I mentioned Astro as an example above, but there are lots of places that utilize this pattern. Here are some examples I found in my research.

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

In order to have an anchor on your page, you need to have a unique ID. You could manually include this throughout your content by including it in the code, like `<h3 id="unique-id">Unique ID</h3>`, but we wouldn't be developers if we wanted to do things manually. Besides, we're using markdown for our code, and although you can use HTML in markdown, that breaks the spirit. Thankfully there is a quick and painless way to do it programmatically: [rehype-slug](https://github.com/rehypejs/rehype-slug).

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
1. Celebrate how easy that was.

## Building the Link

Now that each heading has a unique ID -- the anchor -- we can start building out the links. For this step, we'll use the [rehype-autolink-headings](https://github.com/rehypejs/rehype-autolink-headings) package. As the previous package automatically added a unique ID to each header, this package automatically wraps each header with a link. 

1. `npm install rehype-autolink-headings`
1. Configure the package in `astro.config.mjs`
    1. Import the package (`import rehypeAutolinkHeadings from 'rehype-autolink-headings'`)
    2. Add to the configuration:
        ```
        export default defineConfig({
          ...
          markdown: {
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
            ],
          },
          ...
        });
        ```

These are the settings I'm using on my blog, but there is a *ton* you can customize. You can check out [the documentation for their options](https://github.com/rehypejs/rehype-autolink-headings#options), but let's go over them here too.

### Autolink Options

There is a ton of customization available in `rehype-autolink-headings`. The code snippet above is what I'm using on this blog, at least at the time of writing, but they did take me some time to work out, so let's go over them a bit.

#### Behavior

There are several types of behaviors that this package supports:

1. `prepend` (default) inserts the link before the heading text.<br />
    ```
    <h1 id="unique">Title</h1>
    <!-- becomes... -->
    <h1 id="unique">
      <a href="#unique">#</a>
      Title
    </h1>
    ```
1. `append` inserts the link after the heading text.<br />
    ```
    <h1 id="unique">Title</h1>
    <!-- becomes... -->
    <h1 id="unique">
      Title
      <a href="#unique">#</a>
    </h1>
    ```
1. `wrap` wraps the heading text.<br />
    ```
    <h1 id="unique">Title</h1>
    <!-- becomes... -->
    <h1 id="unique">
      <a href="#unique">
        Title
      </a>
    </h1>
    ```
1. `before` inserts the link before the heading tag.<br />
    ```
    <h1 id="unique">Title</h1>
    <!-- becomes... -->
    <a href="#unique">#</a>
    <h1 id="unique">Title</h1>
    ```
1. `after` inserts the link after the heading tag.<br />
    ```
    <h1 id="unique">Title</h1>
    <!-- becomes... -->
    <h1 id="unique">Title</h1>
    <a href="#unique">#</a>
    ```

No option here is better or worse than another. What works for you will depend on what you are trying to accomplish. Although note that if you use `wrap` and a `content` option, the package will concatenate the content to the end of the heading text (`Title#`, for example).

#### Content

This setting defines what is going to be *inside* the link itself. For now, I am just using a text with the value `#`, like this:

```
content: {
  type: 'text',
  value: '#',
}
```

But if you want to have it be something like `[jump to section]`, you could change it to the following:

```
content: {
  type: 'text',
  value: `[jump to section]`,
}
```

You can even specify an HTML element, like if you want to use an icon from Font Awesome or other icon library. Just replace type text with type raw as seen here:

```
content: {
  type: 'raw',
  value: '<i class="fa-solid fa-link"></i>',
},
```

If you do not include this field, it defaults to `<span class="icon icon-link"></span>`.

#### Properties

The properties option allows you to define attributes on the link that the plugin is adding to the markup. For example, if you want a class name or a data attribute -- or something for accessibility -- this would be the place to do it.

We are using both `headingProperties` and regular `properties`. The `headingProperties` modifies the heading element that is being used as the anchor, while `properties` modifies the added `a` element. Without either, for example, this is the markup that gets added to our DOM:

```
<h1 id="unique">
  <a href="#unique">#</a>
  Title
</h1>
```

But when we add the following properties options to our `astro.config.mjs`, the markup changes to include our custom class names.

```
# astro.config.mjs
headingProperties: {
  className: ['anchor'],
},
properties: {
  className: ['anchor-link'],
},

# Updated HTML
<h1 id="unique" class="anchor">
  <a href="#unique" class="anchor-link">#</a>
  Title
</h1>
```

This works for other properties in the same way, like `dataUrl: 'localhost'` would be added to the element as `data-url="localhost"`.

## A Note on Rehype

Throughout this process we relied on two packages to do our heavy lifting, `rehype-slug` and `rehype-autolink-headings`. Both are plugins for `rehype`, which is a project that transforms content -- specifically HTML -- using ASTs or abstract syntax trees. Delving deeper into this topic is well beyond the scope of this blog post, but you can learn more about the core project at [unifiedjs.com](unifiedjs.com).