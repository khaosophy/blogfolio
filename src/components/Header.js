import { StaticQuery, graphql, Link } from "gatsby"
import React from "react"

const Header = props => {
  const containerStyles = props.style
  return (
    <header style={{background: `#007acc`, color: `white`}}>
      <div style={containerStyles}>
        <h1 style={{margin: 0}}>Casey James Perno</h1>
      </div>
    </header>
  )
}

export default Header