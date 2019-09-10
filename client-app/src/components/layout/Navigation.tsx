import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Navigation: React.FC = () => {
  return (
    <Nav>
      <NavItem>
        <NavLink active href="/">Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Privacy">Privacy</NavLink>
      </NavItem>
    </Nav>
  );
}

export default Navigation;
