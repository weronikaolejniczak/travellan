/* budget handlers */
// prepare budget value for saving
export const prepareValue = (value) => {
  // replace each whitespace in passed string with empty symbol
  value = value.replace(/ /g, '');
  // parse to float and round up to 2 decimal points
  value = parseFloat(value).toFixed(2);
  // as toFixed() converts the number to string, parse to float again
  value = parseFloat(value);
  // if parsing results in NaN, i.e. the first symbol of value is not a number, return 0 for safety
  if (isNaN(value)) {
    return 0;
  } else {
    return value;
  }
};

/* accounts */
// calculate total amount on card
export const calculateCard = (arr) => {
  let cardAmount = 0;
  let cardHistory = arr.filter((item) => item.account === 'card');
  cardHistory.map((item) => (cardAmount += parseFloat(item.value)));

  return cardAmount;
};

// calculate total amount in cash
export const calculateCash = (arr) => {
  let cashAmount = 0;
  let cashHistory = arr.filter((item) => item.account === 'cash');
  cashHistory.map((item) => (cashAmount += parseFloat(item.value)));

  return cashAmount;
};

/** line chart */
export const prepareLabelsForLC = (arr) => {
  // extract dates from history attribute of selectedCurrency
  let labels = arr.map((item) =>
    item.date.toString().split(' ').splice(1, 2).join(' '),
  );

  return labels;
};

export const prepareDataForLC = (arr) => {
  // extract values from history attribute of selectedCurrency and parse it into int
  let dataToPrepare = arr.map((item) => parseInt(item.value, 10));
  // add initial value to preparedData
  let preparedData = [dataToPrepare[0]];
  // 'reduce' to get an array of budget after each operation
  dataToPrepare.reduce((total, num) => {
    preparedData.push(total + num);
    return total + num;
  });

  return preparedData;
};
