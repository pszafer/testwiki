import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Box, Img } from "@chakra-ui/react"

export default () => {
  return (
    <Box borderRadius="full" boxSize="40px">
      <StaticImage
        height={40}
        width={40}
        src="../images/logo.png"
        alt="Segun Adebayo"
      />
    </Box>
  )
}
