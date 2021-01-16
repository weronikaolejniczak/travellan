import Colors from 'constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  PDF: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  buttonTouchableCenter: {
    alignSelf: 'stretch',
    padding: 16,
    textAlign: 'center',
  },
  buttonTouchableLeft: {
    alignSelf: 'stretch',
    padding: 16,
    textAlign: 'left',
  },
  icon: {
    color: Colors.text,
    fontSize: 30,
    marginRight: 20,
  },
});
