import React from 'react';
import Excerpt from './Excerpt';
import { getEventDateString } from '../utils/common';

class PostList extends React.Component {
  render() {    
    let urlCategory = '';
    const example = this.props.children[0];
    switch(example.nodeType) {
      case 'SpeakerSession':
        urlCategory = 'speaker-sessions';
        break;
      case 'CodeSample':
        urlCategory = 'code-samples';
        break;
      default:
        urlCategory = 'blog';
        break;
    }

    return (
      <React.Fragment>
      {this.props.children.map((post) => {
        return (
          <Excerpt
            key={post.id}
            title={post.title}
            url={`/${urlCategory}/${post.slug}`}
            date={post.nodeType === 'SpeakerSession' ? getEventDateString(post.metaInfo.talkDate) : post.date}
            continueText={post.nodeType === 'SpeakerSession' ? "Learn More..." : "Continue Reading..."}
          >
            {post.excerpt}
          </Excerpt>
        )
      })}
      </React.Fragment>
    )
  }
}

export default PostList;