const path = require('path');
// const { createFilePath } = require(`gatsby-source-filesystem`)
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const SinglePostTemplate = path.resolve('./src/templates/SinglePost.jsx');
  const result = await graphql(`
    {
      allWordpressPost {
        edges {
          node {
            slug
            wordpress_id
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }
  const BlogPosts = result.data.allWordpressPost.edges;
  BlogPosts.forEach((post) => {
    createPage({
      path: `/blog/${post.node.slug}`,
      component: SinglePostTemplate,
      context: {
        id: post.node.wordpress_id,
      },
    });
  });
};
