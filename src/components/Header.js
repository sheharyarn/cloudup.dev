import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styles from './Header.module.sass';


const SITE_QUERY = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;


const Header = () => {
  const data = useStaticQuery(SITE_QUERY);
  const site = data.site.siteMetadata;

  return (
    <header className={`${styles.container} ${styles.home}`}>
      <h3 className={styles.title}>
        <Link to={`/`} className={styles.heading}>
          {site.title}
        </Link>
      </h3>

      <p className={styles.tagline}>{site.description}</p>
    </header>
  );
};


export const HeaderWithContent = ({ title, content }) => {
  const data = useStaticQuery(SITE_QUERY);
  const site = data.site.siteMetadata;

  return (
    <header className={`${styles.container} ${styles.withContent}`}>
        <Link to={`/`} className={styles.heading}>
      <h3 className={styles.title}>
          {site.title}
      </h3>
        </Link>
    </header>
  );
};


export default Header;
