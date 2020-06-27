import React from 'react';
import { navigate, graphql, useStaticQuery } from 'gatsby';

import URLs from 'src/utils/urls';
import styles from './DockerChooser.module.sass';


/* eslint-disable jsx-a11y/no-onchange */


const DOCKER_CONTENT = graphql`
  {
    allPlatforms: allYaml(filter: {fields: {tool: {eq: "docker"}}}) {
      nodes {
        name
        variants {
          id
          name
        }
        fields { platformId }
      }
    }
  }
`;


const openConfig = (platform, variant) =>
  navigate(URLs.docker.variant(platform, variant));


const DockerChooser = () => {
  const platforms =
    useStaticQuery(DOCKER_CONTENT)
      .allPlatforms
      .nodes
      .map(p => ({
        id: p.fields.platformId,
        name: p.name,
        variants: p.variants
      }));


  const [platformId, setPlatform] = React.useState(null);
  const chosen = platforms.find(p => p.id === platformId);
  const variants = (chosen && chosen.variants) || [];


  return (
    <form className={styles.container}>
      <div className={styles.group}>
        <label htmlFor="docker-platform">Language / Platform</label>

        <select
          id="docker-platform"
          defaultValue=""
          onChange={e => setPlatform(e.target.value)}
        >
          <option value="" disabled>
            Choose Platform
          </option>

          {platforms.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label htmlFor="docker-variant">Variant</label>

        <select
          id="docker-variant"
          defaultValue=""
          onChange={e => openConfig(platformId, e.target.value)}
        >
          <option value="" disabled>
            Choose Variant
          </option>

          {variants.map(v => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};


export default DockerChooser;
