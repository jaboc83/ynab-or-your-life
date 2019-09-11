// 3rd Party
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { Table, InputGroup, InputGroupAddon, Input } from "reactstrap";
import Loading from "../layout/Loading";

// Interfaces
interface BudgetProps extends RouteComponentProps {
  accessToken: string;
  budgetId: string;
  currencySymbol: string;
}

// Component
const Budget: React.FC<BudgetProps> = props => {
  // State Hooks
  const [budget, setBudget] = useState<YNABTypes.BudgetDetail>();
  const [loading, setLoading] = useState(true);
  const [wage, setWage] = useState(0.0);

  // Effect Hooks
  useEffect(() => {
    fetchBudget();
  });

  // sort two categories by budgeted amount desc
  const categorySort = (
    a: YNABTypes.CategorySummary,
    b: YNABTypes.CategorySummary
  ) => {
    return a.budgeted < b.budgeted ? 1 : -1;
  };

  // Get the budget data from the server
  const fetchBudget: () => Promise<void> = async () => {
    try {
      const result = await axios(
        `api/budget/${props.budgetId}?accessToken=${props.accessToken}`
      );
      setBudget(result.data);
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  // Update the wage of the state
  const updateWage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const wage = parseFloat(e.target.value || "0");
    setWage(wage);
  };

  // UI Fragments
  const wageInput = (
    <InputGroup>
      <InputGroupAddon addonType="prepend">$</InputGroupAddon>
      <Input
        placeholder="Hourly Wage"
        min={0}
        max={1000}
        type="number"
        step="1"
        onChange={updateWage}
      />
    </InputGroup>
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
      {wage === 0 ? (
        <td>
          {props.currencySymbol}
          {category.budgeted}
        </td>
      ) : (
        <td>{(category.budgeted / wage).toFixed(2)} hours</td>
      )}
    </tr>
  );
  const tableBody = (
    <tbody>
      {budget ? (
        (budget as YNABTypes.BudgetDetail).categories
          .sort(categorySort)
          .map(tableRow)
      ) : (
        <span></span>
      )}
    </tbody>
  );

  // Main UI
  return (
    <div>
      {wageInput}
      <br />
      {loading ? (
        Loading
      ) : (
        <Table striped>
          {tableHeader}
          {tableBody}
        </Table>
      )}
    </div>
  );
};

export default Budget;
