// 3rd Party
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, ListGroupItem } from "reactstrap";
import { RouteComponentProps } from "react-router";

// Other Components
import Loading from "../layout/Loading";

// Interfaces
interface BudgetListProps extends RouteComponentProps {
  accessToken: string;
}

// Component
const BudgetList: React.FC<BudgetListProps> = props => {
  // State Hooks
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect Hooks
  useEffect(() => {
    fetchBudgets();
  });

  // Get the budget list from the server
  const fetchBudgets: () => Promise<void> = async () => {
    try {
      const result = await axios(`api/budget?accessToken=${props.accessToken}`);
      setBudgets(result.data);
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  // UI Fragments
  const budgetItem = (budgetSummary: YNABTypes.BudgetSummary) => (
    <ListGroupItem key={budgetSummary.id}>
      <a
        href={`budget?budgetId=${budgetSummary.id}&currencySymbol=${budgetSummary.currencySymbol}`}
      >
        {budgetSummary.name}
      </a>
    </ListGroupItem>
  );
  const budgetList = <ListGroup>{budgets.map(budgetItem)}</ListGroup>;

  // Main UI
  return <div>{loading ? Loading : budgetList}</div>;
};

export default BudgetList;
