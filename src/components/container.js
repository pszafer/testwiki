/** @jsx jsx */
import { jsx, Box } from "theme-ui"

export const Container = ({ children, ...props }) => (
  <Box
    sx={{
      width: "full",
      pb: 5,
      pt: 3,
      maxWidth: "1400px",
      mx: "auto",
      px: ["0", 4],
    }}
    {...props}
  >
    {children}
  </Box>
)

export default Container
