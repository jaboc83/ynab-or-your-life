// 3rd Party
import React, { CSSProperties } from "react";
import Navigation from "./Navigation";

// CSS / Images
const headerStyle: CSSProperties = {
  minHeight: "8vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "calc(10px + 1vmin)",
  color: "#282c34"
};

// Component
const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <h1>Budget or Your Life for YNAB</h1>
      <Navigation />
    </header>
  );
};

export default Header;
