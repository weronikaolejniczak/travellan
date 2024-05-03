const prepareLabelsForLinechart = (arr) => {
  let labels = arr.map((item) =>
    item.date.toString().split(' ').splice(1, 2).join(' '),
  );

  return labels;
};

export default prepareLabelsForLinechart;
