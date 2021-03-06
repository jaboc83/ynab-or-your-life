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
const Budget: React.FC<BudgetProps> = ({
  budgetId,
  accessToken,
  currencySymbol
}) => {
  // State Hooks
  const [budget, setBudget] = useState<YNABTypes.BudgetDetail>();
  const [loading, setLoading] = useState(true);
  const [wage, setWage] = useState(0.0);

  // Effect Hooks
  useEffect(() => {
    // Get the budget data from the server
    const fetchBudget: () => Promise<void> = async () => {
      if (!budgetId || !accessToken) {
        return;
      }
      try {
        const result = await axios(
          `api/budget/${budgetId}?accessToken=${accessToken}`
        );
        setBudget(result.data);
      } catch (e) {
        // TODO: ? Logging ?
      } finally {
        setLoading(false);
      }
    };
    fetchBudget();
  }, [accessToken]);

  // sort two categories by budgeted amount desc
  const categorySort = (
    a: YNABTypes.CategorySummary,
    b: YNABTypes.CategorySummary
  ) => {
    return a.budgeted < b.budgeted ? 1 : -1;
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
          {currencySymbol}
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
        <Loading />
      ) : (
        <Table striped style={{ textAlign: "left" }}>
          {tableHeader}
          {tableBody}
        </Table>
      )}
    </div>
  );
};

export default Budget;
