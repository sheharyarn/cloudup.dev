import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { TwitterFollowButton } from 'react-twitter-embed';
import styles from './Header.module.sass';


const DATA = useStaticQuery(graphql`
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
`);


const Header = () => {
  const site = DATA.site.siteMetadata;

  const { twitter, github } = site.social;
  const starButtonSource = `https://ghbtns.com/github-btn.html?user=${github.user}&repo=${github.repo}&type=star&count=true`

  return (
    <header className={`${styles.container} ${styles.home}`}>
      <h3 className={styles.siteTitle}>
        <Link to={`/`} className={styles.heading}>
          {site.title}
        </Link>
      </h3>

      <p className={styles.tagline}>{site.description}</p>

      <div className={styles.meta}>
        <div className={styles.twitter}>
          <TwitterFollowButton
            screenName={twitter.user}
            options={{showScreenName: false}}
          />
        </div>

        <iframe
          src={starButtonSource}
          frameBorder="0"
          scrolling="0"
          width="100"
          height="20"
          title="GitHub">
        </iframe>
      </div>
    </header>
  );
};


export const HeaderWithContent = ({ title, content }) => {
  const site = DATA.site.siteMetadata;

  return (
    <header className={`${styles.container} ${styles.withContent}`}>
      <Link to={`/`}>
        <h3 className={styles.siteTitle}>
          {site.title}
        </h3>
      </Link>

      <h2 className={styles.title}>
        {title}
      </h2>

      <section className={styles.contentContainer}>
        {content}
      </section>
    </header>
  );
};


export default Header;
