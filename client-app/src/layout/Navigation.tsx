// 3rd Party
import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

// Component
const Navigation: React.FC = () => {
  return (
    <Nav>
      <NavItem>
        <NavLink active href="/">
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Privacy">Privacy</NavLink>
      </NavItem>
    </Nav>
  );
};

export default Navigation;
