import React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { createCoverageSummary } from 'istanbul-lib-coverage';

export interface BudgetProps extends RouteComponentProps {
  accessToken: string,
  budgetId: string,
  currencySymbol: string
}

interface BudgetState {
  budget?: YNABTypes.BudgetDetail,
  loading: boolean
}

class Budget extends React.Component<BudgetProps, BudgetState> {
  state = {
    budget: undefined,
    loading: true
  }
  componentDidMount() {
    axios.get(`api/budget/${this.props.budgetId}?accessToken=${this.props.accessToken}`)
    .then(result => {
      this.setState({budget: result.data, loading: false});
    });
  }
  render() {
    let budget = this.state.budget;
    return (
      <div>
        {
          this.state.loading ?
          <span>loading...</span>
          :
          <ListGroup>
            {
              budget ?
                (budget as YNABTypes.BudgetDetail).categories
                  .sort((a: YNABTypes.CategorySummary, b: YNABTypes.CategorySummary) => a.budgeted < b.budgeted ? 1 : -1 )
                  .map((category: YNABTypes.CategorySummary) =>
                  <ListGroupItem key={category.id}>{category.name} - {category.budgeted}</ListGroupItem>
                )
                : <span></span>
            }
          </ListGroup>
        }
      </div>
    )
  }
}

export default Budget;
