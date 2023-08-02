---
title: Reviewing React for Use at Party Rental Ltd.
slug: prl-react-review
date: 2023-08-02
excerpt: "In the process of rearchitecting the website at Party Rental Ltd., we are reviewing several frontend frameworks to see which one best fits our needs. In this post, we'll take a look at React without any metaframeworks."
draft: true
---

In the process of rearchitecting the website at <a href="https://www.partyrentalltd.com" target="_blank">Party Rental Ltd.</a>, we are reviewing several frontend frameworks to see which one best fits our needs. In this post, we'll take a look at React without any metaframeworks. We'll take a look at its future-friendliness based on developer trends and the size of its community. We'll also look at its performance, and aspects of the developer experience like routing and state management.

## Overview

React is a JavaScript framework for building single-page applications (SPAs) written by Facebook/Meta. It focuses on components, which are reusable pieces of UI that can be used together to build a full application. It is consistently one of the most popular frameworks in the JavaScript ecosystem and is used by many large companies, including Netflix and Airbnb. It also consistently ranks highly in <a href="https://2022.stateofjs.com/en-US/libraries/front-end-frameworks/#front_end_frameworks_experience_linechart" target="_blank">developer satisfaction surveys</a>.

## Community

With a staggering twenty million downloads per week, React is leagues away from its closest competitors in terms of popularity. It has a dedicated team of developers from Facebook/Meta and Vercel working on the code base full time, and a large community of developers contributing to the project. At the time of writing, there are almost 400 PRs in <a href="https://github.com/facebook/react" target="_blank">the GitHub repository</a> with over 1,000 contributors. The React community is also very active on <a href="https://stackoverflow.com/questions/tagged/reactjs" target="_blank">Stack Overflow</a>, with half a million questions tagged with `reactjs`.

**Score: 5/5**

## Syntax

You write components in React using JSX, an HTML-like syntax that is intuitive and easy to learn for most frontend developers. It also allows for the use of JavaScript expressions inside the component syntax, which makes it very powerful. For example, you can use a ternary operator to conditionally render parts of a component, or use a variable to set the value of an attribute like `className` or `style`:

```jsx
const Component = ({ condition, backgroundColor }) => {
  return (
    <div style={{ backgroundColor }}>
      {condition ? <p>True</p> : <p>False</p>}
    </div>
  );
};
```

As I mentioned in [the introduction article](/blog/prl-framework-review), one of the criteria we are looking for is React-like (or really, JSX-like) syntax. React is the framework that popularized JSX, so it should come as no surprise it scores well in this category. That said, it loses a point for some clumsy or overly verbose syntax. For example, if you need multiple `useEffect` hooks in a single component, it can get a bit messy:

```jsx
const Component = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // do something
  }, []);

  useEffect(() => {
    // do something else
  }, [state]);

  return <div>Component</div>;
};
```

**Score: 4/5**

## Routing

There is no built-in routing mechanic in React, so you have to use a third-party library. The most popular one is <a href="https://reactrouter.com/" target="_blank">React Router</a> It allows you to define routes using a declarative syntax, and provides a number of different ways to render components based on the current route. It also provides a number of hooks that allow you to access the current route and navigate to a new one. It is a very well-designed library that is easy to use and has a great developer experience.

```jsx
const App = () => {
  return (
    <Routes>
       <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
    </Routes>
  );
};
```

I *would* take points off for the fact that routing is not built into React, but the fact that React Router is so well-designed and easy to use makes up for it. It also means that routing can by highly flexible and customizable, which is a plus. Frameworks that tie routing to the file structure do not have this ease of flexibility.

**Score: 5/5**

## State Management

## Performance

## Conclusion
