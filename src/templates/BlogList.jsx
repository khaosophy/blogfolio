import React from 'react'
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Excerpt from '../components/Excerpt';
import Pagination from '../components/Pagination';
import { getEventDateString } from '../utils/common';

class BlogList extends React.Component {
  render() {
    console.log(this.props);
    const posts = this.props.data.allWordpressPost.edges;
    const { currentPage, numPages } = this.props.pageContext;
    // todo: move below to Pagination component? 
    const isFirst = (currentPage === 1);
    const isLast = (currentPage === numPages);
    const prevPage = (currentPage - 1 === 1) ? "/" : (currentPage - 1).toString();
    const nextPage = (currentPage + 1).toString();

    return (
      <Layout>
        <SEO title="All posts" />
        {posts.map(({ node }) => {
          return (
            <Excerpt
              key={node.wordPress_id}
              title={node.title}
              url={`/blog/${node.slug}`}
              date={node.date}
            >
              {node.excerpt}
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
    allWordpressPost (
      limit: $limit
      skip: $skip
    ) {
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