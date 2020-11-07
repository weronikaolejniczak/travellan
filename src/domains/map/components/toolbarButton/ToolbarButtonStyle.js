import {StyleSheet} from 'react-native';
/* imports from within the module */
import Colors from 'constants/Colors';

export const toolbarButtonStyle = StyleSheet.create({
  button: {
    padding: 20,
  },
  icon: {
    padding: 15,
    fontSize: 28,
    color: Colors.text,
  },
});
