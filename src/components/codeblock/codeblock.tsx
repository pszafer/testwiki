import { Box, ThemeUIStyleObject, Button, ButtonProps } from "theme-ui"
import React from "react"
import Highlight from "./highlight"

export const liveEditorStyle: React.CSSProperties = {
  fontSize: 14,
  overflowX: "auto",
  fontFamily: "SF Mono, Menlo, monospace",
}


const CopyButton = (props: ButtonProps) => (
  <Button sx={{
    size:"sm",
    position:"absolute",
    textTransform:"uppercase",
    fontSize:"xs",
    height:"24px",
    top:0,
    zIndex: 1,
    right:"1.25em"
  }}
    {...props}
  />
)


const CodeContainer = (props: ThemeUIStyleObject) => (
  <Box sx={{
    padding: 5,
    rounded:"8px",
    my:8,
    bg:"#011627",
    ...props
  }} />
)

function CodeBlock(props) {
  const {
    className,
    children,
    viewlines,
    ln,
  } = props
  const editorCode = children.trim()

  const language = className?.replace(/language-/, "")
  // const { hasCopied, onCopy } = useClipboard(editorCode)




  return (
    <Box sx={{
      position: "relative",
      zIndex: 0
    }}>
      <CodeContainer px="0" overflow="hidden">
        <Highlight
          codeString={editorCode}
          language={language}
          metastring={ln}
          showLines={viewlines}
        />
      </CodeContainer>
      {/* <CopyButton top="4" onClick={onCopy}>
        {hasCopied ? "skopiowane" : "kopiuj"}
      </CopyButton> */}
    </Box>
  )
}

CodeBlock.defaultProps = {
  mountStylesheet: false,
}

export default CodeBlock
