---
title: Sorting an Astro Glob
slug: sort-astro-glob
date: "2022-07-01"
excerpt: "Astro is a framework that let's you bring your own framework, but when this blog was rebuilt to use Markdown, I ran into an expected hiccup: the content was not being returned in date order like it was from WordPress. How can we sort the blog posts by date order?"
---

Astro is a framework that lets you bring your *own* framework and ship your site as static (or semi-static) html. It's a great product that's almost out of beta. You can [read more information in my Astro review](/blog/astro-review). Today we're going to look at a brief hiccup I had when trying to pull in Markdown content for a blog, especially when moving off WordPress: namely, sorting. WordPress returns all their posts already sorted by date, so the latest post is at the front of the returned array. Astro doesn't do that out of the box (how can it?). But once I realized why my posts were out of order, it was easy enough to fix it by sorting the array by date. Let's take a look.

## Getting the Content

First, let's take a look at how I'm getting the Markdown content:

```
const posts = await Astro.glob('../content/blog/**/*.md');
```

In my `src` folder (next to components and pages), I have a content folder that stores all my site's content, including blog posts, code samples, etc. We can get that content via `Astro.glob()`. The glob will return an array based on the markdown files in the specified location. On my machine at least, this returned them in alphabetical order based on the name of the markdown file. But in a blog, you typically want to display them in order of most recently written. 

## Sorting the Content

Once we have the array returned from `Astro.glob()`, it's easy enough to sort by date *assuming* you have a date property specified in the markdown's frontmatter. Here is a typical frontmatter for one of my blog posts:

```
title: Sorting an Astro Glob
slug: sort-astro-glob
date: "2022-07-01"
excerpt: "Astro is a framework that let's you bring your own framework, but when this blog was rebuilt to use Markdown, I ran into an expected hiccup: the content was not being returned in date order like it was from WordPress. How can we sort the blog posts by date order?"
```

If you're not familiar with frontmatter, you can [read more about frontmatter in Astro here](https://docs.astro.build/en/core-concepts/astro-components/#the-component-script).

Since `Astro.glob()` returns an array, all you have to do is call `.sort()` in that array and sort it by whatever data you want: in our case, date.

```
const posts = await Astro.glob('../content/blog/**/*.md');
posts.sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date));
```

Now `posts` contains all of the content from our `/content/blog` folder, sorted by its published date. 

### A Note on Sorting

Sorting arrays is pretty interesting, and not always intuitive. Take the following code:

```
const array = [80, 9, 22, 3];
array.sort();
```

You would expect this to return `[3, 9, 22, 80]` or `[80, 22, 9, 3]`, but in JavaScript it returns `[22, 3, 80, 9]`. This is because `.sort()` without a `compareFunction` stringifies the values and then sorts them as a string. In order to sort this number array successfully, you need to do the following:

```
const array = [80, 9, 22, 3];
array.sort((a, b) => a - b);
```

This correctly returns `[3, 9, 22, 80]`. If you wanted a descending sort to get `[80, 22, 9, 3]`, you'd need to flip `a - b` to `b - a`. You can [read more about sorting on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#description).

However, we're not working with simple numeric arrays, we're working with an array of objects. So instead of just doing `a - b`, we need to pick the value we want to sort: `a.date - b.date`, for example. To complicate things further, we're storing the date as a string, so we need to get a numeric representation of that date. Hence, `Date.parse(a.date)`, which transforms the date like "2022-07-01" to the number of milliseconds since January 1, 1970. You can [read more about Date.parse() on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse).

## Conclusion

This is a tiny thing that really didn't cause me any headaches in the long run, but it's something I didn't think about when migrating from WordPress to Markdown. It's also something I couldn't find any information about via the Internet, and figured it was worth writing up to help anyone who comes after me. It makes sense that Astro is not auto-sorting via `Astro.glob()`, and since it returns an array, it's easy enough to sort ourselves. The big downside is how much you have to drill to get to it (`post.frontmatter.date`). If `glob` could come with its own sort parameter, that might be a nice improvement. Otherwise, I hope this review of array sorting was helpful!