const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)


/**
 * Define Node Types and Custom Fields
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // For all Markdown files
  if (node.internal.type === `MarkdownRemark`) {

    // Use parent directory for node type
    const nodeType = getNode(node.parent).sourceInstanceName;
    createNodeField({
      node,
      name: 'type',
      value: nodeType,
    });

    // Use frontmatter value for slug
    createNodeField({
      node,
      name: `slug`,
      value: node.frontmatter.slug
    });
  }
};

