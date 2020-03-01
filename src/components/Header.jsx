import React from 'react';
import './header.css';
import Nav from './Nav';

const Header = (props) => {
  const containerStyles = props.style;
  return (
    <header className="page__header">
      <div className="container">
        <h1 style={{margin: 0}}>Casey James Perno</h1>
        <Nav />
      </div>
    </header>
  )
}

export default Header;
