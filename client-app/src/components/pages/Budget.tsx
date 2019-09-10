// 3rd Party
import React, { ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import { Table, InputGroup, InputGroupAddon, Input } from 'reactstrap';

// Interfaces
interface BudgetProps extends RouteComponentProps {
  accessToken: string,
  budgetId: string,
  currencySymbol: string
}
interface BudgetState {
  budget: YNABTypes.BudgetDetail | null,
  loading: boolean,
  wage: number
}

// Component
class Budget extends React.Component<BudgetProps, BudgetState> {
  state = {
    budget: null,
    loading: true,
    wage: 0.0,
  }

  // sort two categories by budgeted amount desc
  static categorySort = (a: YNABTypes.CategorySummary, b: YNABTypes.CategorySummary) => {
    return a.budgeted < b.budgeted ? 1 : -1;
  };

  // Get the budget data from the server
  componentDidMount() {
    axios.get(`api/budget/${this.props.budgetId}?accessToken=${this.props.accessToken}`)
    .then(result => {
      this.setState({ budget: result.data, loading: false });
    });
  }

  // Update the wage of the state
  updateWage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const wage = parseFloat(e.target.value || "0");
    this.setState({ wage });
  }

  // Render UI
  render() {
    const budget = this.state.budget;

    // UI Fragments
    const wageInput = (
      <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
        <Input placeholder="Hourly Wage" min={0} max={1000} type="number" step="1" onChange={this.updateWage}/>
      </InputGroup>
    );
    const loading = (
      <span>loading...</span>
    );
    const tableHeader = (
      <thead className="thead-dark">
        <tr>
          <th>Category</th>
          <th>Life Budgeted</th>
        </tr>
      </thead>
    );
    const tableRow = (category: YNABTypes.CategorySummary) => (
      <tr key={category.id}>
        <td>{category.name}</td>
        {
        this.state.wage === 0 ?
        <td>{this.props.currencySymbol}{category.budgeted}</td>
        :
        <td>{(category.budgeted / this.state.wage).toFixed(2)} hours</td>
        }
      </tr>
    );
    const tableBody = (
        <tbody>
        {
          budget
          ? (budget as YNABTypes.BudgetDetail).categories
              .sort(Budget.categorySort)
              .map(tableRow)
          : <span></span>
        }
        </tbody>
    );

    // Main UI
    return (
      <div>
        { wageInput }
        <br />
        {
          this.state.loading
          ?  loading
          : (
            <Table striped>
              { tableHeader }
              { tableBody }
            </Table>
          )
        }
      </div>
    )
  }
}

export default Budget;
