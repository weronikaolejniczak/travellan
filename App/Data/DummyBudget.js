import Budget from '../Models/BudgetModel';

/**
 * BUDGET
 * id: identifier
 * value: integer
 * currency: 'PLN' from array ['PLN', 'EUR', ...]
 * history: [
 *            {id: 1, title: 'Shoes', value: '-100', date: new Date.now()},
 *            {id: 2, title: 'Additional funds', value: '250', date: new Date.now()}
 *          ];
 */
const BUDGET = [
  // currency 1
  new Budget(1, 2500, 'PLN', [
    {id: 0, title: 'Initial budget', value: '2450', date: new Date('2020-07-10')},
    {id: 1, title: 'Bag', value: '-600', date: new Date('2020-07-10')},
    {id: 2, title: 'This', value: '500', date: new Date('2020-07-11')},
    {id: 3, title: 'Mistake', value: '0', date: new Date('2020-07-11')},
    {id: 4, title: 'Additional', value: '250', date: new Date('2020-07-12')},
    {id: 5, title: 'Shoes', value: '-100', date: new Date()},
  ]),
  // currency 2
  new Budget(2, 500, 'EUR', []),
];

export default BUDGET;
