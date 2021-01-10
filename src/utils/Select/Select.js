import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { Colors } from 'constants';
import { selectStyle, styles } from './SelectStyle';

const Select = ({
  disabled,
  items,
  onChangeText,
  onValueChange,
  placeholder,
}) => {
  items.forEach((item) => {
    item.color = Colors.primary;
  });

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Category</Text>
      <RNPickerSelect
        disabled={disabled}
        items={items}
        onChangeText={onChangeText}
        onValueChange={onValueChange}
        placeholder={placeholder}
        style={selectStyle}
        Icon={() => {
          return <Icon name="arrow-expand-down" style={styles.icon} />;
        }}
      />
    </View>
  );
};

export default memo(Select);
