const queries = require("./src/utils/algolia")
require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: "HomeAssistant PL",
    author: "pszafer@gmail.com",
    github: "https://github.com/HomeAssistantPL/wiki",
    facebook: "https://www.facebook.com/groups/homeassistantpolska/",
    discord: "https://discord.gg/eqP6VsV4Wa",
    siteUrl: "https://hapl.help",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `HA Polska Wiki`,
        short_name: `HAPL`,
        start_url: `/`,
        background_color: `#63B3ED`,
        theme_color_in_head: false,
        display: `standalone`,
        icon: `src/images/logo.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "materials",
        path: "./src/materials/",
      },
      __key: "materials",
    },
    `gatsby-remark-images`,
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          default: `${__dirname}/src/components/index-template.js`,
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
        ],
        // remarkPlugins: [require("remark-toc")],
        rehypePlugins: [
          require("rehype-slug"),
          [require("rehype-autolink-headings"), { behavior: "wrap" }],
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-algolia`,
    //   options: {
    //     appId: process.env.GATSBY_ALGOLIA_APP_ID,
    //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
    //     indexName: process.env.ALGOLIA_INDEX_NAME,
    //     queries,
    //     chunkSize: 10000, // default: 1000
    //     matchFields: ["matchFields"],
    //     // matchFields: ["slug", "modified"],
    //   },
    // },
    "@chakra-ui/gatsby-plugin",
    // "gatsby-plugin-postcss",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "pages",
        engine: "flexsearch",
        engineOptions: "speed",
        query: `
          {
            allMdx(filter: {fileAbsolutePath: {regex: "/materials/"}}) {
              nodes {
                id
                frontmatter {
                  title
                }
                slug
                rawBody
              }
            }
          }
        `,
        ref: "id",
        index: ["title", "body"],
        store: ["id", "path", "title", "body"],
        normalizer: ({ data }) =>
          data.allMdx.nodes.map(node => ({
            id: node.id,
            slug: node.slug,
            title:
              node.frontmatter.title ||
              node.slug.substring(node.slug.lastIndexOf("/") + 1),
            body: node.rawBody,
          })),
      },
    },
  ],
}
