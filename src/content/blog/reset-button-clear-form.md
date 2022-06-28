---
title: The Reset Button Doesn’t Clear the Form
slug: reset-button-clear-form
date: "2019-08-26"
excerpt: "There are some things so fundamentally simple that they cannot be misunderstood, right? Everyone must surely grasp their self-evidence. Maybe there are some axioms like this, but it turns out the HTML reset button is not among them — or maybe I’m just not as smart as I like to think! For years, I thought […]"
---

There are some things so fundamentally simple that they cannot be misunderstood, right? Everyone must surely grasp their self-evidence. Maybe there are some axioms like this, but it turns out the HTML `reset` button is not among them -- or maybe I'm just not as smart as I like to think! For years, I thought the reset button _cleared_ a form so that all of its fields are emptied. Turns out, that's not quite correct. It _is_ as simple as I thought, but my underlying assumptions were incorrect. So let's take a closer look at this fundamental element.

Here's [how the reset button is described on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/reset):

> [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) elements of type **`"reset"`**  are rendered as buttons, with a default `[click](https://developer.mozilla.org/en-US/docs/Web/Events/click)` event handler that resets all of the inputs in the form to their initial values.

My misunderstanding came from the phrase _initial values_. For some reason, for the 7+ years I've been doing web development, I always understood _initial values_ to mean empty values. A form's initial state is nothing. I will come back to why I had that underpinning belief momentarily. But first, let's discuss the correct behavior.

## What Does The Reset Button _Really_ Do?

So for anyone like me who might be confused, let's clear it up: The reset button resets the form to the values that were there _on page load_. If the form loads empty, the reset button will return the form to empty. If, however, it loads with values already in place, the reset button will undo any changes you made after the page load.

Imagine you place an order on an eCommerce site. You choose to create an account so you can more easily checkout in the future. Chances are this website is going to save your name and address. Now you need to change your address. Somewhere on that website is a form that _loads_ with your saved information. If you change your saved address and hit the reset button, it will revert the field back to the address the page loaded (i.e. your previous saved address).

## Why Did I Think It Cleared The Form?

It's important to understand where our preconceived ideas come from so that we can better identify them in the future. This particular idea was a holdover from my early days as a developer where forms almost always started blank. Think of a contact form. How often does that _not_ start blank? If you add a reset button to a blank contact form, you're going to see the reset button _clear_ the fields. After doing this for many years, somewhere along the way I began to associate the reset button with clearing the form.

## What Else Can We Learn From This?

Do not fret about these types of misunderstandings! Everyone has blind spots. Part of the job of a developer is to learn, but that doesn't just mean learning new technologies. It also means we have to relearn some of the things we thought we already knew. Frankly, this is the best lesson: keep an open mind and challenge your assumptions. Learn from your mistakes.

I also learned the reset button is much more useful than I thought!
