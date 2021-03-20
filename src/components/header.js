import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Logo from "./logo"

const Header = ({ siteTitle }) => (
  <div className="overflow-hidden w-10 md:w-auto flex mt-4">
    <Logo />
    <h1 className="m-0 text-2xl ml-2">
      <Link to="/">{siteTitle}</Link>
    </h1>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
