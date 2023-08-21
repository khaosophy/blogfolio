---
title: "Quantity Stepping in React"
date: "2020-02-04"
---

Part of business is to reduce expenses. At Party Rental Ltd., a major source of expense came from breaking up _sets_ of items. For example, wood folding chairs come in a bag of four. Glassware often came in racks of 12. When a customer orders 110 chairs for a party, the warehouse team has to open a bag, take two out, store them somewhere, and load the bag with the remaining chairs onto the truck. Multiply that out to the scale in which PRL does business, and it starts to add up.

Because of this, the directors asked me to architect a user experience that would make the switch to set-ordering as transparent and painless as possible for our customers. Below is the React prototype I used as a demo, to bring my wireframes to light.

<iframe id="cp_embed_WWqOzJ" src="//codepen.io/anon/embed/preview/WWqOzJ?height=NaN&amp;theme-id=1&amp;slug-hash=WWqOzJ&amp;default-tab=js,result" height="NaN" scrolling="no" frameborder="0" allowfullscreen allowpaymentrequest="" name="CodePen Embed WWqOzJ" title="CodePen Embed WWqOzJ" class="cp_embed_iframe" style="width:100%;overflow:hidden">CodePen Embed Fallback</iframe>

You can see some important features:

- Be upfront about the quantities that the item can be ordered in before they even interact with anything.
- Allow the user to type any quantity in, but if they try to add an invalid quantity, we throw an error and round up for them. This makes it easier for users who want a large quantity of something, instead of having to _click_ all the way.
- If a user hits up on the keyboard or clicks the plus icon, the quantity will increase _to_ the next valid step, not _by_ the next valid step. Same logic applies for decreasing the quantity. (For more details about this, see the comments at the top of the `increment()` function on line 8.)

The code above is mostly to showcase the React code that handles this important functionality, but I welcome discussion about the UX logic as well.

Note: if there is an issue running the pen, you can [find the CodePen here](https://codepen.io/xace90/pen/JjddyOj?editors=0010).
