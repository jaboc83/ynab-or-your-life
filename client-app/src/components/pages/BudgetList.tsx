// 3rd Party
import React from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap'
import { RouteComponentProps } from 'react-router';

// Interfaces
interface BudgetListProps extends RouteComponentProps {
  accessToken: string
}

// Component
class BudgetList extends React.Component<BudgetListProps> {
  state = {
    budgets: [],
    loading: true,
  }

  // Get the budget list from the server
  componentDidMount() {
    axios.get(`api/budget?accessToken=${this.props.accessToken}`)
    .then(result => {
      this.setState({budgets: result.data, loading: false})
    });
  }

  // Render UI
  render() {

    // UI Fragments
    const loading = (
      <span>Loading...</span>
    );
    const budgetItem = (budgetSummary: YNABTypes.BudgetSummary) => (
      <ListGroupItem key={budgetSummary.id}>
        <a href={`budget?budgetId=${budgetSummary.id}&currencySymbol=${budgetSummary.currencySymbol}`}>
          { budgetSummary.name }
        </a>
      </ListGroupItem>
    );
    const budgetList = (
      <ListGroup>
        {
          this.state.budgets.map(budgetItem)
        }
      </ListGroup>
    );

    // Main UI
    return (
      <div>
        {
          this.state.loading
          ? loading
          : budgetList
        }
      </div>
    )
  }
}

export default BudgetList;
