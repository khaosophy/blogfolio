import React from 'react';
import Excerpt from './Excerpt';
import { getEventDateString } from '../utils/common';

class PostList extends React.Component {
  render() {
    console.log(this.props.children[0].node.type)
    
    let urlCategory = '';
    const example = this.props.children[0].node;
    switch(example.type) {
      case 'cjp_speaker_session':
        urlCategory = 'speaker-sessions';
        break;
      case 'cjp_code_sample':
        urlCategory = 'code-samples';
        break;
      default:
        urlCategory = 'blog';
        break;
    }

    return (
      <React.Fragment>
      {this.props.children.map(({ node }) => {
        return (
          <Excerpt
            key={node.wordPress_id}
            title={node.title}
            url={`/${urlCategory}/${node.slug}`}
            date={node.type === 'cjp_speaker_session' ? getEventDateString(node.acf.talk_date) : node.date}
            continueText={node.type === 'cjp_speaker_session' ? "Learn More..." : "Continue Reading..."}
          >
            {node.excerpt}
          </Excerpt>
        )
      })}
      </React.Fragment>
    )
  }
}

export default PostList;