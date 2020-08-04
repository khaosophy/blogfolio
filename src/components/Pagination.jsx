import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import './pagination.css'

const Pagination = (props) => {
  const { currentPage, numPages, pathRoot } = props;
  const isFirst = (currentPage === 1);
  const isLast = (currentPage === numPages);
  return (
    <div className="pagination">
    {!isFirst && (
      <Link
        className="pagination__previous"
        to={`/${pathRoot}/${(currentPage - 1 === 1) ? "" : currentPage - 1}`}
      >
        Previous Page
      </Link>
    )}
    {Array.from({ length: numPages }, (_, i) => (
      <Link
        className="pagination__number"
        key={`pagination-number${i + 1}`}
        to={`/${i === 0 ? pathRoot : `${pathRoot}/${i + 1}`}`}
      >
        {i + 1}
      </Link>
    ))}
    {!isLast && (
      <Link
        className="pagination__next"
        to={`/${pathRoot}/${(currentPage + 1)}`}
      >
        Next Page
      </Link>
    )}
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