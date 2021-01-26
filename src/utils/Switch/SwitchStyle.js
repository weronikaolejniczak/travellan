import { StyleSheet } from 'react-native';

import { Metrics } from 'constants';

export const styles = StyleSheet.create({
  switch: {
    ...Metrics.horizontalMargin,
  },
  wrapper: {
    ...Metrics.verticalMargin,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
