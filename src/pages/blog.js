import React from "react"
import { Link, graphql } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

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
            <article key={wordpress_id}>
              <header style={{marginBottom: rhythm(1/2)}}>
                <h3 style={{marginBottom: 0, lineHeight: 1.4}}>
                  <Link style={{ boxShadow: `none` }} to={`/blog/${slug}`}>
                    {title}</Link>
                </h3>
                <small style={{color: 'gray'}}>{date}</small>
              </header>
              <div dangerouslySetInnerHTML={{ __html: excerpt }} />
              <Link to={`/blog/${slug}`}>
                Continue Reading...
              </Link>
            </article>
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