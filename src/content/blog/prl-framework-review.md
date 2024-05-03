---
title: Reviewing Frontend Frameworks for use at Party Rental Ltd.
slug: prl-framework-review
date: 2023-07-31
excerpt: "Party Rental Ltd. is in the process of rearchitecting the website. As part of that process, we are reviewing several frontend frameworks to see which one best fits our needs. Which frameworks are worth investigating, and what aspects make them stand out?"
draft: true
---

I was brought back to <a href="https://www.partyrentalltd.com" target="_blank">Party Rental Ltd.</a> as a Frontend Architect to oversee a rearchitecting of the website. When we built the project the first time, it was a monolithic application with Java, Thymeleaf, jQuery, and React all strung together often in ugly and confusing ways. In order to get it out the door, we borrowed heavily against our future selves, and it was time to pay the piper. We needed to pay down that technical debt. 

We are in the process now of decoupling the frontend and the backend so they can communicate over RESTful APIs. This should make both areas cleaner, easier to test, more maintainable, and more agile, allowing for more rapid development with fewer issues. Part of this involves building the frontend from the ground up -- instead of using Java-based Thymeleaf templates with jQuery and React thrown on top of it, we can build something that better reflects the modern frontend landscape, with all of the quality of life improvements that come with it.

As anyone following the frontend world knows though, there are *dozens* of frontend frameworks worth investigating. I wanted to make sure we chose the right one for our needs, so I set out to review the most popular ones. I wanted to see how they handled the following:

* **Routing** - Is the routing page-based or more configurable?
* **State Management** - How do they handle application state and how easy is it to use?
* **Static Page Generation** - Can they generate static pages for SEO and performance?
* **Hydration** - How do they handle hydration? Can parts of a page be hydrated independently?
* **Syntax** - Is the syntax familiar and approachable, or is there a learning curve?
* **Community** - Is there a large community around the framework? Is it active?

## Frameworks We'll be Exploring

I narrowed the list down to four frameworks that I think are worth exploring:

* **React** <a href="https://react.dev/" target="_blank">(react.dev)</a> - The most popular frontend framework in the world, React is a component-based framework that uses JSX to render components. It is maintained by Facebook and has a huge community.
* **Next.js** <a href="https://nextjs.org/" target="_blank">(nextjs.org)</a> - A React-based metaframework that adds page-based routing and static page generation to React. It is maintained by Vercel, a hosting company, and has a large community.
* **Astro** <a href="https://astro.build/" target="_blank">(astro.build)</a> - A framework that uses a component-based approach and compiles to static HTML, CSS, and JavaScript, and has low-level hydration controls. It is an open-source project mantained by a growing volunteer community.
* **Svelte** <a href="https://svelte.dev/" target="_blank">(svelte.dev)</a> - A component-based framework that compiles to efficient JavaScript to surgically update the DOM. This framework is not very React-like, but is so widely loved its worth checking out. It is an open-source project maintained by a volunteer community.

Of course there are a dozen others that are worth checking out including Vue (or it's metaframework Nuxt) and Angular, and lesser known upstarts like Solid, Qwik, and Remix. But I think these four are the best places to start.

In the coming weeks I will dive deeper into these four frameworks and see how they handle the above criteria. I will also build a small application with each of them to get a feel for how they work. I will then make a recommendation for which framework we should use at Party Rental Ltd. and why. Stay tuned!