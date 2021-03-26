/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import Layout from "./src/components/layout"
import { theme } from "./src/theme"
export const wrapPageElement = ({ element, props }) => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Layout {...props}>{element}</Layout>
    </ChakraProvider>
  )
}
