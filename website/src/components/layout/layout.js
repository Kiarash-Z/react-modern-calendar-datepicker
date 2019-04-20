/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import { Navbar } from './navbar';
import Footer from './footer';

const Layout = ({ children, style }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            version
          }
        }
      }
    `}
    render={data => {
      const { siteMetadata } = data.site;
      return (
        <>
          <Navbar version={siteMetadata.version} />
          <main style={{ marginTop: '7rem', ...style }}>{children}</main>
          <Footer />
        </>
      );
    }}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Layout };
