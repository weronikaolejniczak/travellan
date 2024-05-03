const calculateCash = (arr) => {
  let cashAmount = 0;
  const cashHistory = arr.filter((item) => item.account === 'cash');
  cashHistory.map((item) => (cashAmount += parseFloat(item.value)));

  return cashAmount;
};

export default calculateCash;
