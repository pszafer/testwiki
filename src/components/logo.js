import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Box } from "@chakra-ui/react"

const Logo = () => {
  return (
    <Box borderRadius="full" boxSize="40px">
      <StaticImage
        height={40}
        width={40}
        src="../images/logo.svg"
        alt="Segun Adebayo"
      />
    </Box>
  )
}

export default Logo
