const calculateCash = (arr) => {
  let cashAmount = 0;
  let cashHistory = arr.filter((item) => item.account === 'cash');
  cashHistory.map((item) => (cashAmount += parseFloat(item.value)));

  return cashAmount;
};

export default calculateCash;
