import React         from 'react';
import { graphql }   from 'gatsby';

import Layout        from 'src/components/Layout';
import SEO           from 'src/components/SEO';
import DockerChooser from 'src/components/DockerChooser';


const VariantTemplate = ({ data, location, pageContext }) => {
  const platformName = data.docker.platform;
  const variation = "";
  const description = "";
  const title = `Docker Config Generator`;

  return (
    <Layout location={location}>
      <SEO title={title} description={description} />

      <DockerChooser />

      <h1>Variant Page!</h1>
      <pre>{JSON.stringify({data, pageContext}, null, 2)}</pre>
    </Layout>
  )
};


export const pageQuery = graphql`
  query DockerConfigById($platformId: String!) {
    docker: yaml(fields: {
      tool: { eq: "docker" }
      platformId: { eq: $platformId }
    }) {
      name
      variations {
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
