import React, { useState } from "react"
import PropTypes from "prop-types"
import Sidebar from "../components/sidebar"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"

import { Box } from "@chakra-ui/react"
import Container from "./container"

const Layout = props => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          github
          facebook
          discord
        }
      }
    }
  `)

  // const isMobile = window !== undefined && window.innerWidth < 760
  // const showSidebar = isMobile ? menuOpen : true

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata.title}
        github={data.site.siteMetadata.github}
        facebook={data.site.siteMetadata.facebook}
        discord={data.site.siteMetadata.discord}
        toggle={toggle}
        isOpen={isOpen}
      />
      <Container as="main" maxW="1400px">
        <Box display={{ base: "block", md: "flex" }} height="100%">
          <Sidebar
            pathname={props.location?.pathname}
            isOpen={isOpen}
            closeMenu={() => setIsOpen(false)}
          />
          <div style={{ flex: 1 }}>
            <Box
              id="content"
              pt={3}
              px={5}
              mx="auto"
              minH="76vh"
              mt="4.5rem"
              maxW="58rem"
            >
              {props.children}
            </Box>
          </div>
        </Box>
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
