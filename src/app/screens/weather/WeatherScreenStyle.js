import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

export const weatherScreenStyle = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '12%',
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
