import React from "react"
import { Link, graphql } from "gatsby"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  return (
    <div className="pl-24 pr-14 py-4 min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
      <h1 className="text-4xl font-light my-4 uppercase ">#{tag}</h1>
      <ul className="mr-2 text-gray-500 list-disc">
        {data.allMdx.edges.map(({ node: { slug, title } }) => (
          <li className="underline text-blue-300">
            <Link to={`/${slug}`}>{title || slug}</Link>
          </li>
        ))}
      </ul>
    </div>
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
