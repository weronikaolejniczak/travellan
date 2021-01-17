import { StyleSheet } from 'react-native';

import { Colors, Metrics } from 'constants';

export const styles = StyleSheet.create({
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
