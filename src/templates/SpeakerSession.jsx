import React from 'react';
import { Link, graphql } from 'gatsby';
import { moment } from 'moment';
import { getEventDateString } from '../utils/common';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const SpeakerSessionCTA = (props) => {
  const styles = {
    fontWeight: 'bold',
    fontStyle: 'italic',
  }
  const isEventPast = new Date() > new Date(props.sessionDate);
  if(isEventPast){
    if(props.sessionRecording){
      return <a href={props.sessionRecording}>Click Here to Watch</a>
    } else {
      return <p style={styles}>Check Back Soon to Watch Recording</p>
    }
  } else {
    if(props.sessionRegistration){
      return <a href={props.sessionRegistration}>Click Here to Register</a>
    } else {
      return <p style={styles}>Check Back Soon for Registration</p>
    }
  }
}

const SpeakerSessionTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.wordpressWpSpeakerSessions.title}
      description={data.wordpressWpSpeakerSessions.excerpt}
    />
    <small style={{ position: 'absolute' }}>
      <Link to="/speaker-sessions">
        ← Back to Speaker Sessions
      </Link>
    </small>
    <h1 style={{ marginBottom: rhythm(1/4) }}>{data.wordpressWpSpeakerSessions.title}</h1>
    <small>{getEventDateString(data.wordpressWpSpeakerSessions.acf.talk_date)}</small>
    <div
      style={{ marginTop: 20 }}
      dangerouslySetInnerHTML={{ __html: data.wordpressWpSpeakerSessions.content }}
    />
    <SpeakerSessionCTA 
      sessionDate={data.wordpressWpSpeakerSessions.acf.talk_date}
      sessionRecording={data.wordpressWpSpeakerSessions.acf.talk_recording}
      sessionRegistration={data.wordpressWpSpeakerSessions.acf.talk_registration}
    />
  </Layout>
);
export default SpeakerSessionTemplate;

export const query = graphql`
  query($id: Int!) {
    wordpressWpSpeakerSessions(wordpress_id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
      acf {
        talk_date
        talk_end
        talk_recording
        talk_registration
        talk_start
      }
    }
  }
`;
