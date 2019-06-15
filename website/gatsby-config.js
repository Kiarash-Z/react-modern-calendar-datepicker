module.exports = {
  siteMetadata: {
    title: `React Persian Calendar Date Picker`,
    description: `A lightweight, customizable, Persian date picker for React`,
    author: `Kiarash Zarinmehr`,
    version: `1.0.2`,
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
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-remove-trailing-slashes`,
  ],
};
