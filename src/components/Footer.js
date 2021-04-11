import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import ExternalLink from 'src/components/ExternalLink';
import URLs from 'src/utils/urls';

import * as styles from './Footer.module.sass';


const SITE_QUERY = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        social {
          twitter { user }
          github { user, repo }
        }
      }
    }
  }
`;


const Footer = () => {
  const data = useStaticQuery(SITE_QUERY);
  const social = data.site.siteMetadata.social;

  const twitterUser = social.twitter.user;
  const twitterUrl  = URLs.twitter.profile(twitterUser);
  const githubUrl   = URLs.github.repo(social.github.user, social.github.repo);

  return (
    <footer id="footer" className={styles.footer}>
      <span className={styles.text}>
        Created by <ExternalLink url={twitterUrl}>@{twitterUser}</ExternalLink>
      </span>

      <span className={styles.separator}> • </span>

      <span className={styles.text}>
        Contribute on <ExternalLink url={githubUrl}>GitHub</ExternalLink>
      </span>

      <span className={styles.separator}> • </span>

      <span className={styles.text}>
        Learn more at <ExternalLink url="https://shyr.io/">shyr.io</ExternalLink>
      </span>
    </footer>
  );
};


export default Footer;
