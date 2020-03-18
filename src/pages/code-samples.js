import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Excerpt from '../components/Excerpt';

class CodeSamples extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allWordpressWpCodeSamples.edges;
    return (
      <Layout>
        <SEO title="Code Samples" />
        {posts.map(({ node }) => {
          const { title, slug, date, wordpress_id, excerpt } = node
          return (
            <Excerpt
              key={wordpress_id}
              title={title}
              url={`/code-samples/${slug}`}
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

export default CodeSamples;

export const query = graphql`
  query {
    allWordpressWpCodeSamples {
      edges {
        node {
          title
          slug
          excerpt
          wordpress_id
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`