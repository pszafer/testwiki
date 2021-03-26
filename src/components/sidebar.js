import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link as GatsbyLink } from "gatsby"
import { Box, Stack, Flex, Link, useColorModeValue } from "@chakra-ui/react"

const Sidebar = ({ pathname, isOpen, closeMenu }) => {
  const ref = React.useRef()
  if (!pathname) return null
  return (
    <Box
      ref={ref}
      as="nav"
      aria-label="Main Navigation"
      pos={{ base: "absolute", md: "sticky" }}
      background="white"
      sx={{
        overscrollBehavior: "contain",
      }}
      top="5.5rem"
      w={{ base: "100%", md: "280px" }}
      h={{ base: "", md: "calc(((100vh - 4rem) - 64px) - 42px);" }}
      pr="8"
      pb="8"
      pl="3"
      pt="8"
      overflowY="auto"
      className="sidebar-content"
      zIndex={5}
      flexShrink={0}
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Menu pathname={pathname} closeMenu={closeMenu} />
    </Box>
  )
}

const Menu = ({ pathname, closeMenu }) => {
  const data = useStaticQuery(graphql`
    query Menu {
      allMdx(
        filter: {
          slug: { ne: "" }
          frontmatter: { nav_exclude: { in: [false, null] } }
          fields: { pathDepth: { lte: 2 } }
        }
        sort: {
          fields: [fields___pathDepth, frontmatter___nav_order, slug]
          order: ASC
        }
      ) {
        edges {
          node {
            id
            slug
            fields {
              pathDepth
            }
            frontmatter {
              title
              nav_order
            }
          }
        }
      }
    }
  `)
  const cache = {}
  const menuData = data.allMdx.edges.reduce((acc, curr) => {
    const {
      node: {
        slug,
        fields: { pathDepth },
      },
    } = curr
    if (pathDepth === 1) {
      curr["sub"] = []
      acc.push(curr)
      cache[slug] = acc.length - 1
    }
    if (pathDepth === 2) {
      const parent = slug.substring(0, slug.indexOf("/") + 1)
      const parentElem = acc[cache[parent]]
      if (parentElem) {
        parentElem["sub"].push(curr)
      }
    }
    return acc
  }, [])

  return (
    <>
      {menuData.map(
        (
          {
            node: {
              id,
              slug,
              frontmatter: { title },
            },
            sub,
          },
          i
        ) => {
          const uri = `/${slug}`
          const isActive = pathname.includes(uri)
          return (
            <Flex key={id} flexDir="column">
              <StyledLink
                to={uri}
                onClick={closeMenu}
                isActive={isActive}
                fontSize="sm"
                fontWeight={isActive ? "bold" : "normal"}
                my="1.25rem"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                {title}
              </StyledLink>
              {sub && (
                <Stack as="ul">
                  <SubLinks
                    mainUri={uri}
                    links={sub}
                    pathname={pathname}
                    closeMenu={closeMenu}
                  />
                </Stack>
              )}
            </Flex>
          )
        }
      )}
    </>
  )
}

const StyledLink = React.forwardRef(function StyledLink(props, ref) {
  const { isActive, ...rest } = props

  return (
    <Link
      as={GatsbyLink}
      aria-current={isActive ? "page" : undefined}
      width="100%"
      px="3"
      py="1"
      rounded="md"
      ref={ref}
      fontSize="sm"
      fontWeight="500"
      color={useColorModeValue("gray.600", "whiteAlpha.900")}
      transition="all 0.2s"
      _activeLink={{
        bg: useColorModeValue("blue.50", "rgba(48, 140, 122, 0.3)"),
        color: useColorModeValue("blue.700", "blue.200"),
        fontWeight: "600",
      }}
      _hover={{
        color: useColorModeValue("gray.900", "white"),
      }}
      {...rest}
    />
  )
})

const SubLinks = ({ links, pathname, closeMenu }) => {
  if (!links) return null
  return (
    <>
      {links.map(
        (
          {
            node: {
              id,
              slug,
              frontmatter: { title },
            },
          },
          j
        ) => {
          const subSlub = `/${slug}`
          const activeSub = pathname.includes(subSlub)
          return (
            <StyledLink
              key={id}
              to={subSlub}
              isActive={activeSub}
              onClick={closeMenu}
            >
              {title || slug.substring(slug.indexOf("/") + 1)}
            </StyledLink>
          )
        }
      )}
    </>
  )
}

Sidebar.propTypes = {
  siteTitle: PropTypes.string,
}

Sidebar.defaultProps = {
  siteTitle: "",
}

export default Sidebar
