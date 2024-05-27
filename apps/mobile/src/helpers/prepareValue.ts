const prepareValue = (value: string) => {
  value = value.replace(/ /g, '');
  value = parseFloat(value).toFixed(2);
  const number = parseFloat(value);

  if (isNaN(number)) {
    return 0;
  } else {
    return number;
  }
};

export default prepareValue;
