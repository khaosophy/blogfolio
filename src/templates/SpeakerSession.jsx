import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const SpeakerSessionTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.wordpressWpSpeakerSessions.title}
      description={data.wordpressWpSpeakerSessions.excerpt}
    />
    <small style={{ position: 'absolute' }}>
      <Link to="/speaker-sessions">
        ← Back to Speaker Sessions
      </Link>
    </small>
    <h1 style={{ marginBottom: rhythm(1/4) }}>{data.wordpressWpSpeakerSessions.title}</h1>
    <small>Published {data.wordpressWpSpeakerSessions.date}</small>
    <div
      style={{ marginTop: 20 }}
      dangerouslySetInnerHTML={{ __html: data.wordpressWpSpeakerSessions.content }}
    />
  </Layout>
);
export default SpeakerSessionTemplate;

export const query = graphql`
  query($id: Int!) {
    wordpressWpSpeakerSessions(wordpress_id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;
