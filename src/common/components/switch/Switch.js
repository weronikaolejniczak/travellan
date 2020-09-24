import React from 'react';
import {Switch} from 'react-native';
/* imports from within the module */
import Colors from 'constants/Colors';

const CustomSwitch = (props) => {
  return (
    <Switch
      style={props.style}
      trackColor={{
        false: Colors.trackColorOnFalse,
        true: Colors.trackColorOnTrue,
      }}
      thumbColor={Colors.thumbColor}
      ios_backgroundColor={Colors.background}
      onValueChange={props.onValueChange}
      value={props.value}
    />
  );
}

export default CustomSwitch;
