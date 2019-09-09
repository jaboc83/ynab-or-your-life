// 3rd Party
import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import CSS from 'csstype';

interface HeaderProps {}

class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <header style={headerStyle}>
        <h1>Budget or Your Life for YNAB</h1>
        <Nav>
          <NavItem>
            <NavLink active href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Privacy">Privacy</NavLink>
          </NavItem>
        </Nav>
      </header>
    );
  }
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
