---
title: Astro in Review
slug: astro-review
date: 2022-01-07
---

# Astro in Review

JavaScript has no shortage of frameworks. React. Vue. Angular. Ember. Next. Gatsby. Remix. Svelte. Honestly, it feels like there's a new one every day. One framework that especially caught my eye recently is Astro. Astro promises to deliver faster sites by shipping less: a properly static HTML site with less JavaScript, even if you're still developing the site in JavaScript. Of course, I've heard similar claims from Gatsby and Next as well. So what sets Astro apart from other static site generators? In this post, we'll look more closely at Astro, its benefits, its cons, and how it compares to some of its competitors.

## Astro in a Nutshell

At its most basic, Astro has pages and components. Pages are mapped to routes, such as /about or /blog/[post]. Components are reusable UI elements that make up your pages, such as Author or Excerpt. The project structure might look something like this:

```
├── src/
│   └── components/
│       └── Excerpt.astro
│       └── RelatedPosts.astro
│       └── Author.astro
│   └── pages/
│       └── index.astro
│       └── blog/
│           └── [post].astro
└── package.json
```

The above structure would create two page templates: the homepage (index.astro) and each individual blog post (`[post].astro`). The former would be a list of `Excerpts` linking to each individual post (e.g. `/blog/lorem-ipsum`). You can [review the for dynamic routing it here](https://docs.astro.build/en/core-concepts/routing/). We'll discuss it in more detail shortly.

Notice the extension on these files: `.astro`. This is a server-side templating language and it is very JSX-like. If you need logic in the component or page -- like fetching data or importing other components -- you can add it to the top in a process called *frontmatter scripting*. To include variables in your template, just wrap the variable in curly braces, like so: `<h1>Hello {name}</h1>`. Everything in these .astro files will output static HTML during build time. You can [read more about astro component syntax here](https://docs.astro.build/en/core-concepts/astro-components/). 

Where Astro really shines -- the framework, not the file type -- is in its ability to easily swap between server-rendered and client-rendered components in a process called Partial Hydration. This is what the Astro team claims sets it apart from its competition, so I encourage you to [read their docs on partial hydration here](https://docs.astro.build/en/core-concepts/component-hydration/). In summary, you can decide to have a singular component render as a client-side component while the rest of the page is delivered from the server as static HTML. This keeps the amount of JavaScript shipped to the client to a minimum, keeping the site as fast as possible.

## The Benefits of Astro

We've already covered some of the things that makes Astro attractive: performance, HTML-first, and the flexibility to render on the server- or client-side at the *component* level. Another aspect that I really liked is its highly-approachable syntax. If you're at all familiar with HTML and/or JSX, the learning curve for `.astro` syntax is almost flat. This is a valid `.astro` component:

```js
<div class="example-1">
  <h1>Hello, world!</h1>
</div>
```

If we want to make it more dynamic, we can employ the aforementioned JSX syntax plus the frontmatter scripting (i.e. the code inside the --- at the top of the file). Let's look at an example:

```js
---
const name = 'Casey';
---
<div class="example-1">
  <h1>Hello, {name}!</h1>
</div>
```

Those 6 lines are a completely valid `.astro` file and instantly readable by anyone who's worked on the frontend before. 

## The Downsides of Astro

The Astro promise is incredible and I'm excited to watch it grow in the web dev consciousness. However, there are still a number of drawbacks I ran into while building a small prototype. 

First, troubleshooting can be a bit of a pain. Usually when I'm having a problem in React, the solution is just a quick search away -- both with and without hooks. Trying to search my way out of a problem in Astro was nearly impossible. I'm not sure if this is because it's still new and has a small community, or if the syntax is *too* similar to other languages that it confused the search engine. Or perhaps it was a combination of both issues? Either way, I suspect this problem will go away as the framework grows in popularity, but it's definitely worth considering before adopting for production.

Additionally, working with dynamic paths takes some time to understand. In my prototype, I have a `books.astro` file and a `/books/[book].astro` file. The former maps to `/books` and the latter maps to `/books/fellowship-of-the-ring` (and so forth). Although this type of routing is intuitive -- routes mapping to file and folder names -- it can also be less flexible. I've also run into a problem where there are too many `index.astro` files if you're not being clever about it (which makes it difficult to quickly orient yourself). But where I continue to struggle is with `getStaticPaths()`. This function is meant to return an array so Astro knows what pages to generate. You can set it up manually like this, which will return two pages (e.g. at the routes `/book/1` and `/book/2`):

```
return [
  { params: { id: '1' } },
  { params: { id: '2' } }
];
```

Or you can tie it into an API and really ratchet up that dynamicness: 

```
const data = await fetch('...').then(response => response.json());
return data.map((post) => {
  return {
    params: { id: post.id },
    props: { post }
  };
});
```

What isn't immediately clear is that `id` in `params: { id: post.id }` needs to be the name of the file. So in the example of `/books/[book].astro`, the line would need to read more like this: `params: { book: post.id }`. It is mentioned in the docs, but it's also easily missed. This pattern is definitely something that takes hands-on practice and re-reading of the docs to properly internalize. You can [review the documentation for `getStaticPaths()` here](https://docs.astro.build/en/reference/api-reference/#getstaticpaths).

The rest of my issues were much more nitpicky. 

VS Code shortcuts need work. For example, if I'm working in the JS portion of the `.astro` file (i.e. the frontmatter script) and I want to quickly comment something out, the VS Code shortcut adds the wrong type of comment. It adds `<!-- HTML comment -->` instead of `// JS comment`. It should be noted that `<!-- HTML comment -->` is the correct comment when working in the HTML portion of the file, but we won't always be working in the HTML portion. [Jan 12 2022 Update: This seems to have resolved itself. I'm not sure if they put out a fix, or if I found an edge case that was causing this issue. Either way, the underlying point remains that Astro is still in its infancy.]

Lastly, the HTML that gets output during build time includes class names I didn't write, like `.astro-588s8`. This is not a huge deal, but it leaves a bad taste in my mouth. I hope this added HTML clutter gets removed in newer versions of Astro. [Jan 12 2022 Update: I've come to learn that these autogenerated class names are to manage the component-level styles. My concern remains valid though -- if I don't need these classes, I'd like them not to exist.]

## Astro vs Next & Gatsby

Before we compare Astro to its competitors, we should understand hydration. As an oversimplification, hydration takes static or server-rendered HTML and adds JavaScript to make it interactive. Consider a carousel. The HTML might just be an unordered list, but it requires JavaScript to move. Hydration is part of React itself, and you can [read more about `ReactDOM.hydrate()` here](https://reactjs.org/docs/react-dom.html#hydrate). How these frameworks handle hydration is one of the biggest differences between them.

As discussed above, Astro is capable of partial hydration which allows you to pair interactivity to a specific component and hydrate as that component comes into view. This means you only have download the JavaScript as you need it. Astro comes with a number of ways to handle this, including on page load and as the component enters the viewport. Consider our carousel example. Maybe you want to show your partners in a slider towards the bottom of the page. In Astro, the HTML comes over when the page loads, but we can easily set it to so that the JavaScript only gets downloaded and parsed as we scroll down the page as simply as including `client:visible` on the component.

[Next.js](https://nextjs.org/), however, requires entire page hydration. If any component on the page requires interactivity, you need you download all the JavaScript at page load. Although this is still an improvement over single page applications which require all of the JavaScript *for the entire app* up front, it is a step down from Astro's flexibility. Next may end up downloading more unnecessary JS at load time compared to Astro, dampening performance and time-to-interactivity. I suspect in practice this will make little noticeable difference for most projects, but if you're looking to be as performant as possible, every KB counts. Largely because of this architecture, the Astro developers suggests Next is more powerful for highly interactive applications like dashboards and inboxes, while Astro is better for highly static websites like content and eCommerce.

[Gatsby](https://www.gatsbyjs.com/) essentially ships two versions of your site: a static generated HTML site and a single page application. When you first visit a Gatsby site (generally speaking), you'll receive the static file that was created at build time. Once that HTML loads, you will download and parse the JavaScript, which then take the reins of the site. Although I'm sure there's some level of tree shaking involved to minimize how much JavaScript you're shipping at once, controlling when and where this JavaScript comes from is not as easy as it is with Astro's partial hydration.

One other key difference worth mentioning is the JavaScript framework that underpins Astro, Next, Gatsby. Next and Gatsby require you to use React. Astro, although heavily inspired by React, allows you to use whatever framework you prefer including React, Vue, and Svelte.

You can [read more about Astro vs various frameworks](https://docs.astro.build/en/comparing-astro-vs-other-tools/) in the Astro docs.

## Conclusion

Astro has a ton of potential. As development continues and more developers adopt it, I think it could really be a go-to solution for many sites and projects, *especially* content-heavy marketing sites. The fact that HTML is a first-class citizen in the Astro world is a huge draw for me. When building in Astro, one needs to manually opt in to JavaScript. As JavaScript continues to eat the world, a return to the basic simplicity of HTML is sorely needed. It can only make the web a more accessible and friendly platform. Although Next or Gatsby (or the recently released Remix) might be my pick for more dynamic sites, I hope Astro gets to a point soon where it will always be my first choice.