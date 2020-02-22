import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {
  const { location, title, children } = props;
  const containerStyles = {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '42rem',
    padding: '2.5rem 1.5rem',
  };
  return (
    <React.Fragment>
      <Header style={containerStyles} />
      <main style={containerStyles}>
        {children}
      </main>
      <Footer style={containerStyles} />
    </React.Fragment>
  );
};

export default Layout;
