import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { Colors } from 'constants';
import { styles } from './ChartTabStyle';

const ChartTab = ({ date, title, value }) => (
  <View
    style={[
      styles.container,
      { borderColor: value < 0 ? Colors.negative : Colors.positive },
    ]}
  >
    <View style={styles.info}>
      <View>
        <Text style={styles.date}>{new Date(date).toLocaleString()}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

export default memo(ChartTab);
