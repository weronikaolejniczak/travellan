import {StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

export const weatherScreenStyle = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.text,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
