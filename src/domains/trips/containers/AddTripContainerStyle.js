import { StyleSheet } from 'react-native';

import { Colors, Layout, Metrics } from 'constants';

export const styles = StyleSheet.create({
  notice: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  noticeWrapper: {
    ...Metrics.bigVerticalMargin,
    ...Layout.fillCenter,
  },
  submitWrapper: {
    ...Metrics.bigMarginTop,
  },
});
