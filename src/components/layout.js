import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import Header from './Header';
import Footer from './Footer';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const containerStyles = {
      marginLeft: `auto`,
      marginRight: `auto`,
      maxWidth: rhythm(24),
      padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
    }
    return (
      <React.Fragment>
        <Header style={containerStyles}/>
        <main style={containerStyles}>
          {children}
        </main>
        <Footer style={containerStyles} />
      </React.Fragment>
    )
  }
}

export default Layout
