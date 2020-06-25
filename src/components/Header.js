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
  const { title, description } = data.site.siteMetadata;

  return (
    <header className={styles.container}>
      <h3 className={styles.title}>
        <Link to={`/`} className={styles.heading}>
          {title}
        </Link>
      </h3>

      <p className={styles.tagline}>{description}</p>
    </header>
  );
};


export default Header;
