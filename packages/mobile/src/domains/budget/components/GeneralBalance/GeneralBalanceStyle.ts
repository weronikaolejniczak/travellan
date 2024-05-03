import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: Colors.placeholder,
  },
  negative: {
    color: Colors.negative,
    fontWeight: 'bold',
  },
  positive: {
    color: Colors.positive,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 30,
  },
});
