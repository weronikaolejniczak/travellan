interface HistoryItem {
  account: string;
  category: string;
  date: Date;
  id: number;
  title: string;
  value: number;
}

interface BudgetModelParams {
  id: string;
  value: number;
  currency?: string;
  history: HistoryItem[];
  defaultAccount: string;
}

const BudgetModel = ({
  id,
  value,
  currency,
  history,
  defaultAccount,
}: BudgetModelParams) => ({
  id,
  value,
  currency,
  history,
  defaultAccount,
});

export default BudgetModel;
