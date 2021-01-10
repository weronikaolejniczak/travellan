import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  accounts: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: Colors.text,
    fontSize: 28,
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
    fontSize: 18,
  },
});
