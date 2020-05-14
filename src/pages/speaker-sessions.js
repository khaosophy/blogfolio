import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Excerpt from '../components/Excerpt';

class SpeakerSessions extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allWordpressWpSpeakerSessions.edges;
    return (
      <Layout>
        <SEO title="Code Samples" />
        {posts.map(({ node }) => {
          const { title, slug, date, wordpress_id, excerpt } = node
          return (
            <Excerpt
              key={wordpress_id}
              title={title}
              url={`/speaker-sessions/${slug}`}
              date={date}
            >
              {excerpt}
            </Excerpt>
          )
        })}
      </Layout>
    )
  }
}

export default SpeakerSessions;

export const query = graphql`
  query {
    allWordpressWpSpeakerSessions {
      edges {
        node {
          title
          slug
          excerpt
          wordpress_id
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`