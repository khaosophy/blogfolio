import React from 'react';
import { Link, graphql } from 'gatsby';
// import { GatsbyImage } from "gatsby-plugin-image"
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const SinglePostTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.wpPost.title}
      description={data.wpPost.excerpt}
    />
    <small style={{ position: 'absolute' }}>
      <Link to="/">
        ← Back to Blog
      </Link>
    </small>
    <h1 style={{ marginBottom: rhythm(1/4) }}>{data.wpPost.title}</h1>
    <small>Published {data.wpPost.date}</small>
    {/* <Img
      sizes={data.wpPost.acf.feat_img.localFile.childImageSharp.sizes}
      alt={data.wpPost.title}
      style={{ maxHeight: 450 }}
    /> */}
    <div
      style={{ marginTop: 20 }}
      dangerouslySetInnerHTML={{ __html: data.wpPost.content }}
    />
  </Layout>
);
export default SinglePostTemplate;

export const query = graphql`
  query($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;
