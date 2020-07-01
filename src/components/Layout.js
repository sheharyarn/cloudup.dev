import React from 'react';
import Header, { HeaderWithContent } from 'src/components/Header';
import URLs from 'src/utils/urls';

import 'src/styles/base.sass'


const Layout = ({ location, title, headerContent, children }) => {
  const header =
    (location.pathname === URLs.root())
      ? <Header />
      : <HeaderWithContent title={title} content={headerContent} />

  return (
    <>
      {header}
      {children}
      <footer></footer>
    </>
  );
};


export default Layout;
