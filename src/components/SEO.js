import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';


const SITE_QUERY = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        social {
          twitter { user }
        }
      }
    }
  }
`;


const SEO = ({ description, meta, title, homepage }) => {
  const data = useStaticQuery(SITE_QUERY);
  const siteMetadata = data.site.siteMetadata;

  const titleTemplate = homepage ? siteMetadata.title : `%s | ${siteMetadata.title}`;
  const metaDescription = description || siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={title}
      titleTemplate={titleTemplate}
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
          content: `@${siteMetadata.social.twitter.user}`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
}

SEO.defaultProps = {
  meta: [],
  description: ``,
  homepage: false,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
