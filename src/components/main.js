import React from "react"
import { MDXProvider } from "@mdx-js/react"
import {
  Box,
  Link,
  Flex,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Heading,
} from "@chakra-ui/react"

import { Link as GatsbyLink } from "gatsby"
import EditPageButton from "./edit-page-button"
import MDXComponents from "./mdx-components"
import { FiArrowRightCircle } from "react-icons/fi"

const TocItems = ({ level, items, linkColor, linkHoverColor }) => {
  return items.map(x => (
    <ListItem key={`toc${level}${x.url}`}>
      <Link
        as={GatsbyLink}
        to={x.url}
        color={linkColor}
        _hover={{
          color: linkHoverColor,
        }}
      >
        {x.title.length > 20 ? `${x.title.substr(0, 20)}...` : x.title}
      </Link>
      {x.items && (
        <List apply="mdx.ul" marginTop={1}>
          <TocItems
            level={level + 1}
            items={x.items}
            linkColor={linkColor}
            linkHoverColor={linkHoverColor}
          />
        </List>
      )}
    </ListItem>
  ))
}

const Main = ({ pageContext = {}, children, toc, tags, connectedTags }) => {
  const { mdxChildren } = pageContext
  const linkHoverTocColor = useColorModeValue("gray.800", "white")
  const bottomListColor = useColorModeValue("blue.600", "gray.300")
  const bottomListHoverColor = useColorModeValue("blue.800", "white")
  return (
    <Flex
      direction={{ sm: "column", lg: "row-reverse" }}
      mt="4.5rem"
      minHeight="76vh"
    >
      {toc && toc.items && (
        <Box color="gray.500" ml={{ lg: 12 }} mb={{ sm: 3, lg: 0 }}>
          <Heading as="h4" fontSize="sm" marginBottom={2} letterSpacing={2}>
            SPIS TREŚCI
          </Heading>
          <List spacing={3} apply="mdx.ul" marginTop={1} ml={0}>
            <TocItems
              level={0}
              items={toc.items}
              linkColor="gray.500"
              linkHoverColor={linkHoverTocColor}
            />
          </List>
        </Box>
      )}
      <Box flex="1">
        {tags &&
          tags.map(x => (
            <Link
              key={`tagto${x}`}
              as={GatsbyLink}
              to={`/tags/${x}`}
              mr={2}
              apply="mdx.a"
              color={bottomListColor}
              _hover={{
                color: bottomListHoverColor,
              }}
            >
              #{x}
            </Link>
          ))}
        <MDXProvider components={MDXComponents}>{children}</MDXProvider>
        {mdxChildren && (
          <Box mt={2} py={2} borderTop="1px" borderBottom="1px">
            Artykuły w kategorii:
            <List spacing={3} apply="mdx.ul" marginTop={1}>
              {mdxChildren.map(({ slug, frontmatter: { title } }) => (
                <ListItem key={`mdx/${slug}`}>
                  <ListIcon as={FiArrowRightCircle} color="blue.500" />
                  <Link
                    as={GatsbyLink}
                    apply="mdx.a"
                    to={`/${slug}`}
                    color={bottomListColor}
                    _hover={{
                      color: bottomListHoverColor,
                    }}
                  >
                    {title || slug.substring(slug.lastIndexOf("/") + 1)}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        {connectedTags &&
          connectedTags.edges &&
          connectedTags.edges.length > 0 && (
            <Box mt={2} py={2} borderTop="1px" borderBottom="1px">
              Zobacz też:
              <List spacing={3} apply="mdx.ul" marginTop={1}>
                {connectedTags.edges.map(
                  ({
                    node: {
                      slug,
                      id,
                      frontmatter: { title, tags = [] },
                    },
                  }) => (
                    <ListItem key={`tagsconn/${id}`}>
                      <ListIcon as={FiArrowRightCircle} color="blue.500" />
                      <Link
                        as={GatsbyLink}
                        apply="mdx.a"
                        to={`/${slug}`}
                        color={bottomListColor}
                        _hover={{
                          color: bottomListHoverColor,
                        }}
                      >
                        {title || slug.substring(slug.lastIndexOf("/") + 1)}
                      </Link>
                      {tags.map(x => (
                        <Link
                          as={GatsbyLink}
                          apply="mdx.a"
                          to={`/tags/${x}`}
                          ml={1}
                          color={bottomListColor}
                          _hover={{
                            color: bottomListHoverColor,
                          }}
                        >
                          #{x}
                        </Link>
                      ))}
                    </ListItem>
                  )
                )}
              </List>
            </Box>
          )}
        <Box mt={2}>
          <EditPageButton
            href="https://github.com/HomeAssistantPL/wiki/edit/develop/src/materials/komunikacja/index.md"
            isExternal
          />
        </Box>
      </Box>
    </Flex>
  )
}

export default Main
