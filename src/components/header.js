import {
  Flex,
  chakra,
  Spacer,
  Heading,
  Link,
  Center,
  HStack,
  Icon,
  Box,
  useColorModeValue,
} from "@chakra-ui/react"
import { Link as GatsbyLink } from "gatsby"
import React from "react"
import ThemeToggle from "./theme-toggle"
import Logo from "./logo"
import { AiFillGithub } from "react-icons/ai"
import { FaDiscord, FaFacebook } from "react-icons/fa"
import Search from "./search"

const searchIndices = [
  { name: `Pages`, title: `Pages` },
  { name: `Posts`, title: `Blog Posts`, type: `postHit` },
]

const LogoHeader = ({ children }) => (
  <Box display={{ base: "none", md: "flex" }}>
    <Link as={GatsbyLink} to="/" _hover={{ textDecor: "none" }} display="flex">
      <Logo />
      <Heading margin="0" ml="3" size="lg">
        {children}
      </Heading>
    </Link>
  </Box>
)

const OnlyLogo = () => (
  <Box minW="3rem" display={{ base: "block", md: "none" }}>
    <Logo />
  </Box>
)

// const Search = () => <Box minW="300px">SEARCH</Box>

const Header = ({ siteTitle, github, discord, facebook }) => {
  const bg = useColorModeValue("white", "gray.800")

  return (
    <chakra.header
      transition="box-shadow 0.2s"
      width="full"
      pos="fixed"
      shadow="sm"
      transition="box-shadow 0.2s"
      background={bg}
      borderBottom="1px"
      borderTop="6px solid"
      borderTopColor="blue.400"
      width="full"
      zIndex={3}
    >
      <chakra.div height="4.5rem" mx="auto" maxW="1400px">
        <Flex
          as="header"
          marginBottom="1.45rem"
          w="100%"
          h="100%"
          px="6"
          py="4"
          align="center"
          justify="space-between"
        >
          <Flex align="center">
            <LogoHeader>{siteTitle}</LogoHeader>
            <OnlyLogo />
          </Flex>
          <Flex
            justify="flex-end"
            w="100%"
            maxW="824px"
            align="center"
            color="gray.400"
          >
            <Search collapse indices={searchIndices} />

            <HStack spacing="5" display={{ base: "none", md: "flex" }}>
              <Link href={discord} isExternal>
                <Icon
                  as={FaDiscord}
                  w={6}
                  h={6}
                  _hover={{ color: "gray.600" }}
                />
              </Link>
              <Link href={github} isExternal>
                <Icon
                  as={AiFillGithub}
                  w={6}
                  h={6}
                  _hover={{ color: "gray.600" }}
                />
              </Link>
              <Link href={facebook} isExternal>
                <Icon
                  as={FaFacebook}
                  w={6}
                  h={6}
                  _hover={{ color: "gray.600" }}
                />
              </Link>
            </HStack>
            <ThemeToggle />
          </Flex>
        </Flex>
      </chakra.div>
    </chakra.header>
  )
}

export default Header
