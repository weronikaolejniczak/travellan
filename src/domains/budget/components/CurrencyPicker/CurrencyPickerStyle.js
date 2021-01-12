import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.cards,
  },
  currencyActive: {
    color: Colors.primary,
    fontSize: 22,
  },
  currencyBubble: {
    backgroundColor: Colors.background,
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  currencyNonactive: {
    color: Colors.placeholder,
    fontSize: 22,
  },
  separator: {
    width: 7,
  },
});
