const calculateCard = (arr) => {
  let cardAmount = 0;
  let cardHistory = arr.filter((item) => item.account === 'card');
  cardHistory.map((item) => (cardAmount += parseFloat(item.value)));

  return cardAmount;
};

export default calculateCard;
