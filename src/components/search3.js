import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import { Formik, Form, Field } from "formik"

const SearchBar = () => {
  const data = useStaticQuery(graphql`
    query BooksIndexQuery {
      localSearchPages {
        store
        index
      }
    }
  `)
  const { index, store } = data.localSearchPages
  const [query, setQuery] = useState(null)
  const results = useFlexSearch(query, index, store)
  const regexForContent = query
    ? new RegExp(query.replace(/\W/g, ""), "gi")
    : null
  console.log("RES", results)

  return (
    <div>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setQuery(values.query)
          setSubmitting(false)
        }}
      >
        <Form>
          <Field name="query" />
        </Form>
      </Formik>
      <h1>Results</h1>
      <ul>
        {results.map(result => (
          <li key={result.id}>
            <Link to={result.path}>{result.title}</Link>
            <span>{result.body.replace(regexForContent, "<em>$&</em>")}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchBar
