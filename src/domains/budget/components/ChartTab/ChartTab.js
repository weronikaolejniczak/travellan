import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { Colors } from 'constants';
import { styles } from './ChartTabStyle';

const ChartTab = ({ date, title, value }) => (
  <View
    style={[
      styles.container,
      { backgroundColor: value < 0 ? Colors.negative : Colors.green },
    ]}
  >
    <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
    <View style={styles.info}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  </View>
);

export default memo(ChartTab);
