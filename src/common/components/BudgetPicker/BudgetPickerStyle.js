import { StyleSheet } from 'react-native';

import { Colors, Metrics } from 'constants';

export const styles = StyleSheet.create({
  autocompleteContainer: {
    color: Colors.text,
    flex: 1,
    marginTop: 5,
  },
  budgetPickerWrapper: {
    ...Metrics.marginTop,
  },
  input: {
    borderWidth: 0,
  },
  label: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    backgroundColor: '#333',
    borderWidth: 0,
    padding: 10,
  },
  text: {
    color: Colors.text,
  },
});
