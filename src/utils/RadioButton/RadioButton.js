import * as React from 'react';
import { Text } from 'react-native-paper';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './RadioButtonStyle';

const CustomRadioButton = (props) => {
  const { name, value, text, setValue } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.radioCircle}
        onPress={() => setValue(name)}
      >
        {value === name && <View style={styles.selectedRadioButton} />}
      </TouchableOpacity>
      <Text>{text}</Text>
    </View>
  );
};

export default CustomRadioButton;
