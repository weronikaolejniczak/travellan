import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    marginRight: 7,
    padding: 8,
  },
  addButtonIcon: {
    color: Colors.cards,
    fontSize: 22,
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.cards,
    flexDirection: 'row-reverse',
    padding: 10,
  },
  currency: {
    fontSize: 20,
  },
  currencyBubble: {
    backgroundColor: Colors.background,
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  list: {
    width: 200,
  },
  separator: {
    width: 7,
  },
});
