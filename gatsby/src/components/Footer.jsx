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
      <div className="container" style={props.style}>
        <span className="copyright">Copyright &copy; {date} {site.siteMetadata.author}</span>
        <span className="links">
          <a href="https://github.com/xace90" target="_blank">GitHub</a>
          &nbsp;|&nbsp;
          <a href="https://www.linkedin.com/in/casey-perno/" target="_blank">LinkedIn</a>
          &nbsp;|&nbsp;
          <a href="https://twitter.com/SirCaseyJames" target="_blank">Twitter</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
