import React from 'react';
import { Link } from 'gatsby';

import Layout from 'src/components/Layout';
import DockerChooser from 'src/components/DockerChooser';


const VariantTemplate = ({ data, location, pageContext }) => {
  return (
    <Layout location={location}>
      <DockerChooser />
      <h1>Variant Page!</h1>
      <pre>{JSON.stringify(pageContext, null, 2)}</pre>
    </Layout>
  )
};


export default VariantTemplate;
