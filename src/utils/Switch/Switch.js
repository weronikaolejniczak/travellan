import React from 'react';
import { Switch } from 'react-native-paper';
import { View } from 'react-native';

import { styles } from './SwitchStyle';

const CustomSwitch = (props) => {
  const { children, toggled, onToggleSwitch } = props;

  return (
    <View style={styles.wrapper}>
      {children}
      <Switch value={toggled} onValueChange={onToggleSwitch} />
    </View>
  );
};

export default CustomSwitch;
