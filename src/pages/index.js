import { graphql } from 'gatsby';

// TODO:
// Replace the following with `export { default } ...`
// once this issue is resolved: https://github.com/gatsbyjs/gatsby/issues/12384
import Component from 'src/templates/HomePage';
export default Component;

export const pageQuery = graphql`
  query {
    posts: allMarkdownRemark(
      sort:   { fields: [frontmatter___date], order: DESC }
      filter: { fields: { type: { eq: "blog" } } }
      limit:  7
    ) { ...MarkdownFragment }

    talks: allMarkdownRemark(
      sort:   { fields: [frontmatter___date], order: DESC }
      filter: { fields: { type: { eq: "talks" } } }
      limit:  4
    ) { ...MarkdownFragment }

    site {
      siteMetadata {
        social { github, twitter, linkedin, stackoverflow }
      }
    }
  }

  fragment MarkdownFragment on MarkdownRemarkConnection {
    edges {
      node {
        excerpt
        frontmatter { date, title, description }
        fields { slug }
      }
    }
  }
`;
