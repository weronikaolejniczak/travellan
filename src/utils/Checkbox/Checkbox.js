import { Text, View } from 'react-native';
import { styles } from './CheckboxStyle';

import CheckBox from '@react-native-community/checkbox';
import Colors from 'constants/Colors';
import React from 'react';

const CustomCheckbox = (props) => {
  const { label, checked, handleCheck } = props;

  return (
    <View style={styles.container}>
      <CheckBox
        tintColors={{ false: Colors.text, true: Colors.primary }}
        value={checked}
        onValueChange={handleCheck}
      />
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};

export default CustomCheckbox;
