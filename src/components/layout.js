import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import Header from './Header';
import Footer from './Footer';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    )
  }
}

export default Layout
