import React from 'react';
import { Link } from 'gatsby';
import './nav.css';

const Nav = () => (
  <nav className="main-nav">
    <ul>
      <li>
        <Link activeStyle={{ display: 'none' }} to="/">
          Back to Blog
        </Link>
      </li>
    </ul>
  </nav>
);

export default Nav;