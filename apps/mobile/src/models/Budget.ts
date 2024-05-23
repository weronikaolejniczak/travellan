interface HistoryItem {
  account: string;
  category: string;
  date: Date;
  id: number;
  title: string;
  value: number;
}

interface BudgetParams {
  id: string;
  value: number;
  currency?: string;
  history: HistoryItem[];
  defaultAccount: string;
}

const Budget = ({
  id,
  value,
  currency,
  history,
  defaultAccount,
}: BudgetParams) => ({
  id,
  value,
  currency,
  history,
  defaultAccount,
});

export default Budget;
