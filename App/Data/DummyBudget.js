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
    {
      id: 0,
      title: 'Initial budget',
      value: '2450',
      category: '',
      account: 'card',
      date: new Date('2020-07-10'),
    },
    {
      id: 1,
      title: 'Bag',
      value: '-600',
      category: 'shopping',
      account: 'card',
      date: new Date('2020-07-10'),
    },
    {
      id: 2,
      title: 'Medicine',
      value: '500',
      category: 'health',
      account: 'cash',
      date: new Date('2020-07-11'),
    },
    {
      id: 3,
      title: 'Outtings',
      value: '250',
      category: 'entertainment',
      account: 'cash',
      date: new Date('2020-07-12'),
    },
    {
      id: 4,
      title: 'Food',
      value: '-100',
      category: 'eatingOut',
      account: 'card',
      date: new Date(),
    },
  ]),
  // currency 2
  new Budget(2, 500, 'EUR', [
    {
      id: 0,
      title: 'Initial budget',
      value: '500',
      category: '',
      account: 'cash',
      date: new Date('2020-07-10'),
    },
  ]),
];

export default BUDGET;
