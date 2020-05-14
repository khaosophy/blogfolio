import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const SpeakerSessionTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.wordpressWpSpeakerSession.title}
      description={data.wordpressWpSpeakerSession.excerpt}
    />
    <small style={{ position: 'absolute' }}>
      <Link to="/speaker-sessions">
        ← Back to Speaker Sessions
      </Link>
    </small>
    <h1 style={{ marginBottom: rhythm(1/4) }}>{data.wordpressWpSpeakerSession.title}</h1>
    <small>Published {data.wordpressWpSpeakerSession.date}</small>
    <div
      style={{ marginTop: 20 }}
      dangerouslySetInnerHTML={{ __html: data.wordpressWpSpeakerSession.content }}
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
