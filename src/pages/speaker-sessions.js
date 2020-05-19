import React from 'react';
import { graphql } from 'gatsby';
import moment from 'moment';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Excerpt from '../components/Excerpt';

class SpeakerSessions extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allWordpressWpSpeakerSessions.edges;

    return (
      <Layout>
        <SEO title="Code Samples" />
        {posts.map(({ node }) => {
          const { wordpress_id, type, title, slug, excerpt } = node;
          const { talk_date } = node.acf;

          let dateText = '';
          if(talk_date) {
            if(new Date() < new Date(talk_date)) { // if the scheduled date is in the future...
              dateText = "Scheduled for " + moment(talk_date).format("MMMM DD, YYYY");
            } else {
              dateText = "Given on " + moment(talk_date).format("MMMM DD, YYYY");
            }
          } else {
            dateText = "Date To Be Decided";
          }

          return (
            <Excerpt
              key={wordpress_id}
              postType={type}
              title={title}
              url={`/speaker-sessions/${slug}`}
              date={dateText}
              continueText="Learn More..."
            >
              {excerpt}
            </Excerpt>
          )
        })}
      </Layout>
    )
  }
}

export default SpeakerSessions;

export const query = graphql`
  query {
    allWordpressWpSpeakerSessions {
      edges {
        node {
          wordpress_id
          type
          title
          slug
          excerpt
          acf {
            talk_date
          }
        }
      }
    }
  }
`