---
title: Increase Resilience with Must-Use Plugins
slug: must-use-plugins
date: 2020-12-16
excerpt: "Plugins and themes are the life-blood of WordPress. There are thousands of quality themes and plugins available in the WordPress repository for free, and even more out there on various marketplaces for extraordinarily low prices. Millions of people have made great websites using these tools and little else, and it is undoubtedly the reason for […]"
---

Plugins and themes are the life-blood of WordPress. There are thousands of quality themes and plugins available in the WordPress repository for free, and even more out there on various marketplaces for extraordinarily low prices. Millions of people have made great websites using these tools and little else, and it is undoubtedly the reason for the platform's widespread adoption. This convenience comes with a cost though. Loading up a site with dozens of unvetted plugins can cripple a site's performance or lead to security vulnerabilities. The topic of this post though is _site stability_, or _resilience_. When you build a website entirely from public themes and plugins, it can end up more fragile. Let's take a look at the problem, and how we can address it using my favorite underrated feature of WordPress: Must-Use Plugins.

## What Can Go Wrong?

Let's say you're building out a website with several custom post types (and why not? custom post types are great!). You install [Custom Post Type UI](https://wordpress.org/plugins/custom-post-type-ui/) to create and manage these new post types right in the admin -- no need to touch code. You realize you need some special fields for these new post types, so you go ahead and install [Advanced Custom Fields](https://www.advancedcustomfields.com/) too. After you set up all these new areas and fields, you're ready to start populating them with content!

Let's say you're running a review website where you review a wide array of topics, including video games, movies, books, etc. Each of these topics is a separate post type (you could do it with categories too, but I find that method more cumbersome) that you defined through the Custom Post Type UI plugin. Each topic requires different custom fields that you define in Advanced Custom Fields (ACF for short), such as author, date published, genre, etc.

Lets say that you invite other people to contribute to this site. Unfortunately, one of your contributors accidentally disables Custom Post Type UI! While this plugin is deactivated, no one is able to access your content! What happens if this same user, or even a malicious user, _deletes_ the plugin? Some plugins will remove **all** of its associated data when it gets deleted. That means all of your posts would be permanently gone! (Hopefully you're backing up your data.)

Thankfully neither plugin does this. As of this writing, both Advanced Custom Fields _and_ Custom Post Type UI leave your data intact when deleted. But that doesn't mean they never will. Nor does it mean other, similar plugins are safe. We are trusting our website to various third parties -- whether that be in the form of plugin makers, admin users, or our clients -- and increasing our resilience is important.

## Must-Use Plugins

So how do we prevent unintentional deactivation or deletion, especially of critical plugins? We can move these plugins into the mu-plugin directory. The files in this directory are always on and cannot be deactivated or deleted except by someone with server access.

<figure>
  <img src="/images/muplugins-onsite-cpt.png" alt="">
  <figcaption>This blog has two must-use plugins currently installed, responsible for its custom post types.</figcaption>
</figure>

Instead of relying on the aforementioned Custom Post Type UI, I tend to create my own custom post types in the code. I've seen people often do this in the functions.php file of the active theme (hopefully a child theme!), but this maps the post types to that specific theme. Wouldn't it be better to decouple them, so that you retain the post types if you change themes?

<figure>
  <img src="/images/muplugin-directory.png" alt="">
  <figcaption>The mu-plugin directory should be in the same folder as plugins and themes.</figcaption>
</figure>

It's very easy to create a mu-plugin too. On the server, create a new folder in the same directory as the plugin folder called `mu-plugins` (if you don't already have one). Then create a new php file for the functionality you want. On this blog, I have two mu-plugins that handle my two custom post types. Because mu-plugins cannot be deactivated from the WordPress admin, and because I hardcoded the post types, I'm not worried about resiliency.

If you want to learn how to hard code your own custom post types in the same way, check out [the `register_post_type` documentation](https://developer.wordpress.org/reference/functions/register_post_type/).

What if you want to use a more complex plugin, like the aforementioned Advanced Custom Fields, which has dozens of files inside a folder? If you are going to do this using must-use plugins, you have to create a loader file. Move the plugin you want to use into this `mu-plugin` directory, and create a php file. You can call it whatever you like, but I would do something like `loader.php`. Inside this file, you set up a map to any plugin you'd like.

```
<?php
require WPMU_PLUGIN_DIR.'/my-plugin/my-plugin.php';
require WPMU_PLUGIN_DIR.'/diff-plugin/diff-plugin.php';
```

Now WordPress will read `mu-plugins/loader.php` and recognize any plugin you tell it too.

### Other Boons

A must-use plugin cannot be turned off or deleted, reducing the chance of accidental catastrophic failure, but it also has a few other advantages. These types of plugins also cannot be edited through the WordPress Admin. That means if a malicious actor gains access to your admin section, they can't (easily) insert malicious code into the plugin! This is a nice-to-have, but you should still be locking down your admin section, which [you can read about here](https://caseyjamesperno.com/blog/how-to-secure-the-wordpress-admin). Additionally, it's easier to manage mu-plugins through something like Git.

### Major Drawbacks

Moving critical plugins to the mu-plugin directory has advantages, but there are also some major drawbacks. The biggest of which is the lack of auto-updates. You cannot update must-use plugins through the WordPress admin. You have to do it manually: download the newer version of the plugin, and upload it to that folder via the server. This can result in a delay of features, security vulnerabilities, or -- if you're still updating WordPress regularly -- the possibility of your must-use plugins becoming incompatible with your WordPress core. You should still update your mu-plugins regularly to prevent the above issues, but it is a much more laborious process.

## Conclusion

Like everything in software, there are always trade offs. Rarely is one choice objectively and completely better than another. On one hand, must-use plugins can provide stability and resiliency to your website, preventing pivotal features from being turned off. On the other hand, it becomes more laborious to install and update your important plugins. Hopefully you now understand the options available to you, and can make an informed decision that is right for you and your website.