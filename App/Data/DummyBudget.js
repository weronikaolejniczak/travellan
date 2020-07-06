import Budget from '../Models/BudgetModel';

/**
 * BUDGET
 * id: identifier
 * value: integer
 * currency: 'PLN' from array ['PLN', 'EUR', ...]
 * history: [
 *            {id: 1, title: 'Shoes', value: '-100'},
 *            {id: 2, title: 'Additional funds', value: '250'}
 *          ];
 */
const BUDGET = [
  // currency 1
  new Budget(1, 2500, 'PLN', []),
  // currency 2
  new Budget(2, 500, 'EUR', []),
];

export default BUDGET;
