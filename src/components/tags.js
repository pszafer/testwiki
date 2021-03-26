import React from "react"
import { Link as GatsbyLink, graphql } from "gatsby"
import SEO from "./seo"
import {
  Box,
  Link,
  chakra,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Heading,
} from "@chakra-ui/react"
import { FiArrowRightCircle } from "react-icons/fi"

const Tags = ({ pageContext, data }) => {
  const bottomListColor = useColorModeValue("blue.600", "gray.300")
  const bottomListHoverColor = useColorModeValue("blue.800", "white")
  const { tag } = pageContext
  return (
    <>
      <SEO title={tag} />
      <Box mt="4.5rem" minHeight="76vh">
        <Heading as="h4" fontSize="sm" marginBottom={2} letterSpacing={2}>
          Artykuły z tagiem{" "}
          <chakra.span color="blue.700" fontSize="xl">
            #{tag}
          </chakra.span>
        </Heading>
        <Box mt={2} py={2}>
          <List spacing={3} apply="mdx.ul" marginTop={1}>
            {data.allMdx.edges.map(
              ({
                node: {
                  slug,
                  frontmatter: { title },
                },
              }) => (
                <ListItem key={`tagsSite/${slug}`}>
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
              )
            )}
          </List>
        </Box>
      </Box>
    </>
  )
}

export default Tags

export const pageQuery = graphql`
  query Tag($tag: String) {
    allMdx(
      sort: {
        fields: [fields___pathDepth, frontmatter___nav_order, slug]
        order: ASC
      }
      filter: { frontmatter: { tags: { eq: $tag } } }
    ) {
      edges {
        node {
          slug
          frontmatter {
            title
          }
        }
      }
    }
  }
`
