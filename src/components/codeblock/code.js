/** @jsx jsx */
import { jsx, Text } from "theme-ui"
import Prism from "./"

const Code = props => {
  if (props.filename) {
    return (
      <section>
        <Text
          as="span"
          sx={{
            display: "block",
            bg: "gray",
            color: "background",
            px: 3,
            py: 2,
            fontWeight: "bold",
          }}
        >
          {props.filename}
        </Text>
        <Prism {...props} sx={{ mt: 0 }} />
      </section>
    )
  }
  return <Prism {...props} />
}

export default Code
