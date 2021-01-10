import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { Text as Label } from 'utils';
import { styles } from './AccountBalanceStyle';

const AccountBalance = ({ label, value, iconName }) => (
  <View style={styles.container}>
    <Label>{label}</Label>
    <View style={styles.accounts}>
      <Icon name={iconName} style={styles.icon} />
      <Text
        style={[styles.value, value < 0 ? styles.negative : styles.positive]}
      >
        {value}
      </Text>
    </View>
  </View>
);

export default memo(AccountBalance);
