import React from 'react';
import { useStaticQuery, graphql } from "gatsby"

const Footer = props => {
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
    <footer style={{background: `#007acc`, color: `white`}}>
      <div style={props.style}>
        <span className="copyright">Copyright &copy; {date} {site.siteMetadata.author}</span>
      </div>
    </footer>
  );
};

export default Footer;