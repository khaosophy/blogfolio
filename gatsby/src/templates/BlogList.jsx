import React from 'react'
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Excerpt from '../components/Excerpt';
import Pagination from '../components/Pagination';

class BlogList extends React.Component {
  
  render() {
    const posts = this.props.data.allWpPost.nodes;
    const { currentPage, numPages } = this.props.pageContext;

    return (
      <Layout>
        <SEO title="All posts" />
        {posts.map((post) => {
          return (
            <Excerpt
              key={post.id}
              title={post.title}
              url={`/blog/${post.slug}`}
              date={post.date}
            >
              {post.excerpt}
            </Excerpt>
          )
        })}
        <Pagination 
          numPages={numPages}
          currentPage={currentPage}
          pathRoot={'blog'}
        />
      </Layout>
    )
  }
}

export default BlogList;

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allWpPost (
      limit: $limit
      skip: $skip
    ) {
      nodes {
          title
          slug
          excerpt
          id
          date(formatString: "MMMM DD, YYYY")
        }
    }
  }
`