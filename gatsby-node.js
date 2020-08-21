const path = require('path');
// const { createFilePath } = require(`gatsby-source-filesystem`)
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const SinglePostTemplate = path.resolve('./src/templates/SinglePost.jsx');
  const CodeSampleTemplate = path.resolve('./src/templates/CodeSample.jsx');
  const SpeakerSessionTemplate = path.resolve('./src/templates/SpeakerSession.jsx');
  const BlogListTemplate = path.resolve('./src/templates/BlogList.jsx');
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
      allWordpressWpCodeSamples {
        edges {
          node {
            slug
            wordpress_id
          }
        }
      }
      allWordpressWpSpeakerSessions {
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
  const postsPerPage = 5;
  const numPages = Math.ceil(BlogPosts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((page, i) => {
    createPage({
      path: i === 0 ? '/' : `/blog/${i + 1}`,
      component: BlogListTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      }
    })
  })


  BlogPosts.forEach((post) => {
    createPage({
      path: `/blog/${post.node.slug}`,
      component: SinglePostTemplate,
      context: {
        id: post.node.wordpress_id,
      },
    });
  });

  const CodeSamples = result.data.allWordpressWpCodeSamples.edges;
  CodeSamples.forEach((sample) => {
    createPage({
      path: `/code-samples/${sample.node.slug}`,
      component: CodeSampleTemplate,
      context: {
        id: sample.node.wordpress_id,
      }
    })
  })

  const SpeakerSessions = result.data.allWordpressWpSpeakerSessions.edges;
  SpeakerSessions.forEach((session) => {
    createPage({
      path: `/speaker-sessions/${session.node.slug}`,
      component: SpeakerSessionTemplate,
      context: {
        id: session.node.wordpress_id,
      }
    })
  })
};
