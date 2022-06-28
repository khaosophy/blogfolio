---
title: Redirect a Page in Gatsby
slug: gatsby-page-redirect
date: "2020-02-29"
excerpt: "I’ve written before about how this blog is deployed as a static site using Gatsby. Overall, it’s been a remarkable joy to work with. I get to use React for my architecture, Netlify for deployment, and WordPress to actually write the content. Each of these are well-loved by their users, and rightfully so, but this […]"
---

I've written before about how this blog is deployed as a static site using Gatsby. Overall, it's been a remarkable joy to work with. I get to use React for my architecture, Netlify for deployment, and WordPress to actually write the content. Each of these are well-loved by their users, and rightfully so, but this morning I encountered my first Gatsby headache. Redirecting a page in Gatsby to another page is not as easy as the docs describe (and apparently not well documented in other blogs).

## Problem

I have two _page_ components: index and blog (plus a 404 page of course), but blog and index are, at the time of this writing, the exact same page.

```
...
pages
| 404.js
| blog.js
| index.js
...
```

Instead of having duplicate markup and having to support essentially the same file twice, I figured the easiest course of action would just be to redirect `/blog` to `/`. Turns out it wasn't that easy!

## Solution

Before I get into all the things I tried that _didn't_ work, let me show you what _did_ work, since that's probably why you're here. Inside the page you want to redirect -- `blog.js` in my case -- all you need is the following code.

```
import { useEffect } from 'react';
import { navigate } from 'gatsby';

export default () => {
  useEffect(() => {
    navigate('/');
  }, []);
  return null;
};
```

If you don't want to redirect to the homepage, just change what you pass into `navigate()`.

Gatsby's `navigate` function ([documentation here](https://www.gatsbyjs.org/docs/gatsby-link/#how-to-use-the-navigate-helper-function)) is a way to programmatically navigate from page to page. It's works the same way the `Link` element does, but doesn't require interaction like a mouse click. React's `useEffect` function ([documentation here](https://reactjs.org/docs/hooks-effect.html)) is described as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined. Essentially, it lets you perform "effects" inside your React component. They're a new addition in React 16.8.

## Failed Attempts

There were several other methods I tried to use to solve this problem, each failing one way or the other. If anyone knows what I missed, I'd love to hear from you. You can reach out [on Twitter @SirCaseyJames](https://twitter.com/SirCaseyJames).

### The Gatsby Way

This is the one I'm most confused by. Gatsby has a built in action `createRedirect` ([documentation here](https://www.gatsbyjs.org/docs/actions/#createRedirect)). Inside your gatsby-node.js file, you can import `createRedirect` and pass in a `fromPath` and a `toPath`. After doing this and rebuilding my project, not only did it not work, it didn't even throw me any errors that I might've been able to follow up on.

```
const { createRedirect } = actions;

createRedirect({
  fromPath: '/blog',
  toPath: '/',
});
```

### The window.location Way

If you don't mind an infinite loop, this one technically does the job of redirecting from `/blog` to `/`. Unfortunately, it never stops redirecting to `/`. Part of the problem might be `window` and how it works in the Gatsby ecosystem.

```
if (typeof window !== 'undefined') window.location.replace('/');

export default function Blog() {
  return null;
}
```

### The Reach Router Way

Similar to window.location, this one works _partly_. It does successfully redirect from `/blog` to `/`, but then throws a fatal error. It complains that the page or route is undefined. This might be worth investigating further: `Uncaught RedirectRequest { uri: "/" }`. Does the Redirect component not like what was passed?

```
import React from 'react'
import { Redirect } from '@reach/router'

export default function Blog() {
  return <Redirect to="/" />
}
```

Anyway, hopefully this helps future developers looking for a similar solution!
