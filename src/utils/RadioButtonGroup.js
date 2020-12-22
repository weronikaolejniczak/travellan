import React from 'react';
import { RadioButton } from './';
import { View } from 'react-native';

const RadioButtonGroup = (props) => {
  const { options, value, onSelect } = props;

  return (
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
};

export default RadioButtonGroup;
