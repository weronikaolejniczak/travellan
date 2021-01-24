import { StyleSheet } from 'react-native';

import { Colors, Metrics } from 'constants';

export const styles = StyleSheet.create({
  container: {
    color: Colors.text,
    flex: 1,
    ...Metrics.marginTop,
  },
  input: {
    borderWidth: 0,
  },
  result: {
    backgroundColor: '#333',
    borderWidth: 0,
    ...Metrics.bigPadding,
  },
});
