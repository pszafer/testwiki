import React from "react"
import { Button, useColorModeValue } from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"

const MenuButton = ({ toggle, isOpen }) => {
  return (
    <Button
      display={{ base: "flex", md: "none" }}
      position="fixed"
      onClick={toggle}
      bg={useColorModeValue("blue.200", "gray.600")}
      zIndex={10}
      bottom={12}
      py={8}
      px={6}
      right={10}
      borderRadius="full"
    >
      {isOpen ? <CloseIcon w={6} h={6} /> : <HamburgerIcon w={6} h={6} />}
    </Button>
  )
}

export default MenuButton
