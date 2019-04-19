module.exports = {
  siteMetadata: {
    title: `React Persian Calendar Date Picker`,
    description: `A lightweight, customizable, Persian date picker for React`,
    author: `Kiarash Zarinmehr`,
    version: `1.0.0`,
  },
  pathPrefix: "/react-persian-calendar-date-picker",
  plugins: [
    `gatsby-plugin-react-helmet`,
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
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#0eca2d`,
        display: `minimal-ui`,
        icon: `src/images/fav512.png`,
        legacy: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
