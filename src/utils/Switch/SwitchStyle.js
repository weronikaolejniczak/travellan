import { StyleSheet } from 'react-native';

import { Metrics } from 'constants';

export const styles = StyleSheet.create({
  switch: {
    ...Metrics.horizontalMargin,
  },
  wrapper: {
    ...Metrics.verticalMargin,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
