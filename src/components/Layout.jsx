import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './main.css'

const Layout = (props) => (
  <React.Fragment>
    <Header />
    <main>
      {props.children}
    </main>
    <Footer />
  </React.Fragment>
);

export default Layout;
