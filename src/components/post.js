import React, { useState } from "react"
import PropTypes from "prop-types"
import Sidebar from "../components/sidebar"
import { useStaticQuery, graphql } from "gatsby"
import MenuButton from "./menu-button"
import Header from "./header"
import Main from "./main"
import { AiFillGithub } from "react-icons/ai"
import "../styles/global.css"
// import "./layout.css"

const Post = props => (
  <Main pageContext={props.pageContext}>{props.children}</Main>
)

export default Post
