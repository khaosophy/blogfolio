import React from 'react';
import { Link, graphql } from 'gatsby';
// import { GatsbyImage } from "gatsby-plugin-image"
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const SinglePostTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.wordpressPost.title}
      description={data.wordpressPost.excerpt}
    />
    <small style={{ position: 'absolute' }}>
      <Link to="/">
        ← Back to Blog
      </Link>
    </small>
    <h1 style={{ marginBottom: rhythm(1/4) }}>{data.wordpressPost.title}</h1>
    <small>Published {data.wordpressPost.date}</small>
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
