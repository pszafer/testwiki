import React from "react"
import { MDXProvider } from "@mdx-js/react"
import CodeBlock from "./code-block"
import { Link } from "gatsby"

const components = {
  pre: props => <div {...props} />,
  h1: props => <h1 className="text-4xl font-light my-4" {...props} />,
  p: props => <p className="my-2" {...props} />,
  ul: props => <ul className="list-disc ml-4" {...props} />,
  a: props => <a className="text-blue-600 font-semibold" {...props} />,
  code: CodeBlock,
}

export default ({
  pageContext: {
    frontmatter: { tags, has_toc },
  },
  children,
}) => {
  return (
    <main className="pl-24 pr-14 py-4 min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
      {tags &&
        tags.map(x => (
          <Link className="mr-2 text-gray-500" to={`/tags/${x}`}>
            #{x}
          </Link>
        ))}
      <MDXProvider components={components}>{children}</MDXProvider>
    </main>
  )
}
