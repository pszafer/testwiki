import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import Layout from './components/layout'
import { theme } from './theme'

export const wrapPageElement = ({ element, props }) => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Layout {...props}>{element}</Layout>
    </ChakraProvider>
  )
}
