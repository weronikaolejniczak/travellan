import { produce } from 'immer';

const produceImmer = (baseState, recipe) => {
  if (typeof baseState === 'undefined' || typeof recipe !== 'function') {
    throw new Error('Invalid arguments passed to produce');
  }

  return produce(baseState, recipe);
};

export default produceImmer;
