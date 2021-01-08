import produce, { enableES5 } from 'immer';

const produceImmer = (...args) => {
  enableES5();
  return produce(...args);
};

export default produceImmer;
