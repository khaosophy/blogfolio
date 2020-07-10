import React from 'react';
import { Link, graphql } from 'gatsby';
import { moment } from 'moment';
import { getEventDateString } from '../utils/common';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const SpeakerSessionCTA = (props) => {
  /**
   * This component handles the logic for what to show under the talk description.
   */
  const styles = {
    fontWeight: 'bold',
    fontStyle: 'italic',
  }
  const isEventPast = new Date() > new Date(props.sessionDate);
  const { isRecorded, sessionRecording, sessionRegistration } = props;

  if(isEventPast && isRecorded && sessionRecording){
    return <a href={sessionRecording}>Click Here to Watch</a>
  } else if(isEventPast && isRecorded && !sessionRecording) {
    return <p style={styles}>Check Back Soon to Watch Recording</p>
  } else if(!isEventPast && sessionRegistration) {
    return <a href={sessionRegistration}>Click Here to Register</a>
  } else if(!isEventPast && !sessionRegistration) {
    return <p style={styles}>Check Back Soon for Registration</p>
  } else {
    return null;
  }
}

const SpeakerSessionTemplate = ({ data }) => {
  const {
    title,
    excerpt,
    content,
    acf,
  } = data.wordpressWpSpeakerSessions;

// const {
//   talk_date,
//   talk_start,
//   talk_end,
//   talk_registration,
//   talk_is_recorded,
//   talk_recording,
//   talk_resources,
// } = acf;

  return (
    <Layout>
      <SEO
        title={title}
        description={excerpt}
      />
      <small style={{ position: 'absolute' }}>
        <Link to="/speaker-sessions">
          ← Back to Speaker Sessions
        </Link>
      </small>
      <h1 style={{ marginBottom: rhythm(1/4) }}>{title}</h1>
      <small>{getEventDateString(acf.talk_date)}</small>
      <div
        style={{ marginTop: 20 }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <SpeakerSessionCTA 
        sessionDate={acf.talk_date}
        isRecorded={acf.talk_is_recorded}
        sessionRecording={acf.talk_recording}
        sessionRegistration={acf.talk_registration}
      />
      {(acf.talk_resources && acf.talk_resources !== '') &&
        <div 
          style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #007acc' }}
          dangerouslySetInnerHTML={{ __html: acf.talk_resources}}
        />
      }
    </Layout>
  )
};
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
        talk_is_recorded
        talk_resources
      }
    }
  }
`;
