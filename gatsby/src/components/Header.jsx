import React from 'react';
import './header.css';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="page__header">
      <div className="container">
        <h1 className="page__title">Casey James Perno</h1>
        {/* <p className="header__subtitle">Developer</p> */}
        <Nav />
      </div>
    </header>
  )
}

export default Header;
