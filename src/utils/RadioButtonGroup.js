import React, { memo } from 'react';
import { View } from 'react-native';

import { RadioButton } from './RadioButton/RadioButton';

const RadioButtonGroup = ({ options, value, onSelect }) => (
  <View>
    {options &&
      options.map((option) => (
        <RadioButton
          key={option.key}
          name={option.key}
          text={option.text}
          value={value}
          setValue={onSelect}
        />
      ))}
  </View>
);

export default memo(RadioButtonGroup);
