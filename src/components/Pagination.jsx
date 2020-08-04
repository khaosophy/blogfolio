import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import './pagination.css'

const Pagination = (props) => {
  return (
    <div className="pagination">
    {Array.from({ length: props.numPages }, (_, i) => (
      <Link
        className="pagination__number"
        key={`pagination-number${i + 1}`}
        to={`/${i === 0 ? props.pathRoot : `${props.pathRoot}/${i + 1}`}`}
      >
        {i + 1}
      </Link>
    ))}
    </div>
  )
}

export default Pagination;

Pagination.defaultProps = {
  pathRoot: '',
}

Pagination.propTypes = {
  numPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pathRoot: PropTypes.string.isRequired,
}