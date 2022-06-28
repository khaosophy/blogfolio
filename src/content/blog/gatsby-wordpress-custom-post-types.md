---
title: WordPress Custom Post Types in Gatsby
slug: gatsby-wordpress-custom-post-types
date: "2020-04-09"
excerpt: "This blog is built as a static site generated with Gatsby, using WordPress to manage the content. Overall, I’m a big fan of both technologies but I have hit a few points of frustration. This isn’t a problem with the architecture, but rather a problem stemming from its novelty. Gatsby + WordPress is new, and […]"
---

At the time of writing, this blog was built as a static site generated with Gatsby, using WordPress to manage the content. Overall, I'm a big fan of both technologies but I have hit a few points of frustration. This isn't a problem with the architecture, but rather a problem stemming from its novelty. Gatsby + WordPress is new, and there aren't many established resources to consult. To that end, I'm documenting the challenges I encounter and sharing the solutions. Today, let's take a look at getting a WordPress Custom Post Type to show up in our Gatsby's GraphQL queries.

To connect WordPress and Gatsby, you'll need the Gatsby plugin called [gatsby-source-wordpress](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/). Right at the top of this plugin's documentation it says it supports Custom Post Types, but my custom post was not showing in my GraphQL. So let's go through what might have gone wrong.

## Is WordPress Configured Correctly?

When declaring a Custom Post Type in WordPress, there is an option to enable or disable it from the REST API. If it is not enabled, it won't get its own endpoint and the GraphQL will have nothing to query.

If you're using the Custom Post Type WordPress plugin, there's a checkbox to enable in REST. If you're like me and using code to define the post type, you'll need make sure the `show_in_rest` argument is set to true.

```
function cjp_code_sample_post_type(){
  $labels = array(
    'name'               => __( 'Code Samples', 'cjp_blogfolio' ),
    'singular_name'      => __( 'Code Sample', 'cjp_blogfolio' ),
  );
	
  $args = array(
    'labels'             => $labels,
    'show_in_rest'	 => true,
    'rest_base'          => 'code-samples',
  );
	
  register_post_type( 'cjp_code_sample', $args );
}
add_action('init', 'cjp_code_sample_post_type');
```

You might also want to rewrite the post type's endpoint with `rest_base`, as I did in the example above. If you do not rewrite it here, it will use the name of the post type. In the example above, the endpoint would be `cjp_code_sample` instead of `code-samples`.

You can check to see if this is working by visiting `yoursite.com/wp-json/wp/v2/code-samples` (replacing _code-samples_ with whatever your endpoint is). If this endpoint is working correctly -- and you'll know if it is ---but you're still not seeing it in your GraphQL, it's time to check out the other side of things.

## Is Gatsby Excluding Your Endpoint?

This is what got me. In `gatsby_config.js`, under the configurations for `gatsby-source-wordpress`, there may be an option called `includedRoutes`. Mine looked like this:

```
includedRoutes: [
  "**/categories",
  "**/posts",
  "**/pages",
  "**/media",
  "**/tags",
  "**/taxonomies",
  "**/users",
],
```

No matter what I did on the WordPress side of things, my GraphQL was never going to find anything outside of those routes. We have two options to fix this: We can either include the new route we created and tested above, or exclude this whole option. I'm going to include the new route on this list (and hopefully remember this step next time!).

```
includedRoutes: [
  "**/categories",
  "**/posts",
  "**/pages",
  "**/media",
  "**/tags",
  "**/taxonomies",
  "**/users",
  "**/code-samples"
],
```

And that should be it! Now I have access to my Custom Post Type! Now all I need to do is actually display that data.

If this didn't solve your problem, or if you have any questions, feel free to reach out to me [on Twitter @SirCaseyJames](https://twitter.com/SirCaseyJames). And happy coding!
