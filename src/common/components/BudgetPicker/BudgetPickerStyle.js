import { StyleSheet } from 'react-native';

import { Colors, Layout, Metrics } from 'constants';

export const styles = StyleSheet.create({
  accounts: {
    ...Layout.rowCross,
  },
  accountsWrapper: {
    ...Metrics.bigVerticalMargin,
  },
  budgetPickerWrapper: {
    ...Metrics.marginTop,
  },
  label: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: Colors.text,
  },
});
