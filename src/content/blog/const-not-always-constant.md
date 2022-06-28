---
title: const is not always constant
slug: const-not-always-constant
date: "2019-08-02"
excerpt: "const is one of the new variable types introduced with ES6 to replace var and all of its eccentricities. The oddities of var, its problems, and why we needed to replace it are beyond the scope of this writing. Instead, I want to focus on the oddities of const. Don’t get me wrong, const is […]"
---

`const` is one of the new variable types introduced with ES6 to replace `var` and all of its eccentricities. The oddities of `var`, its problems, and _why_ we needed to replace it are beyond the scope of this writing. Instead, I want to focus on the oddities of `const`. Don't get me wrong, `const` is my go-to variable type, but there are some things that may trip up beginning JavaScript developers.

`const` is short for _constant_. Whenever you write a variable that doesn't need to change, you store it in a `const` variable. This is my default choice when declaring JavaScript variables; I only use `let` when absolutely necessary. I find it makes the code more understandable at first glance, and may catch unexpected issues before it's too late. Most discussions of `const` stop at immutability, but that's only a half-truth.

## Immutable Constants

With simple test cases, `const` definitely appears immutable.

```
const isMutable = false;
isMutable = !isMutable;
console.log(isMutable); //returns false
```

When assigning a boolean to a variable via `const`, it cannot be changed. In the example above, `isMutable` continues to be false, even though we tried to flip it to be true. Doing so, in fact, returns the following error: `Uncaught TypeError: Assigned to constant variable.`

```
const immutableString = 'Hahaha you cannot alter me.'
immutableString = immutableString.substring(2, 4);
console.log(immutableString); //returns 'Hahaha you cannot alter me.'
```

The `const` keyword also protects strings from being rewritten. In the above example, if you had used `let`, _ha_ would be returned to the console. Because of `const` though, immutableString remains what it was when it was first declared, and returns the same `Uncaught TypeError` we saw previously.

```
const money = 1200;
money = money * 3;
console.log(money); //returns 1200
```

I hope by now you're seeing a pattern and asking why I'm wasting time demonstrating what should be obvious. As you saw in the examples above, when you assign a number to a variable declared via `const`, you cannot update that variable.

If you only ever work with these primitive types, you may think anything declared with the `const` keyword is safe from being altered later in the code. That is _not_ true.

## Mutable Constants

More advanced types tell a different story. In the example below, we have a simple array.

```
const fruit = ["Apple", "Banana"]
fruit.push("Blueberry")
console.log(fruit) //returns ["Apple", "Banana", "Blueberry"]
```

Given the examples above, you might think the array should _not_ have been updated. `fruit` is supposed to be immutable, isn't it? We declared it as a constant. That's not what we see, though. We are still able to manipulate the array, even after declaring it with `const`.

```
const person = {
  name: 'Johnny',
  age: 5,
  isOnlyChild: true,
}
person.isOnlyChild = false;
console.log(person) //returns {name: 'Johnny', age: 5, isOnlyChild: false}
```

Objects behave similar to arrays: even when declared as a constant, you may update parts of that object later in the code.

## What's Happening?

What's actually happening here is that the `const` keyword creates a _reference_ to a value. When the value of that reference is immutable (as we saw with the boolean, string, and integer), it cannot be changed in any way. When the value of that reference is mutable (such as the array and object examples), the _contents_ may be changed, but the reference itself cannot.

Let's go back to the object example. We declared a person named Johnny, and then updated `isOnlyChild`. That's fine because we haven't changed the reference, only the contents inside the reference value. If instead we tried to change the person entirely, it would fail.

```
person = {
  name: 'Waylon',
  age: 21,
  isOnlyChild: false,
}
//returns Uncaught TypeError: Assigned to constant variable.
```

This may seem small and nit-picky, but is fundamental to understanding the language. Hopefully this has helped illuminate some of the darker parts of JavaScript. Happy coding!
