import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import ExternalLink from 'src/components/ExternalLink';
import URLs from 'src/utils/urls';

import styles from './Footer.module.sass';


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


const Footer = () => {
  const data = useStaticQuery(SITE_QUERY);
  const site = data.site.siteMetadata;
  const username = site.social.twitter.user;

  return (
    <footer id="footer" className={styles.footer}>
      Created by{' '}
      <ExternalLink url={URLs.twitter.profile(username)}>
        @{username}
      </ExternalLink>

      <span className={styles.separator}> • </span>

      Learn more about cloud applications at{' '}
      <ExternalLink url="https://shyr.io/">
        shyr.io
      </ExternalLink>
    </footer>
  );
};


export default Footer;
