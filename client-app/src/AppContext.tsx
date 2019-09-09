import React from 'react';

// Context to avoid prop drilling
const contextValue = {
  title: "Budget or Your Life for YNAB",
  token: "",
  clientId: "63b4364465cb3e94af96e1475d986911d55cd24634b583787257ddb546f78a7c"
};
const AppContext = React.createContext(contextValue);
export default AppContext;
