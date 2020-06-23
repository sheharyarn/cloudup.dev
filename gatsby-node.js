const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)


/**
 * Define Node Types and Custom Fields
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // For all Yaml files
  if (node.internal.type === `Yaml`) {
    const parent = getNode(node.parent);

    // Set tool (e.g. docker)
    createNodeField({
      node,
      name: 'tool',
      value: parent.sourceInstanceName,
    });

    // Set platform (e.g. elixir, nodejs)
    createNodeField({
      node,
      name: 'platform',
      value: parent.name,
    })
  }
};

