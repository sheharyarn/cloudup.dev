import _ from 'lodash';
import React from 'react';
import { Link } from 'gatsby';

import Layout from 'src/components/Layout';
import styles from './DockerGenerator.module.sass';


const DockerGenerator = ({ data, location }) => {
  return (
    <Layout location={location}>
      <h1>Hello!</h1>
    </Layout>
  )
};


export default DockerGenerator;
