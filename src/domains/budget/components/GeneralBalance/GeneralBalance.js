import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { Text as Label } from 'utils';
import { styles } from './GeneralBalanceStyle';

const GeneralBalance = ({ value }) => (
  <View style={styles.container}>
    <Label style={styles.label}>General balance</Label>
    <Text style={[styles.value, value < 0 ? styles.negative : styles.positive]}>
      {value < 0 ? '-' : '+'}
      {value}
    </Text>
  </View>
);

export default memo(GeneralBalance);
