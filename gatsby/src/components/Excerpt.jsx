import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby';
import { rhythm } from '../utils/typography';

const Excerpt = (props) => {
  return (
    <article className="excerpt" style={{ marginTop: '3.5rem' }}>
      <header style={{marginBottom: rhythm(1/2)}}>
        <h3 style={{margin: 0, lineHeight: 1.4}}>
          <Link style={{ boxShadow: `none` }} to={props.url}>
            {props.title}
          </Link>
        </h3>
        {props.date && <small>{props.date}</small>}
      </header>
      <div dangerouslySetInnerHTML={{ __html: props.children }} />
      <Link to={props.url}>
        {props.continueText}
      </Link>
    </article>
  );
}

Excerpt.defaultProps = {
  continueText: 'Continue Reading...'
}

Excerpt.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  children: PropTypes.string,
  date: PropTypes.string,
  continueText: PropTypes.string,
  postType: PropTypes.string,
}

export default Excerpt;
