const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        "8xl": "90rem",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: colors.white,
        gray: colors.blueGray,
        red: colors.red,
        blue: colors.lightBlue,
        yellow: colors.amber,
        green: colors.emerald,
        black: colors.black,
        lime: colors.lime,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
