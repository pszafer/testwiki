/** @jsx jsx */
import { jsx } from "theme-ui"
import BaseHighlight, { defaultProps, Language } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwl"
import { liveEditorStyle } from "./codeblock"
import React from "react"

const RE = /{([\d,-]+)}/

const calculateLinesToHighlight = (meta: string) => {
  if (!RE.test(meta)) {
    return () => false
  }
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)))

  return (index: number) => {
    const lineNumber = index + 1
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
    )
    return inRange
  }
}

interface HighlightProps {
  codeString: string
  language: Language
  metastring?: string
  showLines?: boolean
}

function Highlight({
  codeString,
  language,
  metastring,
  showLines,
  ...props
}: HighlightProps) {
  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  return (
    <div>test</div>
    // <BaseHighlight
    //   {...defaultProps}
    //   code={codeString}
    //   language={language}
    //   theme={theme}
    //   {...props}
    // >
    //   {({ className, style, tokens, getLineProps, getTokenProps }) => (
    //     <div style={liveEditorStyle} data-language={language}>
    //       <pre className={className} style={style}>
    //         {tokens.map((line, i) => {
    //           const lineProps = getLineProps({ line, key: i })
    //           return (
    //             <div sx={{
    //               px: 5,
    //               bg:shouldHighlightLine(i) ? "white" : undefined
    //             }}
    //               {...lineProps}
    //             >
    //               {showLines && (
    //                 <span sx={{
    //                   opacity: 0.3,
    //                   mr: 6,
    //                   fontSize: "xs"
    //                 }}>
    //                   {i + 1}
    //                 </span>
    //               )}
    //               {line.map((token, key) => (
    //                 <span {...getTokenProps({ token, key })} />
    //               ))}
    //             </div>
    //           )
    //         })}
    //       </pre>
    //     </div>
    //   )}
    // </BaseHighlight>
  )
}

export default Highlight
