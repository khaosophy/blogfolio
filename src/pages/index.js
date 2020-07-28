import React from 'react';
import { graphql } from 'gatsby';

// import Bio from "../components/bio";
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Excerpt from '../components/Excerpt';
import PostList from '../components/PostList';

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allWordpressPost.edges

    return (
      <Layout>
        <SEO title="All posts" />
        <PostList>{posts}</PostList>
      </Layout>
    )
  }
}

export default BlogIndex;

export const query = graphql`
  query {
    allWordpressPost {
      edges {
        node {
          title
          slug
          excerpt
          wordpress_id
          date(formatString: "MMMM DD, YYYY")
          type
        }
      }
    }
  }
`