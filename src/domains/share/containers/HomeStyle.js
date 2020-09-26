import {StyleSheet} from 'react-native';
/* imports from within the module */
import {Colors, Layout, Metrics} from 'constants';

export const homeStyle = StyleSheet.create({
  container: {
    ...Layout.fill,
    ...Metrics.smallHorizontalPadding,
    ...Metrics.smallVerticalPadding,
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.text,
  },
});
