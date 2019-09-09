import React, { ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import { Table, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { createCoverageSummary } from 'istanbul-lib-coverage';

export interface BudgetProps extends RouteComponentProps {
  accessToken: string,
  budgetId: string,
  currencySymbol: string
}

interface BudgetState {
  budget?: YNABTypes.BudgetDetail,
  loading: boolean,
  wage: number
}

class Budget extends React.Component<BudgetProps, BudgetState> {
  state = {
    budget: undefined,
    loading: true,
    wage: 0.0,
  }

  componentDidMount() {
    axios.get(`api/budget/${this.props.budgetId}?accessToken=${this.props.accessToken}`)
    .then(result => {
      this.setState({budget: result.data, loading: false});
    });
  }

  updateWage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const state = this.state;
    state.wage = parseFloat(e.target.value || "0");
    this.setState(state)
  }

  render() {
    let budget = this.state.budget;
    return (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">$</InputGroupAddon>
          <Input placeholder="Hourly Wage" min={0} max={1000} type="number" step="1" onChange={this.updateWage}/>
        </InputGroup>
        <br />
        {
          this.state.loading ?
          <span>loading...</span>
          :
          <Table striped>
            <thead className="thead-dark">
              <tr>
                <th>Category</th>
                <th>Life Budgeted</th>
              </tr>
            </thead>
            <tbody>
            {
              budget ?
                (budget as YNABTypes.BudgetDetail).categories
                  .sort((a: YNABTypes.CategorySummary, b: YNABTypes.CategorySummary) => a.budgeted < b.budgeted ? 1 : -1 )
                  .map((category: YNABTypes.CategorySummary) =>
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    {
                    this.state.wage === 0 ?
                    <td>{this.props.currencySymbol}{category.budgeted}</td>
                    :
                    <td>{(category.budgeted / this.state.wage).toFixed(2)} hours</td>
                    }
                  </tr>
                )
                : <span></span>
            }
            </tbody>
          </Table>
        }
      </div>
    )
  }
}

export default Budget;
