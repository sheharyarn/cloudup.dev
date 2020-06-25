const fs = require('fs');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const URLs = require('./src/utils/urls');


const ALL_CONTENT = `
  {
    docker: allYaml(filter: {fields: {tool: {eq: "docker"}}}) {
      nodes {
        variations {
          id
          files
        }
        fields { tool, platformSlug }
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
    createNodeField({ node, name: 'platformSlug', value: parent.name });
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
    const platform = dockerNode.fields.platformSlug;

    // Create page for platform (e.g. /docker/elixir)
    createPage({
      path: URLs.docker.platform(platform),
      context: { platform },
      component: TEMPLATES.dockerPlatform,
    });


    // Create page for each variant (e.g. /docker/elixir/phoenix)
    dockerNode.variations.forEach(variantData => {
      const variant = variantData.id;

      // Load file contents from id
      const files =
        variantData
          .files
          .reduce((acc, filetype) => {
            acc[filetype] = fs.readFileSync(`./content/docker/${platform}/${variant}.${filetype}`, 'utf-8');
            return acc;
          }, {});

      createPage({
        path: URLs.docker.variant(platform, variant),
        context: { platform, variant, files },
        component: TEMPLATES.dockerVariant,
      });
    });
  });

};
