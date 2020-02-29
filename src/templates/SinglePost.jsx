// src/templates/SinglePostTemplate.js
import React from 'react';
import { graphql } from 'gatsby';
// import Img from "gatsby-image"
import Layout from '../components/Layout';
import SEO from '../components/seo';

const SinglePostTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.wordpressPost.title}
      description={data.wordpressPost.excerpt}
    />
    <h1>{data.wordpressPost.title}</h1>
    <p>Published {data.wordpressPost.date}</p>
    {/* <Img
      sizes={data.wordpressPost.acf.feat_img.localFile.childImageSharp.sizes}
      alt={data.wordpressPost.title}
      style={{ maxHeight: 450 }}
    /> */}
    <div
      style={{ marginTop: 20 }}
      dangerouslySetInnerHTML={{ __html: data.wordpressPost.content }}
    />
  </Layout>
);
export default SinglePostTemplate;

export const query = graphql`
  query($id: Int!) {
    wordpressPost(wordpress_id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;
