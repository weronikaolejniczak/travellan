const prepareLabelsForLinechart = (arr) => {
  const labels = arr.map((item) =>
    item.date.toString().split(' ').splice(1, 2).join(' '),
  );

  return labels;
};

export default prepareLabelsForLinechart;
