import React from 'react';
import { Switch } from 'react-native';

import Colors from 'constants/Colors';

const CustomSwitch = (props) => {
  return (
    <Switch
      style={props.style}
      trackColor={{
        false: Colors.switchDisabledTrack,
        true: Colors.switchEnabledTrack,
      }}
      thumbColor={Colors.switchThumb}
      ios_backgroundColor={Colors.background}
      onValueChange={props.onValueChange}
      value={props.value}
    />
  );
};

export default CustomSwitch;
