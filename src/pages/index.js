import React from 'react';
import { Link, graphql } from 'gatsby';

// import Bio from "../components/bio";
import Layout from '../components/layout';
import SEO from '../components/seo';
import Excerpt from '../components/Excerpt';

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allWordpressPost.edges

    return (
      <Layout>
        <SEO title="All posts" />
        {/* <Bio /> */}
        {posts.map(({ node }) => {
          const { title, slug, date, wordpress_id, excerpt } = node;
          return (
            <Excerpt
              key={wordpress_id}
              title={title}
              url={`/blog/${slug}`}
              date={date}
            >
              {excerpt}
            </Excerpt>
          )
        })}
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
          content
          slug
          excerpt
          wordpress_id
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`