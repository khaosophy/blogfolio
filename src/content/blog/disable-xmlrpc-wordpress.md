---
title: Should I Disable XML-RPC in WordPress?
slug: disable-xmlrpc-wordpress
date: 2020-08-22
excerpt: "I recently gave a talk on WordPress security at a Women in WordPress meetup and while preparing my slides, I realized I was disabling XML-RPC in WordPress without ever really understanding why. This was a learned behavior I picked up many years ago and never stopped to question. That ends now! In this post we’re […]"
---

I recently gave a talk on WordPress security at a Women in WordPress meetup and while preparing my slides, I realized I was disabling XML-RPC in WordPress without ever really understanding why. This was a learned behavior I picked up many years ago and never stopped to question. That ends now! In this post we're going to learn about XML-RPC and decide if we should disable it completely on our WordPress website.

## What is XML-RPC?

RPC stands for remote procedure call. Like it sounds, it lets applications run functions remotely. Before REST dominated the API landscape, RPC allowed applications to communicate and pass data from one to another.

XML is a markup language that is often used to pass data around. In this sense, it's similar to JSON.

When you put it together, XML-RPC allows different applications to communicate with each other by passing around XML. If this sounds familiar, it's probably because you've worked with the WordPress REST API, which passes JSON around instead of XML via REST calls instead of RPC.

Now that we have a better idea of what XML-RPC means, we can see the threat it poses. _It is a door through which malicious entities can access our website._ If we are not using it, we should disable it.

## How to Disable XML-RPC

Thankfully WordPress has a number of security plugins that can do this for us with just the click of a few buttons. The plugin I generally use is [All In One WP Security & Firewall](https://wordpress.org/plugins/all-in-one-wp-security-and-firewall/), but there are a dozen options out there. For the sake of this walk-through, I'm going to use the aforementioned plugin, but some other options include [Wordfence](https://wordpress.org/plugins/wordfence-login-security/) and [Jetpack](https://wordpress.org/plugins/jetpack/).

![](/images/wpSecurity-xmlrpc-1024x398.png)

The XML-RPC options inside All in One WP Security & Firewall 

Once you install the plugin, you'll see WP Security appear in the admin's sidebar navigation. Navigate to WP Security -> Firewall. Here you'll see a section called WordPress XML-RPC & Pingback Vulnerability Protection.

There are two checkboxes though! One disables XML-RPC completely, and one only disables the pingback functionality. The reason for this is because there are several valid reasons to use XML-RPC, including the iOS WordPress app. Some Jetpack features also require it. If you're using something that requires XML-RPC, then the least you should do is disable the pingback. Otherwise, block it completely.

## Why Don't We Disable the REST API?

Some of you might be thinking, "hey, if XML-RPC is a possible attack vector, then wouldn't the new REST API also be an attack vector?" The answer is yes. Yes, the REST API is another possible attack vector, but that doesn't mean we should disable it. XML-RPC is a vestige of the old web and not much utilized anymore, but the WordPress REST API is the future. Several fundamental plugins _and_ WordPress core depend on the REST API to work properly. Disabling it might break huge chunks of your WordPress functionality.

## To Sum Up...

If you're not using a plugin that requires XML-RPC -- and they are becoming more rare every day -- block it completely. If you're are, still consider blocking pingback. WordPress is a great platform, but one with dozens of attack vectors. Let's minimize our risks wherever possible.

If you're interested in learning more about protecting your WordPress site, [I've written more on](https://caseyjamesperno.com/blog/how-to-secure-the-wordpress-admin) [the subject previously](https://caseyjamesperno.com/blog/how-to-secure-the-wordpress-admin).
