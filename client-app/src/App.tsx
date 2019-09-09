// 3rd Party
import React from 'react';
import CSS from 'csstype';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import  Header from './components/layout/Header';
import Home from './components/pages/Home';
import Privacy from './components/pages/Privacy';
import BudgetList from './components/pages/BudgetList';
import Budget from './components/pages/Budget';
import { RouteComponentProps } from 'react-router';
import AppContext from './AppContext';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') || undefined;

interface AppProps { }
interface AppState {
  budgetId?: string,
  currencySymbol: string
}
class App extends React.Component<AppProps, AppState> {
  static contextType = AppContext;
  state: AppState = {
    currencySymbol: "$"
  };

  constructor(props: AppProps, context: any) {
    super(props, context);
    const search = window.location.hash.substring(1).replace(/&/g, '","').replace(/=/g,'":"');
    if (search && search !== '') {
      // Try to get access_token from the hash returned by OAuth
      const params = JSON.parse('{"' + search + '"}', function(key, value) {
        return key === '' ? value : decodeURIComponent(value);
      });
      this.context.token = params.access_token;
      sessionStorage.setItem('ynab_access_token', this.context.token);
      window.location.hash = '';
    } else {
      // Otherwise try sessionStorage
      this.context.token = sessionStorage.getItem('ynab_access_token') || "";
    }
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('budgetId')) {
      this.state.budgetId = urlParams.get('budgetId') || undefined;
    }
    if(urlParams.has('currencySymbol')) {
      this.state.currencySymbol = urlParams.get('budgetId') || "$";
    }
  }

  render() {
    return (
      <AppContext.Provider value={ this.context }>
        <div style={appStyle}>
          <Header />
          <Router basename={baseUrl}>
            <Container>
              <Route exact path="/" component={ Home } />
              <Route exact path="/Budget"
                render={(props: RouteComponentProps) => <Budget {...props} accessToken={this.context.token} budgetId={this.state.budgetId || ""} currencySymbol={ this.state.currencySymbol } /> }
              />
              <Route exact path="/BudgetList"
                render={(props: RouteComponentProps) => <BudgetList {...props} accessToken={this.context.token} /> }
              />
              <Route exact path="/Privacy" component={ Privacy } />
            </Container>
          </Router>
        </div>
      </AppContext.Provider>
    );
  }
}

// Styling
const appStyle: CSS.Properties = {
  textAlign: 'center'
}

export default App;
