import React from 'react';
import Header from './Header';
import 'semantic-ui-css/semantic.min.css';

const Layout = (props) => {
  return (
    <div>
      <Header></Header>
      {props.children}

    </div>
  );
};

export default Layout;
