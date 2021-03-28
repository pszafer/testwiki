import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link as GatsbyLink } from "gatsby"
import {
  Box,
  Flex,
  Link,
  useColorModeValue,
  chakra,
  Button,
} from "@chakra-ui/react"

const Sidebar = ({ pathname, isOpen, closeMenu }) => {
  const ref = React.useRef()
  const bg = useColorModeValue("white", "gray.800")
  if (!pathname) return null
  return (
    <Box
      ref={ref}
      as="nav"
      aria-label="Main Navigation"
      pos={{ base: "absolute", md: "sticky" }}
      background={bg}
      sx={{
        overscrollBehavior: "contain",
      }}
      top="5.5rem"
      w={{ base: "100%", md: "280px" }}
      h={{ base: "100%", md: "calc(((100vh - 4rem) - 64px) - 42px);" }}
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
  const [expanded, setExpanded] = useState({})

  const toggle = i => e => {
    e.stopPropagation()
    setExpanded({
      ...expanded,
      [i]: !expanded[i],
    })
  }

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

  const navColor = useColorModeValue("gray.600", "whiteAlpha.900")
  const navActiveBgColor = useColorModeValue(
    "blue.50",
    "rgba(48, 140, 122, 0.3)"
  )
  const activeNavColor = useColorModeValue("blue.700", "blue.200")

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
          const isActive = pathname === uri
          return (
            <Flex key={id} flexDir="column">
              {sub ? (
                <>
                  <Box>
                    <AccordionButton
                      href={uri}
                      mainUri={uri}
                      pathname={pathname}
                      open={expanded[i]}
                      onClick={toggle(i)}
                    >
                      <chakra.span ml={3}>{title}</chakra.span>
                    </AccordionButton>
                  </Box>
                  <Flex ml={"4.5px"} pb={4} flexDir="column">
                    <SubLinks
                      mainUri={uri}
                      isMainActive={isActive}
                      links={sub}
                      pathname={pathname}
                      open={expanded[i]}
                      closeMenu={closeMenu}
                    />
                  </Flex>
                </>
              ) : (
                <Box bg={isActive && navActiveBgColor}>
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
                </Box>
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
      px={4}
      py={1}
      rounded="md"
      ref={ref}
      fontSize="sm"
      fontWeight="500"
      color={useColorModeValue("gray.600", "whiteAlpha.900")}
      transition="all 0.2s"
      _hover={{
        color: useColorModeValue("gray.900", "white"),
      }}
      {...rest}
    />
  )
})

const SubLinks = ({
  links,
  pathname,
  closeMenu,
  open,
  mainUri,
  isMainActive,
}) => {
  const activeBg = useColorModeValue("blue.50", "rgba(48, 140, 122, 0.3)")
  const activeColor = useColorModeValue("blue.700", "blue.200")
  if (!links || (!open && !pathname.includes(mainUri))) return null
  return (
    <>
      <StyledLink
        to={mainUri}
        isActive={isMainActive}
        px={4}
        py={1}
        onClick={closeMenu}
        borderLeftColor="gray.200"
        borderLeftWidth={2}
        borderLeftRadius={0}
        mt={0}
        _activeLink={{
          bg: activeBg,
          color: activeColor,
          fontWeight: "600",
        }}
      >
        Ogólnie
      </StyledLink>
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
              px={4}
              py={3}
              borderLeftColor="gray.200"
              borderLeftWidth={2}
              borderLeftRadius={0}
              mt={0}
              _activeLink={{
                bg: activeBg,
                color: activeColor,
                fontWeight: "600",
              }}
            >
              {title || slug.substring(slug.indexOf("/") + 1)}
            </StyledLink>
          )
        }
      )}
    </>
  )
}

const AccordionButton = props => {
  const transform =
    props.open || props.pathname.includes(props.mainUri)
      ? "rotate(0 8 8)"
      : "rotate(-90 8 8)"
  const disabled = props.pathname ? props.pathname.includes(props.href) : false

  return (
    <Button
      variant="link"
      py={3}
      disabled={disabled}
      {...props}
      onMouseDown={e => e.preventDefault()}
    >
      <svg viewBox="0 0 16 16" width="12" height="12">
        <g
          style={{
            transformOrigin: "8 8",
            transition: "transform .1s ease-out",
          }}
          transform={transform}
        >
          <path
            stroke="currentcolor"
            strokeWidth="2"
            fill="none"
            d="M14 6 L8 12 L2 6"
          />
        </g>
      </svg>
      {props.children}
    </Button>
  )
}

Sidebar.propTypes = {
  siteTitle: PropTypes.string,
}

Sidebar.defaultProps = {
  siteTitle: "",
}

export default Sidebar
