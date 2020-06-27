import React from 'react';
import { navigate, graphql, useStaticQuery } from 'gatsby';

import URLs from 'src/utils/urls';
import styles from './DockerChooser.module.sass';


const DOCKER_CONTENT = graphql`
  {
    docker: allYaml(filter: {fields: {tool: {eq: "docker"}}}) {
      nodes {
        platform
        variations {
          id
          name
        }
        fields { platformSlug }
      }
    }
  }
`;


const open = (platform, variant) =>
  navigate(URLs.docker.variant(platform, variant));


const DockerChooser = () => {
  const platforms =
    useStaticQuery(DOCKER_CONTENT)
      .docker
      .nodes
      .map(p => ({
        id: p.fields.platformSlug,
        name: p.platform,
        variations: p.variations
      }));


  const [platformId, setPlatform] = React.useState(null);
  const chosen = platforms.find(p => p.id == platformId);
  const variations = chosen && chosen.variations || [];


  return (
    <form className={styles.container}>
      <div className={styles.group}>
        <label for="docker-platform">Language / Platform</label>

        <select
          id="docker-platform"
          onChange={e => setPlatform(e.target.value)}
        >
          <option value="" selected disabled>
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
        <label for="docker-variation">Variation</label>

        <select
          id="docker-variation"
          onChange={e => open(platformId, e.target.value)}
        >
          <option value="" selected disabled>
            Choose Variation
          </option>

          {variations.map(v => (
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
