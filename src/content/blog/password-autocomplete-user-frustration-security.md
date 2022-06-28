---
title: "Password Autocomplete: How Developers Can Reduce Frustration and Increase Security"
slug: password-autocomplete-user-frustration-security
date: "2019-07-12"
excerpt: "Password managers are generally considered an improvement for online personal security. Your passwords being saved in one location may not seem secure, and it definitely comes with its own pitfalls, but a much greater threat to your online security comes from re-using or using simple/common passwords. Having the ability to create a different password for […]"
---

Password managers are generally considered an improvement for online personal security. Your passwords being saved in one location may not _seem_ secure, and it definitely comes with its own pitfalls, but a much greater threat to your online security comes from re-using or using simple/common passwords. Having the ability to create a different password for every site, and not having to worry that you'll _remember_ each one, makes you safer.

But this also increases the burden on front end developers. In order for password managers to know which fields to save, the software either has to _guess_ which fields to save or the HTML markup needs to specify. It's true that password manager software is fairly intelligent and guesses correctly more often than not, but software is always going to do better when it receives a clear set of instructions.

## Password Managers Will Try Their Best

Let's take a look at what might happen when a password manager is left to its own devices. Take a look at this login form:

```
<form action="/api/login" method="POST">
  <input type="email"  id="username" name="username" />
  <input type="password" id="password" name="password" />
  <input type="submit" value="Log in"/>
</form>
```

There is one password field and an email field, which we're using as a username in this example. Most password managers will handle themselves well in this situation: they will correctly infer from the _type_ that the email field is the username and that the password field is the password.

But now imagine a situation where a user is trying to set a new password. Take a look at this form below:

```
<form action="/api/change-password" method="POST">
  <input type="email" id="username" name="username" />
  <input type="password" id="password" name="password" />
  <input type="password" id="new-password" name="new-password />
  <input type="submit" value="Change Password" />
</form>
```

Now we have two inputs of type password. Which one is a password manager going to choose to ask you to save, and which one is it going to pre-populate? Maybe in this particular case, it will look at the id or name and choose correctly based on "new-password," but that's assuming a lot -- including that the markup is going to be as nice, neat, and clear as it is in this hypothetical example. It'd be nice if we could _specify_ which one to choose.

## Can We Help Password Managers Be More Accurate?

Enter the HTML `autocomplete` attribute. To provide some sort of clarity to password managers, you can apply `autocomplete` to any `input`, `textarea`, or `select` element. It accepts a variety of values, all of which can be [found on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete). What I want to highlight in this post are the two different _password_ values. Let's look at our change password form after we add some autocomplete information:

```
<form action="/api/change-password" method="POST">
  <input type="email" id="username" name="username" autocomplete="username" />
  <input type="password" id="password" name="password" autocomplete="current-password" />
  <input type="password" id="new-password" name="new-password" autocomplete="new-password"/>
  <input type="submit" value="Change Password" />
</form>
```

Notice the two different password values: `current-password` and `new-password`. We're being explicit about the type of information we're handling, and this is going to be a boon to any user relying on a password manager. The new password field is _not_ going to pre-populate with a useless existing password that users will have to manually remove. The password manager is _not_ going to accidentally save the wrong information. And, depending on the software, it may prompt users to generate an auto password (or at the very least, display the strength of the new password they manually chose).

Password managers may be a mixed bag, but they are generally an improvement. We should all be pushing people toward using one instead of re-using the same easy-to-hack password for every site. As more and more people rely on this kind software, adding these `autocomplete` attributes to our forms will help save users a lot of time and frustration. The most valuable of all autocomplete values though, and one that may not be obvious at first, is `current-password` and `new-password`.
