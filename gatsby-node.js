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
      allWpPost {
        nodes {
          id
          slug
        }
      }
      allWpCodeSample {
        nodes {
          id
          slug
        }
      }
      allWpSpeakerSession {
        nodes {
          id
          slug
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  const BlogPosts = result.data.allWpPost.nodes;
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
      path: `/blog/${post.slug}`,
      component: SinglePostTemplate,
      context: {
        id: post.id,
      },
    });
  });

  const CodeSamples = result.data.allWpCodeSample.nodes;
  CodeSamples.forEach((sample) => {
    createPage({
      path: `/code-samples/${sample.slug}`,
      component: CodeSampleTemplate,
      context: {
        id: sample.id,
      }
    })
  })

  const SpeakerSessions = result.data.allWpSpeakerSession.nodes;
  SpeakerSessions.forEach((session) => {
    createPage({
      path: `/speaker-sessions/${session.slug}`,
      component: SpeakerSessionTemplate,
      context: {
        id: session.id,
      }
    })
  })
};
