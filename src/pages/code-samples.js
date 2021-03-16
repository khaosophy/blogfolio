import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import PostList from '../components/PostList';

class CodeSamples extends React.Component {
  render() {
    const posts = this.props.data.allWpCodeSample.nodes;
    return (
      <Layout>
        <SEO title="Code Samples" />
        <PostList>{posts}</PostList>
      </Layout>
    )
  }
}

export default CodeSamples;

export const query = graphql`
  query AllCodeSamples {
    allWpCodeSample {
      nodes {
        title
        slug
        excerpt
        id
        date(formatString: "MMMM DD, YYYY")
        nodeType
      }
    }
  }
`