import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { styles } from './AccountButtonStyle';

const AccountButton = ({ account, value, children, icon, setAccount }) => (
  <TouchableOpacity style={styles.button} onPress={() => setAccount(value)}>
    <Icon
      name={icon}
      style={[
        styles.icon,
        account === value ? styles.activeCategory : styles.nonActiveCategory,
      ]}
    />
    <Text
      style={[
        styles.label,
        account === value ? styles.activeCategory : styles.nonActiveCategory,
      ]}
    >
      {children}
    </Text>
  </TouchableOpacity>
);

export default AccountButton;
