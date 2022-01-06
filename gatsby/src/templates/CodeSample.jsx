import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const CodeSampleTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.wpCodeSample.title}
      description={data.wpCodeSample.excerpt}
    />
    <small style={{ position: 'absolute' }}>
      <Link to="/code-samples">
        ← Back to Code Samples
      </Link>
    </small>
    <h1 style={{ marginBottom: rhythm(1/4) }}>{data.wpCodeSample.title}</h1>
    <small>Published {data.wpCodeSample.date}</small>
    <div
      style={{ marginTop: 20 }}
      dangerouslySetInnerHTML={{ __html: data.wpCodeSample.content }}
    />
  </Layout>
);
export default CodeSampleTemplate;

export const query = graphql`
  query($id: String!) {
    wpCodeSample(id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;
