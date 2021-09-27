import _             from 'lodash';
import React         from 'react';
import sanitizeHTML  from 'sanitize-html';
import { graphql }   from 'gatsby';

import CodeBlock     from 'src/components/CodeBlock';
import CopyButton    from 'src/components/CopyButton';
import DockerChooser from 'src/components/DockerChooser';
import ExternalLink  from 'src/components/ExternalLink';
import Icon          from 'src/components/Icon';
import Layout        from 'src/components/Layout';
import SEO           from 'src/components/SEO';
import URLs          from 'src/utils/urls';

import * as styles   from './VariantTemplate.module.sass';


/* Helpers: Apply variables to file contents */

const SANITIZE_OPTS = {
  allowedTags: [],
  allowedAttributes: {}
};

const prepareOneFile = (file, configVars, userVars) => {
  if (typeof file !== 'string')
    return null;

  return configVars.reduce((content, v) => {
    const userValue = userVars[v.name];
    const value = (userValue && userValue !== '') ? userValue : v.value;
    const cleanedValue = sanitizeHTML(value, SANITIZE_OPTS);
    const regex = new RegExp(`@{${v.name}}`, 'g');

    return content.replace(regex, cleanedValue);
  }, file);
}

const prepareAllFiles = (files, configVars, userVars) => (
  Object
    .keys(files)
    .reduce((preparedFiles, filetype) => {
      preparedFiles[filetype] = prepareOneFile(files[filetype], configVars, userVars);
      return preparedFiles;
    }, {})
);



/* Main Component */

const VariantTemplate = ({ data, location, pageContext }) => {
  const { platformId, variantId, files, readme } = pageContext;
  const { site, platform } = data;
  const github = site.siteMetadata.social.github;
  const variant = platform.variants.find(v => v.id === variantId);

  const [userVars, setVars] = React.useState({});
  const preparedFiles = prepareAllFiles(files, variant.variables, userVars);
  const preparedReadme = prepareOneFile(readme, variant.variables, userVars);
  const addVar = (name, value) => setVars(uv => ({...uv, [name]: value}));

  const githubIssues = URLs.github.repo(github.user, github.repo) + '/issues/new';
  const githubStar = `https://ghbtns.com/github-btn.html?user=${github.user}&repo=${github.repo}&type=star&count=true&size=large`

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

      <div className={styles.container}>
        {/** Column: Show readme + config builder **/}
        <div className={styles.columnInfo}>

          {/** Card: Show README when available **/}
          {preparedReadme && (
            <div className={styles.infoCard}>
              <span className={styles.cardTitle}>
                <Icon className={styles.icon} type="readme" />
                Instructions
              </span>

              <div
                className={styles.readmeContent}
                dangerouslySetInnerHTML={{ __html: preparedReadme }}
              ></div>
            </div>
          )}

          <div className={styles.infoCard}>
            <span className={styles.cardTitle}>
              <Icon className={styles.icon} type="settings" />
              Configure Variables
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

          <div className={styles.opensource}>
            <p>
              This is an Open Source project and stays alive because of the
              DevOps community sharing their time and knowledge.
            </p>
            <p>
              You can also help by reporting bugs or sharing your
              configuration on <ExternalLink url={githubIssues}>GitHub</ExternalLink>.
            </p>

            <iframe
              src={githubStar}
              frameBorder="0"
              scrolling="0"
              width="170"
              height="30"
              title="GitHub">
            </iframe>
          </div>
        </div>

        {/** Column: Show prepared files **/}
        <div className={`has-code-overrides ${styles.columnFiles}`}>
          {variant.files.map(ft => (
            <FileView
              key={ft}
              type={ft}
              text={preparedFiles[ft]}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
};


const FileView = ({ type, text }) => {
  const isMain = type === 'dockerfile';
  const [isOpen, setOpen] = React.useState(isMain);
  const klass = isOpen ? '' : styles.closed;

  const toggleOpen = () => setOpen(!isOpen);

  return (
    <div className={`${styles.file} ${klass}`}>
      <span className={styles.cardTitle}>
        <Icon className={styles.icon} type={type} />
        {_.capitalize(type)}

        <button className={styles.toggleOpen} onClick={toggleOpen}>
          <Icon type="chevron" />
        </button>

        <CopyButton
          className={styles.copyButton}
          text={text}
        />
      </span>

      <div className={styles.codeblock}>
        <CodeBlock language={type} code={text} />
      </div>
    </div>
  );
}


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
    site {
      siteMetadata {
        social {
          github { user, repo }
        }
      }
    }

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
