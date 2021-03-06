import * as React from "react"
import { chakra, Icon, Stack, Link } from "@chakra-ui/react"
import { MdEdit } from "react-icons/md"

const EditPageLink = ({ href }) => {
  return (
    <Link
      href={href}
      isExternal
      _hover={{
        textDecoration: "underline",
      }}
    >
      <Stack
        display="inline-flex"
        direction="row"
        spacing={1}
        align="center"
        opacity={0.7}
      >
        <Icon as={MdEdit} mr="1" />
        <chakra.span>Edytuj tą stronę</chakra.span>
      </Stack>
    </Link>
  )
}

export default EditPageLink
