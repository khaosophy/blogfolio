---
title: "Google Maps and the Directions API"
date: "2019-11-13"
---

eCommerce has exploded in the last decade, and companies need to lean into it our get out of the way. Party Rental Ltd., a party rental company that rents things like tables, chairs, and linens, leaned into it heavily. Not only were they the first in the industry to allow orders completely online, but they incorporated a popular "next stop notification" feature.

This next stop notification allowed customers to sign up for emails or text messages that would alert them when they were scheduled next for a pick up or drop off. The alert would contain a link to a page with details _about_ their pick up / drop off but, most notably, it would contain a map with two points. One point would be the destination location, and another would indicate where the truck was last recorded (the location is supposed to update every 5 minutes or so).

<iframe id="cp_embed_JjddyOj" src="//codepen.io/anon/embed/preview/JjddyOj?height=450&amp;theme-id=1&amp;slug-hash=JjddyOj&amp;default-tab=js,result" height="450" scrolling="no" frameborder="0" allowfullscreen allowpaymentrequest="" name="CodePen Embed JjddyOj" title="CodePen Embed JjddyOj" class="cp_embed_iframe" style="width:100%;overflow:hidden">CodePen Embed Fallback</iframe>

Although the live version of this page did not contain the route information (i.e. how to get from point A to point B) for various business reasons, they always hoped to add it in eventually -- and why not? So I took the liberty of including it in this code sample.

Note: if there is an issue running the pen, you can [find the CodePen here](https://codepen.io/xace90/pen/JjddyOj?editors=0010).
