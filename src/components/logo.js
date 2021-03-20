import React from "react"
import { StaticImage } from "gatsby-plugin-image"

export default () => {
  return (
    <StaticImage
      src="../images/logo.png"
      alt="Logo"
      layout="fixed"
      width={40}
      height={40}
    />
  )
}
