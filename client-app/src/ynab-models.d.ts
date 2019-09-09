declare namespace YNABTypes {
  interface BudgetSummary {
    id: string,
    name: string,
    currencySymbol: string
  }

  interface CategorySummary {
    id: string,
    name: string,
    budgeted: number
  }

  interface BudgetDetail {
    id: string,
    name: string,
    currencySymbol: string,
    categories: Array<CategorySummary>
  }
}
