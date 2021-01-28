import React, { memo } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { Colors } from 'constants';
import { prepareDataForLinechart, prepareLabelsForLinechart } from 'helpers';
import { styles } from './ChartStyle';

const screenWidth = Dimensions.get('window').width;

const Chart = ({ data, onDataPointClick, getValue }) => {
  const chartData = {
    datasets: [
      {
        color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
        data: data ? prepareDataForLinechart(data) : [],
        strokeWidth: 2,
      },
    ],
    labels: data ? prepareLabelsForLinechart(data) : [],
    legend: ['Budget value'],
  };

  const chartConfig = {
    backgroundGradientFrom: Colors.cards,
    backgroundGradientFromOpacity: 0.0,
    backgroundGradientTo: Colors.cards,
    backgroundGradientToOpacity: 0.9,
    barPercentage: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={screenWidth * 0.9}
        height={220}
        chartConfig={chartConfig}
        fromZero={true}
        onDataPointClick={onDataPointClick}
        getDotColor={(item, index) =>
          getValue(index) < 0 ? Colors.negative : Colors.positive
        }
      />
    </View>
  );
};

export default memo(Chart);
