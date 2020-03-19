import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import './footer.css';

const Footer = (props) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
          }
        }
      }
    `
  )
  const date = new Date().getFullYear();
  return (
    <footer className="page__footer">
      <div class="container" style={props.style}>
        <span className="copyright">Copyright &copy; {date} {site.siteMetadata.author}</span>
      </div>
    </footer>
  );
};

export default Footer;
