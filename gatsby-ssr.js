import React from "react"
import { theme } from "./src/theme"
import { wrapPageElement as wrap } from "./src/woot-wapper"
import { ColorModeScript } from "@chakra-ui/react"

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={theme.config.initialColorMode}
      key="chakra-ui-no-flash"
    />,
  ])
}

export const wrapPageElement = wrap
