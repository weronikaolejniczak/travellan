import React, { memo } from 'react';
import { Text } from 'react-native-paper';
import { TouchableOpacity, View } from 'react-native';

import { styles } from './RadioButtonStyle';

const CustomRadioButton = ({ name, value, textStyle, text, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.radioCircle} onPress={onPress}>
      {value === name && <View style={styles.selectedRadioButton} />}
    </TouchableOpacity>
    <Text style={textStyle}>{text}</Text>
  </View>
);

export default memo(CustomRadioButton);
