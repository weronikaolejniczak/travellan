import {StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

export const budgetScreenStyle = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.text,
  },
});
