// 3rd Party
import React from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap'
import { RouteComponentProps } from 'react-router';

// Contexts
import AppContext from '../../AppContext';

export interface BudgetListProps extends RouteComponentProps {
  accessToken: string
}

class BudgetList extends React.Component<BudgetListProps> {
  static contextType = AppContext;
  state = {
    budgets: [],
    loading: true
  }

  componentDidMount() {
    axios.get(`api/budget?accessToken=${this.context.token}`)
    .then(result => {
      this.setState({budgets: result.data, loading: false})
    });
  }

  render() {
    return (
      <div>
        {
          this.state.loading ?
          <span>Loading...</span>
          : (
            <ListGroup>
              {this.state.budgets.map((budgetSummary: YNABTypes.BudgetSummary) => {
                return <ListGroupItem key={budgetSummary.id}>
                  <a href={`budget?budgetId=${budgetSummary.id}&currencySymbol=${budgetSummary.currencySymbol}`}>
                    {budgetSummary.name}
                  </a>
                  </ListGroupItem>
              })}
            </ListGroup>
          )
        }
      </div>
    )
  }
}

export default BudgetList;
