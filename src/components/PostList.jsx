import React from 'react';
import Excerpt from './Excerpt';

class PostList extends React.Component {
  render() {
    return (
      <React.Fragment>
      {this.props.children.map(({ node }) => {
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
      </React.Fragment>
    )
  }
}

export default PostList;