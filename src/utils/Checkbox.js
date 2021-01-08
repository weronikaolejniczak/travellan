import React from 'react';
import { Checkbox } from 'react-native-paper';

const CustomCheckbox = (props) => {
  const { label, checked, onPress } = props;

  return label ? (
    <Checkbox.Item
      label={label}
      onPress={onPress}
      status={checked ? 'checked' : 'unchecked'}
    />
  ) : (
    <Checkbox onPress={onPress} status={checked ? 'checked' : 'unchecked'} />
  );
};

export default CustomCheckbox;
