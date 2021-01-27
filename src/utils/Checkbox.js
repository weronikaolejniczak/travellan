import React from 'react';
import { Checkbox } from 'react-native-paper';

const CustomCheckbox = ({ label, checked, onPress }) =>
  label ? (
    <Checkbox.Item
      label={label}
      onPress={onPress}
      status={checked ? 'checked' : 'unchecked'}
    />
  ) : (
    <Checkbox onPress={onPress} status={checked ? 'checked' : 'unchecked'} />
  );

export default CustomCheckbox;
