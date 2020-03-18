// src/templates/SinglePostTemplate.js
import React from 'react';
import { graphql } from 'gatsby';
// import Img from "gatsby-image"
import Layout from '../components/Layout';
import SEO from '../components/seo';

const CodeSampleTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.wordpressWpCodeSamples.title}
      description={data.wordpressWpCodeSamples.excerpt}
    />
    <h1>{data.wordpressWpCodeSamples.title}</h1>
    <p>Published {data.wordpressWpCodeSamples.date}</p>
    {/* <Img
      sizes={data.wordpressPost.acf.feat_img.localFile.childImageSharp.sizes}
      alt={data.wordpressPost.title}
      style={{ maxHeight: 450 }}
    /> */}
    <div
      style={{ marginTop: 20 }}
      dangerouslySetInnerHTML={{ __html: data.wordpressWpCodeSamples.content }}
    />
  </Layout>
);
export default CodeSampleTemplate;

export const query = graphql`
  query($id: Int!) {
    wordpressWpCodeSamples(wordpress_id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;
