const fs = require('fs');
const path = require('path');
// const remark = require('remark');
// const remarkHtml = require('remark-html');
const { createFilePath } = require('gatsby-source-filesystem');

const URLs = require('./src/utils/urls');

const ALL_CONTENT = `
  {
    docker: allYaml(
      filter: { fields: { tool:  { eq: "docker" } } }
    ) {
      nodes {
        variants {
          id
          files
        }
        fields { tool, platformId }
      }
    }

    readmes: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/readme.md$/" } }
    ) {
      nodes {
        fileAbsolutePath
        html
      }
    }

  }
`;

/**
 * Templates for different content types
 */
const TEMPLATES = {
  dockerVariant: path.resolve('./src/templates/Docker/VariantTemplate.js'),
  dockerPlatform: path.resolve('./src/templates/Docker/PlatformTemplate.js'),
};

/**
 * Define Node Types and Custom Fields
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // For all Yaml files
  if (node.internal.type === `Yaml`) {
    const parent = getNode(node.parent);
    const toolName = parent.sourceInstanceName;

    // Set tool (e.g. docker)
    createNodeField({ node, name: 'tool', value: toolName });

    if (toolName === 'docker') {
      // Set platform (e.g. elixir, nodejs)
      createNodeField({ node, name: 'platformId', value: parent.name });
    }
  }
};

/**
 * Create Pages from Nodes
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(ALL_CONTENT);

  if (result.errors) throw result.errors;

  const readmes = result.data.readmes.nodes;

  // Loop through all docker nodes and the nested platform variants
  result.data.docker.nodes.forEach((dockerNode) => {
    const platformId = dockerNode.fields.platformId;

    // // Create page for platform (e.g. /docker/elixir)
    // createPage({
    //   path: URLs.docker.platform(platformId),
    //   context: { platformId },
    //   component: TEMPLATES.dockerPlatform,
    // });

    // Create page for each variant (e.g. /docker/elixir/phoenix)
    dockerNode.variants.forEach((variantData) => {
      const variantId = variantData.id;
      const variantRoot = `docker/${platformId}/${variantId}`;
      const readmePath = `/${variantRoot}/readme.md`;
      const readmeNode = readmes.find((r) =>
        r.fileAbsolutePath.endsWith(readmePath)
      );
      const readme = readmeNode && readmeNode.html;

      // Load file contents from id
      const files = variantData.files.reduce((acc, filetype) => {
        const path = `./content/${variantRoot}/${filetype}`;
        acc[filetype] = fs.readFileSync(path, 'utf-8');
        return acc;
      }, {});

      createPage({
        path: URLs.docker.variant(platformId, variantId),
        context: { platformId, variantId, files, readme },
        component: TEMPLATES.dockerVariant,
      });
    });
  });
};

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  // Fix issue where NProgress cannot be imported during build stage
  // https://github.com/gatsbyjs/gatsby/issues/8612
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /accessible-nprogress/,
            use: ['null-loader'],
          },
        ],
      },
    });
  }
};
