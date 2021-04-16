import React         from 'react';

import DockerChooser from 'src/components/DockerChooser';
import Layout        from 'src/components/Layout';
import SEO           from 'src/components/SEO';

import * as styles   from './HomePage.module.sass';


const HomePage = ({ data, location }) => {
  return (
    <Layout location={location}>
      <SEO title="Home" homepage />

      <div className={styles.tools}>
        <div className={styles.dockerTool}>
          <h2>No-Nonsense Dockerfiles</h2>

          <p>
            Use our community sourced Dockerfile generator to quickly
            set up Docker for your next project with optimized and
            production-ready images and configs
          </p>

          <DockerChooser />
        </div>
      </div>
    </Layout>
  )
};


export default HomePage;
