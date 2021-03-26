const queryTemplate = (filters = ``, fields = ``) => `{
    allMdx(filter: {${filters}}) {
      nodes {
        objectID: id
        frontmatter {
          title
          ${fields}
        }
        slug
        excerpt(pruneLength: 5000)
      }
    }
  }`
const flatten = arr =>
  arr.map(({ frontmatter, ...rest }) => ({ ...frontmatter, ...rest }))
const settings = { attributesToSnippet: [`excerpt:20`] }
const queries = [
  //   {
  //     query: queryTemplate(`frontmatter: {purpose: {eq: "page"}}`),
  //     transformer: res => flatten(res.data.allMdx.nodes),
  //     indexName: `Pages`,
  //     settings,
  //   },
  {
    query: queryTemplate(`fileAbsolutePath: {regex: "/materials/"}`, `tags`),
    transformer: res => flatten(res.data.allMdx.nodes),
    indexName: `HAPL`,
    settings,
  },
]
module.exports = queries
