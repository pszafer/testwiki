import React from "react"

const Burger = ({ size = "1em" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentcolor"
    viewBox="0 0 24 24"
    sx={{
      display: "block",
      margin: 0,
    }}
  >
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
)

export default props => (
  <button
    type="button"
    className="fixed z-50 bottom-4 right-4 w-16 h-16 rounded-full bg-gray-900 text-white block lg:hidden"
    {...props}
  >
    <span className="sr-only">Open site navigation</span>
    <svg
      width="24"
      height="24"
      fill="none"
      className="absolute top-1/2 left-1/2 -mt-3 -ml-3 transition duration-300 transform"
    >
      <path
        d="M4 8h16M4 16h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
    <svg
      width="24"
      height="24"
      fill="none"
      className="absolute top-1/2 left-1/2 -mt-3 -ml-3 transition duration-300 transform opacity-0 scale-80"
    >
      <path
        d="M6 18L18 6M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  </button>
)
