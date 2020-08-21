import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import SEO from '../components/seo';

class SpeakerSessions extends React.Component {
  render() {
    const talks = this.props.data.allWordpressWpSpeakerSessions.edges;
    const pastTalks = talks.filter(talk => new Date(talk.node.acf.talk_date) < new Date());
    const upcomingTalks = talks.filter(talk => new Date(talk.node.acf.talk_date) > new Date());

    return (
      <Layout>
        <SEO title="Speaker Sessions" />
        <h2>Upcoming Talks</h2>
        {(upcomingTalks.length > 0) ? (
          <PostList>{upcomingTalks}</PostList>
        ) : (
          <p>No upcoming talks are currently scheduled. Check back soon for updates! In the meantime, checkout some of my past sessions below.</p>
        )}
        <h2 style={{ marginBottom: '-1.5rem' }}>Past Talks</h2>
        <PostList>{pastTalks}</PostList>
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