/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import logoFavIcon from '../images/icon.png';

function SEO({ description, lang, meta, keywords, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : [],
        )
        .concat(meta)}
    >
      <meta name="description" content="A lightweight, customizable, Persian date picker for React" />
      <meta name="image" content="https://user-images.githubusercontent.com/20098648/56985883-9debec80-6b9e-11e9-90cc-eeda8ac2f5a9.png" />
      <meta itemProp="name" content="react-persian-calendar-date-picker" />
      <meta itemProp="description" content="A lightweight, customizable, Persian date picker for React" />
      <meta itemProp="image" content="https://user-images.githubusercontent.com/20098648/56985883-9debec80-6b9e-11e9-90cc-eeda8ac2f5a9.png" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="react-persian-calendar-date-picker" />
      <meta name="twitter:description" content="A lightweight, customizable, Persian date picker for React" />
      <meta name="twitter:image:src" content="https://user-images.githubusercontent.com/20098648/56985883-9debec80-6b9e-11e9-90cc-eeda8ac2f5a9.png" />
      <meta name="og:title" content="react-persian-calendar-date-picker" />
      <meta name="og:description" content="A lightweight, customizable, Persian date picker for React" />
      <meta name="og:image" content="https://user-images.githubusercontent.com/20098648/56985883-9debec80-6b9e-11e9-90cc-eeda8ac2f5a9.png" />
      <meta name="og:url" content="https://kiarash-z.github.io/react-persian-calendar-date-picker" />
      <meta name="og:type" content="website" />

      <link rel="shortcut icon" href={logoFavIcon} />
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export { SEO };
