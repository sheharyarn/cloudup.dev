import React from 'react';
import Layout from 'src/components/Layout';
import SEO from 'src/components/SEO';
import * as styles from './NotFoundPage.module.sass';

const NotFoundPage = ({ data, location }) => {
  return (
    <Layout location={location}>
      <SEO title="404 Not Found" />

      <div className={styles.container}>
        <h1 className={styles.fof}>404 Not Found</h1>
        <h2 className={styles.heading}>
          You sure you&apos;re in the right place?
        </h2>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
