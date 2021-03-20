import React, { useState } from "react"
import PropTypes from "prop-types"
import Sidebar from "../components/sidebar"
import { useStaticQuery, graphql } from "gatsby"
import MenuButton from "./menu-button"
import Header from "./header"
import Main from "./main"
import { AiFillGithub } from "react-icons/ai"
import { FaDiscord } from "react-icons/fa"
import { FiSun } from "react-icons/fi"
// import "./layout.css"

const Layout = props => {
  const [menuOpen, setMenuOpen] = useState(false)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          github
        }
      }
    }
  `)

  console.log("props", props)

  return (
    <div className="text-gray-600 leading-loose">
      <div className="sticky top-0 z-40 lg:z-50 w-full max-w-8xl mx-auto bg-white flex-none flex">
        <div className="flex-none pl-4 sm:pl-6 xl:pl-8 flex items-center border-b border-gray-200 lg:border-b-0 lg:w-60 xl:w-72">
          <MenuButton
            onClick={e => {
              setMenuOpen(!menuOpen)
              // if (!nav.current) return
              // const navLink = nav.current.querySelector("a")
              // if (navLink) navLink.focus()
            }}
          />
          <Header siteTitle={data.site.siteMetadata.title} />
        </div>
        <div className="flex-auto border-b border-gray-200 h-18 flex items-center justify-between px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8">
          <div className="h-14 self-center">MIEJSCE NA SEARCH ENGINE</div>
          <div className="flex align-middle">
            <div className="flex mr-4 align-middle items-center">
              Dark mode <FiSun />
            </div>
            <a
              href="https://discord.gg/eqP6VsV4Wa"
              className="mr-2 hover:text-indigo-400"
            >
              <FaDiscord size="2em" />
            </a>
            <a
              href={data.site.siteMetadata.github}
              className="hover:text-pink-900"
            >
              <AiFillGithub size="2em" />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full flex-wrap max-w-8xl mx-auto">
        <div className="flex py-2 px-1 align-middle justify-between">
          <div className="flex align-middle"></div>
          <div></div>
        </div>
        <div className="flex">
          <Sidebar
            siteTitle={data.site.siteMetadata.title}
            pathname={props.location?.pathname}
          />
          {props.children}
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
