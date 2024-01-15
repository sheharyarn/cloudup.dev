import React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'accessible-nprogress';
import { navigate, graphql, useStaticQuery } from 'gatsby';

import URLs from 'src/utils/urls';
import * as styles from './DockerChooser.module.sass';

const DOCKER_CONTENT = graphql`
  {
    allPlatforms: allYaml(filter: { fields: { tool: { eq: "docker" } } }) {
      nodes {
        name
        variants {
          id
          name
        }
        fields {
          platformId
        }
      }
    }
  }
`;

const DockerChooser = (props) => {
  const platforms = useStaticQuery(DOCKER_CONTENT).allPlatforms.nodes.map(
    (p) => ({
      id: p.fields.platformId,
      name: p.name,
      variants: p.variants,
    })
  );

  const [isLoading, setLoading] = React.useState(false);
  const [platformId, setPlatform] = React.useState(props.platformId);
  const [variantId, setVariant] = React.useState(props.variantId);
  const currentPath =
    typeof window === 'undefined' ? null : window.location.pathname;

  // Find the available variants for the platform object whenever a
  // platform is selected
  const availableVariants = React.useMemo(() => {
    const chosen = platforms.find((p) => p.id === platformId);
    return (chosen && chosen.variants) || [];
  }, [platforms, platformId]);

  // Navigate to the appropriate page when variant is selected
  React.useEffect(() => {
    if (variantId && variantId !== '') {
      const path = URLs.docker.variant(platformId, variantId);

      // Don't set loading if already on page
      // setLoading(currentPath !== path);
      NProgress.start();
      navigate(path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath, variantId]);

  const klass = props.inverse ? styles.inverse : '';

  return (
    <div className={`${styles.container} ${klass}`}>
      <form className={styles.row}>
        <div className={styles.group}>
          <label htmlFor="docker-platform">Language / Platform</label>

          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select
            id="docker-platform"
            value={platformId}
            disabled={isLoading}
            onChange={(e) => {
              setPlatform(e.target.value);
              setVariant('');
            }}
          >
            <option value="" disabled>
              Choose Platform
            </option>

            {platforms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label htmlFor="docker-variant">Variant</label>

          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select
            id="docker-variant"
            value={variantId}
            disabled={isLoading}
            onChange={(e) => setVariant(e.target.value)}
          >
            <option value="" disabled>
              Choose Variant
            </option>

            {availableVariants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

DockerChooser.propTypes = {
  platformId: PropTypes.string.isRequired,
  variantId: PropTypes.string.isRequired,
};

DockerChooser.defaultProps = {
  platformId: '',
  variantId: '',
};

export default DockerChooser;
