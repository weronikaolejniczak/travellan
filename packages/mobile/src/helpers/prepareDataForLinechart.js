const prepareDataForLinechart = (arr) => {
  let dataToPrepare = arr.map((item) => parseInt(item.value, 10));
  let preparedData = [dataToPrepare[0]];

  dataToPrepare.reduce((total, num) => {
    preparedData.push(total + num);

    return total + num;
  });

  return preparedData;
};

export default prepareDataForLinechart;
