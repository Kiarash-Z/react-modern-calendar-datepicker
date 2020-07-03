module.exports = {
  siteMetadata: {
    title: `React Modern Calendar Date Picker`,
    description: `A modern, beautiful, customizable date picker for React`,
    author: `Kiarash Zarinmehr`,
    version: `3.1.6`,
  },
  pathPrefix: `/react-modern-calendar-datepicker`,
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
