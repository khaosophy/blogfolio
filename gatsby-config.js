const test = require('dotenv').config({path: 'variables.env'});
module.exports = {
  siteMetadata: {
    title: `Casey James Perno`,
    author: `Casey James Perno`,
    description: `Casey is a front end developer with a background in SEO and business management.`,
    siteUrl: `https://caseyjamesperno.com/`,
    social: {
      twitter: `sircaseyjames`,
    },
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `${process.env.ANALYTICS_ID}`,
      },
    },
    // `gatsby-plugin-feed`, //TODO: get RSS feed working
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: `${process.env.PROTOCOL}://${process.env.BASE_URL}/graphql`, // in 5.0, this is the only required field
      },
    },
  ],
}
