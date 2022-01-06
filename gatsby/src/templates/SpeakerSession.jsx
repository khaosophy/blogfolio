import React from 'react';
import { Link, graphql } from 'gatsby';
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
  const isEventPast = new Date() >= new Date(props.sessionDate);
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
    metaInfo,
  } = data.wpSpeakerSession;

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
      <small>{getEventDateString(metaInfo.talkDate)}</small>
      <div
        style={{ marginTop: 20 }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <SpeakerSessionCTA 
        sessionDate={metaInfo.talkDate}
        isRecorded={metaInfo.talkIsRecorded}
        sessionRecording={metaInfo.talkRecording}
        sessionRegistration={metaInfo.talkRegistration}
      />
      {(metaInfo.talkResources && metaInfo.talkResources !== '') &&
        <div 
          style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #007acc' }}
          dangerouslySetInnerHTML={{ __html: metaInfo.talkResources}}
        />
      }
    </Layout>
  )
};
export default SpeakerSessionTemplate;

export const query = graphql`
  query($id: String!) {
    wpSpeakerSession(id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
      metaInfo {
        talkDate
        talkEnd
        talkRecording
        talkRegistration
        talkStart
        talkIsRecorded
        talkResources
      }
    }
  }
`;
