import React from 'react';
import { graphql } from 'gatsby';
import moment from 'moment';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import SEO from '../components/seo';

class SpeakerSessions extends React.Component {
  render() {
    const talks = this.props.data.allWpSpeakerSession.nodes;
    const pastTalks = talks.filter(talk => moment(talk.metaInfo.talkDate).isBefore(moment(), 'day'))
    const upcomingTalks = talks.filter(talk => moment(talk.metaInfo.talkDate).isSameOrAfter(moment(), 'days'));

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
    allWpSpeakerSession {
      nodes {
        id
        title
        slug
        excerpt
        metaInfo {
          talkDate
        }
        nodeType
      }
    }
  }
`