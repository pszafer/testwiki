import React from "react"
import { Box } from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"

const MenuButton = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle} mr={1}>
      {isOpen ? <CloseIcon w={6} h={6} /> : <HamburgerIcon w={6} h={6} />}
    </Box>
  )
}

export default MenuButton
