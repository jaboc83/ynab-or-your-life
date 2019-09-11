// 3rd Party
import React, { useState, useEffect, CSSProperties } from "react";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RouteComponentProps } from "react-router";

// Other Components
import Header from "./layout/Header";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import BudgetList from "./pages/BudgetList";
import Budget from "./pages/Budget";

// Styling
const appStyle: CSSProperties = {
  textAlign: "center"
};

// Constants
const BASE_URL =
  document.getElementsByTagName("base")[0].getAttribute("href") || undefined;
const SEARCH = window.location.hash
  .substring(1)
  .replace(/&/g, '","')
  .replace(/=/g, '":"');

// Component
const App: React.FC = () => {
  // State Hooks
  const [budgetId, setBudgetId] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [title, setTitle] = useState("Budget or Your Life for YNAB");
  const [token, setToken] = useState("");
  const [clientId, setClientId] = useState(
    "63b4364465cb3e94af96e1475d986911d55cd24634b583787257ddb546f78a7c"
  );

  // Effect Hooks
  useEffect(() => {
    if (SEARCH && SEARCH !== "") {
      // Try to get access_token from the hash returned by OAuth
      const params = JSON.parse(`{"${SEARCH}"}`, (key, value) => {
        return key === "" ? value : decodeURIComponent(value);
      });
      setToken(params.access_token);
      sessionStorage.setItem("ynab_access_token", token || "");
      window.location.hash = "";
    } else {
      // Otherwise try sessionStorage
      setToken(sessionStorage.getItem("ynab_access_token") || "");
    }

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("budgetId")) {
      setBudgetId(urlParams.get("budgetId")!);
    }

    if (urlParams.has("currencySymbol")) {
      setCurrencySymbol(urlParams.get("currencySymbol")!);
    }
  });

  // UI Partials
  const home = (
    <Route
      exact
      path="/"
      render={(props: RouteComponentProps) => (
        <Home {...props} accessToken={token} clientId={clientId} />
      )}
    />
  );
  const budget = (
    <Route
      exact
      path="/Budget"
      render={(props: RouteComponentProps) => (
        <Budget
          {...props}
          accessToken={token || ""}
          budgetId={budgetId || ""}
          currencySymbol={currencySymbol}
        />
      )}
    />
  );
  const budgetList = (
    <Route
      exact
      path="/BudgetList"
      render={(props: RouteComponentProps) => (
        <BudgetList {...props} accessToken={token || ""} />
      )}
    />
  );
  const privacy = <Route exact path="/Privacy" component={Privacy} />;

  return (
    <div style={appStyle}>
      <Header />
      <Router basename={BASE_URL}>
        <Container>
          {home}
          {budget}
          {budgetList}
          {privacy}
        </Container>
      </Router>
    </div>
  );
};

export default App;
