# Blogfolio
My personal website for blogging, code samples, and portfolio projects. Currently the frontend of site is built using [Astro](https://astro.build/). The backend uses WordPress. They communicate to each other using the WordPress REST API. 

There is also a `gatsby` folder in this repository. That holds the _old_ code for the Blogfolio. It was deprecated for two reasons: 1) Gatsby had changed and the existing Blogfolio no longer worked as is. 2) I was looking for something more HTML-first than Gatsby, which I found in Astro. 

## Getting Set Up on a New Environment

To set this repo up on a new machine, follow the simple steps below:

1. Clone this repo to your local machine.
1. Navigate into the `astro` folder and type `npm install` which will install all the app's dependent components.
1. When finished, run `npm run dev` to see your local changes in the browser. You can see it at `localhost:3000`.
1. Push your changes to the repo. This will automatically trigger a rebuild on Netlify.

## Colors

Check out [this color palette](https://paletton.com/#uid=63v0u0k++JguxZLP++V+WtF+9ng) when you are ready to expand the design.