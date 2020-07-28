import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import SEO from '../components/seo';

class SpeakerSessions extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allWordpressWpSpeakerSessions.edges;

    return (
      <Layout>
        <SEO title="Speaker Sessions" />
        <PostList>{posts}</PostList>
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