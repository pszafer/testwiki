import {
  Flex,
  chakra,
  Heading,
  Link,
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
  Icon,
  Box,
  useColorModeValue,
} from "@chakra-ui/react"
import { Link as GatsbyLink } from "gatsby"
import React from "react"
import ThemeToggle from "./theme-toggle"
import Logo from "./logo"
import { AiFillGithub, AiOutlineSearch } from "react-icons/ai"
import { FaDiscord, FaFacebook } from "react-icons/fa"

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
    <Link as={GatsbyLink} to="/" _hover={{ textDecor: "none" }} display="flex">
      <Logo />
    </Link>
  </Box>
)

const Search = () => (
  <InputGroup mr={12}>
    <InputLeftElement pointerEvents="none" children={<AiOutlineSearch />} />
    <Input type="tel" placeholder="Search..." />
  </InputGroup>
)

const Header = ({ siteTitle, github, discord, facebook }) => {
  const bg = useColorModeValue("white", "gray.800")

  return (
    <chakra.header
      transition="box-shadow 0.2s"
      width="full"
      pos="fixed"
      shadow="sm"
      background={bg}
      borderBottom="1px"
      borderTop="6px solid"
      borderTopColor="blue.400"
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
          <Flex align="center" flex={1} spacing={1}>
            <LogoHeader>{siteTitle}</LogoHeader>
            <OnlyLogo />
          </Flex>
          <Flex justify="flex-end" flex={1} align="center" color="gray.400">
            <Search />

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
