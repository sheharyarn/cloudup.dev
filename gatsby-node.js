const fs = require('fs');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const URLs = require('./src/utils/urls');


const ALL_CONTENT = `
  {
    docker: allYaml(filter: {fields: {tool: {eq: "docker"}}}) {
      nodes {
        variants {
          id
          files
        }
        fields { tool, platformId }
      }
    }
  }
`;



/**
 * Templates for different content types
 */
const TEMPLATES = {
  dockerVariant:  path.resolve('./src/templates/Docker/VariantTemplate.js'),
  dockerPlatform: path.resolve('./src/templates/Docker/PlatformTemplate.js'),
};



/**
 * Define Node Types and Custom Fields
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // For all Yaml files
  if (node.internal.type === `Yaml`) {
    const parent = getNode(node.parent);

    // Set tool (e.g. docker)
    createNodeField({ node, name: 'tool', value: parent.sourceInstanceName });

    // Set platform (e.g. elixir, nodejs)
    createNodeField({ node, name: 'platformId', value: parent.name });
  }
};



/**
 * Create Pages from Nodes
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(ALL_CONTENT);


  if (result.errors)
    throw result.errors;


  // Loop through all docker nodes and the nested platform variants
  result.data.docker.nodes.forEach(dockerNode => {
    const platformId = dockerNode.fields.platformId;

    // Create page for platform (e.g. /docker/elixir)
    createPage({
      path: URLs.docker.platform(platformId),
      context: { platformId },
      component: TEMPLATES.dockerPlatform,
    });


    // Create page for each variant (e.g. /docker/elixir/phoenix)
    dockerNode.variants.forEach(variantData => {
      const variantId = variantData.id;

      // Load file contents from id
      const files =
        variantData
          .files
          .reduce((acc, filetype) => {
            acc[filetype] = fs.readFileSync(`./content/docker/${platformId}/${variantId}.${filetype}`, 'utf-8');
            return acc;
          }, {});

      createPage({
        path: URLs.docker.variant(platformId, variantId),
        context: { platformId, variantId, files },
        component: TEMPLATES.dockerVariant,
      });
    });
  });

};
