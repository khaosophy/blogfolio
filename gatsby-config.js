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
        url: 'http://wp.khaosophy.com/graphql',
        baseUrl: `${process.env.BASE_URL}`,
        protocol: `${process.env.PROTOCOL}`,
        hostingWPCOM: false,
        useACF: true,
        acfOptionPageIds: [],
        auth: {
          htaccess_user: `${process.env.HTACCESS_USER}`,
          htaccess_pass: `${process.env.HTACCESS_PASS}`,
          htaccess_sendImmediately: true,
        },
        verboseOutput: false,
        perPage: 100,
        concurrentRequests: 10,
        includedRoutes: [
          "**/categories",
          "**/posts",
          "**/pages",
          "**/media",
          "**/tags",
          "**/taxonomies",
          "**/code-samples",
          "**/speaker-sessions",
        ],
        excludedRoutes: [],
        normalizer: function({ entities }) {
          return entities
        },
      },
    },
  ],
}
