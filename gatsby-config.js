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
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/content/blog`,
    //     name: `blog`,
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/content/assets`,
    //     name: `assets`,
    //   },
    // },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    // `gatsby-plugin-feed`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Gatsby Starter Blog`,
    //     short_name: `GatsbyJS`,
    //     start_url: `/`,
    //     background_color: `#ffffff`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `content/assets/gatsby-icon.png`,
    //   },
    // },
    `gatsby-plugin-offline`,
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
        baseUrl: `${process.env.BASE_URL}`,
        protocol: `${process.env.PROTOCOL}`,
        hostingWPCOM: false,
        useACF: false,
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
          "**/users",
        ],
        excludedRoutes: [],
        normalizer: function({ entities }) {
          return entities
        },
      },
    },
  ],
}
