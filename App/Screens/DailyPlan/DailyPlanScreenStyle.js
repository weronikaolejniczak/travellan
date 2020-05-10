import {StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

export const dailyPlanScreenStyle = StyleSheet.create({
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
