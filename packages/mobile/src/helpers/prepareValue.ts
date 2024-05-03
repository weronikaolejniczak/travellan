const prepareValue = (value) => {
  value = value.replace(/ /g, '');
  value = parseFloat(value).toFixed(2);
  value = parseFloat(value);

  if (isNaN(value)) {
    return 0;
  } else {
    return value;
  }
};

export default prepareValue;
