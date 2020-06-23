const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const URLs = require('./src/utils/urls');


const ALL_CONTENT = `
  {
    docker: allYaml(filter: {fields: {tool: {eq: "docker"}}}) {
      nodes {
        fields {
          tool
          platformSlug
        }
        variations { id }
      }
    }
  }
`;



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
      component: null,
    });


    // Create page for each variant
    dockerNode.variations.forEach(variant => {
      createPage({
        path: URLs.docker.variant(platform, variant),
        context: { platform, variant },
        component: null,
      });
    });
  });

};
