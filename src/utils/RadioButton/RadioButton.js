import React, { memo } from 'react';
import { Text } from 'react-native-paper';
import { TouchableOpacity, View } from 'react-native';

import { styles } from './RadioButtonStyle';

const CustomRadioButton = ({ name, value, text, setValue }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.radioCircle} onPress={() => setValue(name)}>
      {value === name && <View style={styles.selectedRadioButton} />}
    </TouchableOpacity>
    <Text>{text}</Text>
  </View>
);

export default memo(CustomRadioButton);
