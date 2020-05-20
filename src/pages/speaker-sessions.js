import React from 'react';
import { graphql } from 'gatsby';
import { getEventDateString } from '../utils/common';
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
          const { wordpress_id, type, title, slug, excerpt } = node;
          const { talk_date } = node.acf;
          
          return (
            <Excerpt
              key={wordpress_id}
              postType={type}
              title={title}
              url={`/speaker-sessions/${slug}`}
              date={getEventDateString(talk_date)}
              continueText="Learn More..."
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
          wordpress_id
          type
          title
          slug
          excerpt
          acf {
            talk_date
          }
        }
      }
    }
  }
`