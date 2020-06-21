import React from 'react';
import Header from 'src/components/Header';

import 'src/styles/base.sass'


const Layout = ({ location, children }) => {
  return (
    <>
      <Header />
      {children}
      <footer></footer>
    </>
  );
};


export default Layout;
