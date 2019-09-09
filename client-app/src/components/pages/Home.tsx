// 3rd Party
import React from 'react';
import { RouteComponentProps } from 'react-router';

// Contexts
import AppContext from '../../AppContext';

class Home extends React.Component<RouteComponentProps> {

  render() {
    return (
      <AppContext.Consumer>
        {appContext => (
          <div className="text-center">
              <h1 className="display-4">Welcome</h1>
              <p>
                  This simple app provides you with a way to view your monthly YNAB budget
                  using the formula laid out in the amazing book "Your Money or Your Life"
                  by Vicki Robin and Joe Dominguez
              </p>
              <p>
                This product is in no way affiliated with YNAB or the authors of "Your Money or Your Life".
                This app is not officially supported by YNAB in any way. Use of this app
                could introduce problems into your budget that YNAB, through its official
                support channels, will not be able to troubleshoot or fix. Please use at
                your own risk!
              </p>
              <form>
                {appContext.token === "" ? (
                  <div className="form-group">
                    <p className="lead">If you would like to use this App, please authorize with YNAB!</p>
                    <a href={`https://app.youneedabudget.com/oauth/authorize?client_id=${appContext.clientId}&redirect_uri=${window.location.href}&response_type=token`} className="btn btn-primary">Authorize This App With YNAB &gt;</a>
                  </div>
                  ) : (
                  <div className="form-group">
                    <a href={`/BudgetList`} className="btn btn-primary">Click Here to Continue</a>
                  </div>
                  )
                }
              </form>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Home;
