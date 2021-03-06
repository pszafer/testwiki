import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"
import React from "react"

const ThemeToggle = () => {
  const { toggleColorMode } = useColorMode()
  const ToggleIcon = useColorModeValue(SunIcon, MoonIcon)

  return (
    <IconButton
      icon={<ToggleIcon />}
      variant="ghost"
      aria-label="Toggle Theme"
      ml={{ base: "0", md: "3" }}
      onClick={toggleColorMode}
    />
  )
}

export default ThemeToggle
