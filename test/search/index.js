import React, { useState, useEffect, useMemo, createRef } from "react"
import {
  connectStateResults,
  Index,
  InstantSearch,
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"
import { Box, Flex } from "@chakra-ui/react"
// import { HitsWrapper, PoweredBy, Root } from "./styles"
import Hits from "./hits"
import Input from "./input"
const Results = connectStateResults(
  ({ searching, searchState: state, searchResults: res }) => (
    <div>
      {(searching && `Searching...`) ||
        (res?.nbHits === 0 && `No results for '${state.query}'`)}
    </div>
  )
)
const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res?.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)
const useOnClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = event =>
    !ref.current.contains(event.target) && handler()
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside)
    }
  })
}
const appId = process.env.GATSBY_ALGOLIA_APP_ID
const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KE
export default function Search({ indices, collapse = true, size, ...rest }) {
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  // useMemo prevents the searchClient from being recreated on every render.
  // Avoids unnecessary XHR requests (see https://tinyurl.com/yyj93r2s).
  const searchClient = useMemo(() => algoliasearch(appId, searchKey), [])
  useOnClickOutside(ref, () => setFocus(false))
  return (
    <Flex ref={ref} {...rest}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <Input onFocus={() => setFocus(true)} {...{ size, collapse, focus }} />
        <div>
          {indices.map(({ name, title, type }) => (
            <Index key={name} indexName={name}>
              <header>
                <h3>{title}</h3>
                <Stats />
              </header>
              <Results />
              <Hits type={type} onClick={() => setFocus(false)} />
            </Index>
          ))}
          {/* <PoweredBy /> */}
        </div>
      </InstantSearch>
    </Flex>
  )
}
