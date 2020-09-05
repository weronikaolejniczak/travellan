import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const weatherStyle = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.background,
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
