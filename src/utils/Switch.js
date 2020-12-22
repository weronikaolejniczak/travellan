import React from 'react';
import { Switch } from 'react-native-paper';

const CustomSwitch = (props) => {
  const { toggled, onToggleSwitch } = props;

  return <Switch value={toggled} onValueChange={onToggleSwitch} />;
};

export default CustomSwitch;
