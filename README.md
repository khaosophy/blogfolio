# blogfolio
My personal website for blogging, code samples, and portfolio projects

## Setting Workflow on a New Environment

To set this Repo up on a new machine, follow the simple steps below:

* Check to see if your machine has Gatsby installed. If it does not, run `npm install -g gatsby`.
* Clone this repo to your local machine.
* In your local directory, type `npm install` which will install all the app's dependent components.
* There are some environmental variables needed to run this app. You can get them from Netlify -> Deploy Settings -> Environment. 
* When finished, run `gatsby develop` to see your changes locally in the browser. You can see it at `localhost:8000`.
* `gatsby build` will make sure you're ready to deploy (I recommend running this to make sure it doesn't fail in a future step).
* Push our your changes to the repo, which will automatically trigger a rebuild on Netlify.
