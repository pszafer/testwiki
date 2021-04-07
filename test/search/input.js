import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { FormControl, Input, IconButton } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"

export default connectSearchBox(({ refine, ...rest }) => (
  <FormControl>
    <Input
      type="text"
      placeholder="Search"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      // iOS Safari doesn't blur input automatically on tap outside.
      onMouseLeave={e => e.target.blur()}
      {...rest}
    />
    <IconButton aria-label="Search database" icon={<SearchIcon />} />
  </FormControl>
))
