import React from 'react';
import { Link } from 'gatsby';
import './nav.css';

const Nav = () => (
  <nav className="main-nav">
    <ul>
      <li>
        <Link to="/" activeClassName='active'>
          Blog
        </Link>
      </li>
      {/* <li>
        <Link to="/code-samples" activeClassName='active'>
          Code Samples
        </Link>
      </li> */}
      <li>
        <Link to="/speaker-sessions" activeClassName='active'>
          Speaker Sessions
        </Link>
      </li>
    </ul>
  </nav>
);

export default Nav;