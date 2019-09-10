// 3rd Party
import React from 'react';
import CSS from 'csstype';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

// Other Components
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Privacy from './components/pages/Privacy';
import BudgetList from './components/pages/BudgetList';
import Budget from './components/pages/Budget';

// Constants
const BASE_URL = document.getElementsByTagName('base')[0].getAttribute('href') || undefined;
const SEARCH = window.location.hash.substring(1).replace(/&/g, '","').replace(/=/g,'":"');

// Interfaces
interface AppState {
  budgetId: string | null,
  currencySymbol: string,
  title: string,
  token: string | null,
  clientId: string | null
}

// Component
class App extends React.Component<{}, AppState> {
  state: AppState = {
    budgetId: null,
    currencySymbol: "$",
    title: "Budget or Your Life for YNAB",
    token: null,
    clientId: "63b4364465cb3e94af96e1475d986911d55cd24634b583787257ddb546f78a7c"
  };

  constructor(props: {}) {
    super(props);
    if (SEARCH && SEARCH !== '') {
      // Try to get access_token from the hash returned by OAuth
      const params = JSON.parse(`{"${SEARCH}"}`, (key, value) => {
        return key === '' ? value : decodeURIComponent(value);
      });
      this.state.token = params.access_token;
      sessionStorage.setItem('ynab_access_token', this.state.token || "");
      window.location.hash = '';
    } else {
      // Otherwise try sessionStorage
      this.state.token = sessionStorage.getItem('ynab_access_token') || "";
    }

    const urlParams = new URLSearchParams(window.location.search);

    if(urlParams.has('budgetId')) {
      this.state.budgetId = urlParams.get('budgetId');
    }

    if(urlParams.has('currencySymbol')) {
      this.state.currencySymbol = urlParams.get('currencySymbol')!;
    }
  }

  // Render UI
  render() {

    // UI Partials
    const home = (
      <Route exact path="/"
        render={ (props: RouteComponentProps) =>
          <Home { ...props }
            accessToken={ this.state.token }
            clientId={ this.state.clientId } />
        }
      />
    );
    const budget = (
      <Route exact path="/Budget"
        render={ (props: RouteComponentProps) =>
          <Budget {...props}
            accessToken={this.state.token || ""}
            budgetId={this.state.budgetId || ""}
            currencySymbol={ this.state.currencySymbol } />
          }
      />
    );
    const budgetList = (
      <Route exact path="/BudgetList"
        render={ (props: RouteComponentProps) =>
          <BudgetList {...props}
            accessToken={this.state.token || ""} />
          }
      />
    );
    const privacy = (
      <Route exact path="/Privacy" component={ Privacy } />
    );

    return (
      <div style={ appStyle }>
        <Header />
        <Router basename={ BASE_URL }>
          <Container>
            { home }
            { budget }
            { budgetList }
            { privacy }
          </Container>
        </Router>
      </div>
    );
  }
}

// Styling
const appStyle: CSS.Properties = {
  textAlign: 'center'
}

export default App;
