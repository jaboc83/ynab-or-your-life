// 3rd Party
import React from 'react';
import CSS from 'csstype';
import Navigation from './Navigation';

const Header: React.FC<{}> = () => {
  return (
    <header style={ headerStyle }>
      <h1>Budget or Your Life for YNAB</h1>
      <Navigation />
    </header>
  );
}

const headerStyle: CSS.Properties = {
  minHeight: '8vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'calc(10px + 1vmin)',
  color: '#282c34'
};

export default Header;
