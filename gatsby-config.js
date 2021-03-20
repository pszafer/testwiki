module.exports = {
  siteMetadata: {
    title: "HomeAssistant PL",
    author: "pszafer@gmail.com",
    github: "https://github.com/HomeAssistantPL/wiki",
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
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
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: "./src/materials",
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          default: `${__dirname}/src/components/post.js`,
        },
      },
    },
    "gatsby-plugin-postcss",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
