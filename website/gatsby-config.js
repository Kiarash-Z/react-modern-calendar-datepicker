module.exports = {
  siteMetadata: {
    title: `React Persian Calendar Date Picker`,
    description: `A lightweight, customizable, Persian date picker for React`,
    author: `Kiarash Zarinmehr`,
    version: `1.0.0`,
  },
  pathPrefix: `/react-persian-calendar-date-picker`,
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
    'gatsby-plugin-svgr',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `react-persian-calendar-date-picker`,
        short_name: `Persian Picker`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#0eca2d`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        include_favicon: false,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-remove-trailing-slashes`,
  ],
};
