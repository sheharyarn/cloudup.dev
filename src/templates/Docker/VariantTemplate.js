import React from 'react';
import { Link } from 'gatsby';

import Layout from 'src/components/Layout';


const VariantTemplate = ({ data, location, pageContext }) => {
  return (
    <Layout location={location}>
      <h1>Variant Page!</h1>
      <pre>{JSON.stringify(pageContext, null, 2)}</pre>
    </Layout>
  )
};


export default VariantTemplate;
