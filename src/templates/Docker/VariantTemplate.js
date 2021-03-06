import _                  from 'lodash';
import React              from 'react';
import { graphql }        from 'gatsby';

import CodeBlock     from 'src/components/CodeBlock';
import DockerChooser from 'src/components/DockerChooser';
import Icon          from 'src/components/Icon';
import Layout        from 'src/components/Layout';
import SEO           from 'src/components/SEO';

import styles        from './VariantTemplate.module.sass';



const prepareFiles = (files, configVars, userVars) => (
  Object
    .keys(files)
    .reduce((preparedFiles, filetype) => {
      preparedFiles[filetype] = configVars.reduce((content, v) => {
        const userValue = userVars[v.name];
        const value = (userValue && userValue !== '') ? userValue : v.value;
        const regex = new RegExp(`@{${v.name}}`, 'g');

        return content.replace(regex, value);
      }, files[filetype]);

      return preparedFiles;
    }, {})
);


const CopyButton = ({ code }) => {
  const onClick = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <button className={styles.copyButton} onClick={onClick}>
      Copy
    </button>
  );
};


const VariantTemplate = ({ data, location, pageContext }) => {
  const { platformId, variantId, files } = pageContext;
  const platform = data.platform;
  const variant = platform.variants.find(v => v.id === variantId);

  const [userVars, setVars] = React.useState({});
  const preparedFiles = prepareFiles(files, variant.variables, userVars);
  const addVar = (name, value) => setVars(uv => ({...uv, [name]: value}));

  return (
    <Layout
      location={location}
      title={`Dockerfile Generator`}
      headerContent={
        <DockerChooser
          platformId={platformId}
          variantId={variantId}
          inverse={true}
        />
      }>
      <SEO
        title={`${variant.name} - Dockerfile Generator`}
        description={`Generate optimized and production-ready docker configs for ${variant.name} or other types of ${platform.name} apps`}
      />


      <Banner platform={platform} variant={variant} />


      <div className={styles.configBuilder}>
        <div className={styles.configs}>
          <span className={styles.cardTitle}>
            <Icon className={styles.icon} type="settings" />
            Configure Settings
          </span>

          <div className={styles.vars}>
            {variant.variables.map(v => (
              <div key={v.name} className={styles.group}>
                <label>
                  {v.name}

                  <input
                    type="text"
                    name={v.name}
                    aria-label={`Variable value for '${v.name}'`}
                    placeholder={v.value}
                    onChange={e => addVar(v.name, e.target.value)}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.files}>
          {variant.files.map(ft => (
            <div key={ft} className={`${styles.file}`}>
              <span className={styles.cardTitle}>
                <Icon className={styles.icon} type={ft} />
                {_.capitalize(ft)}
                <CopyButton code={preparedFiles[ft]} />
              </span>

              <CodeBlock language={ft} code={preparedFiles[ft]} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
};


const Banner = ({ platform, variant }) => (
  <div className={styles.banner}>
    <h1>{variant.name}</h1>
    {/*<h2>{platform.name}</h2>*/}
    <hr/>
    <p>Get started with Docker for your {platform.name} project with optimized and production-ready configs below</p>
  </div>
);



export const pageQuery = graphql`
  query DockerConfigById($platformId: String!) {
    platform: yaml(fields: {
      tool: { eq: "docker" }
      platformId: { eq: $platformId }
    }) {
      name
      variants {
        id
        name
        description
        files
        variables { name, value }
      }
    }
  }
`;


export default VariantTemplate;
