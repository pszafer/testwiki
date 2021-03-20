import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

const Sidebar = ({ siteTitle, pathname }) => {
  return (
    <div className="ml-4 fixed z-40 inset-0 flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block overflow-hidden">
      <div className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:bg-transparent overflow-hidden lg:top-18 bg-white mr-24 lg:mr-0">
        <Menu pathname={pathname} />
      </div>
    </div>
  )
}

const Menu = ({ pathname }) => {
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
  const menuData = data.allMdx.edges.reduce((acc, curr, ind) => {
    const {
      node: {
        id,
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

  const [expanded, setExpanded] = useState({})

  const toggle = i => e => {
    e.stopPropagation()
    setExpanded({
      ...expanded,
      [i]: !expanded[i],
    })
  }

  return (
    <nav className="px-1 overflow-y-auto sm:px-3 xl:px-5 pb-10 lg:pt-10 lg:pb-14 sticky?lg:h-(screen-18)">
      <ul className="list-none p-0 m-0 ">
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
              <li key={id}>
                <div
                  className={`${
                    isActive ? "bg-green-50	" : ""
                  } flex items-center font-semibold my-2`}
                >
                  {sub && (
                    <AccordionButton
                      href={uri}
                      open={expanded[i]}
                      className="ml-auto"
                      onClick={toggle(i)}
                    />
                  )}
                  <Link
                    to={uri}
                    activeClassName="active"
                    partiallyActive={true}
                  >
                    {title}
                  </Link>
                </div>
                <SubLinks
                  mainUri={uri}
                  links={sub}
                  open={expanded[i]}
                  pathname={pathname}
                />
              </li>
            )
          }
        )}
      </ul>
    </nav>
  )
}

export const AccordionButton = props => {
  const transform = props.open ? "rotate(0 8 8)" : "rotate(-90 8 8)"
  const disabled = props.pathname ? props.pathname.includes(props.href) : false

  return (
    <button
      title="Expand Section"
      disabled={disabled}
      {...props}
      onMouseDown={e => e.preventDefault()}
      className="appearance-none flex items-center p-2 m-0 border-0 border-r-0 bg-transparent"
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
    </button>
  )
}

const SubLinks = ({ open, links, pathname, mainUri }) => {
  if (!links) return null
  return (
    <ul className="">
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
            <li
              key={id}
              className={`${activeSub ? "bg-green-100" : ""} pl-8 my-2`}
            >
              <Link to={subSlub} className="text-sm">
                {title || slug.substring(slug.indexOf("/") + 1)}
              </Link>
            </li>
          )
        }
      )}
    </ul>
  )
}

Sidebar.propTypes = {
  siteTitle: PropTypes.string,
}

Sidebar.defaultProps = {
  siteTitle: "",
}

export default Sidebar
