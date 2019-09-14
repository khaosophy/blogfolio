import React from 'react';
import { useStaticQuery, graphql } from "gatsby"

const Footer = () => {
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
    <footer>
      <span className="copyright">Copyright &copy; {date} {site.siteMetadata.author}</span>
    </footer>
  );
};

export default Footer;