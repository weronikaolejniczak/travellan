import { StyleSheet } from 'react-native';

import { Colors, Layout } from 'constants';

export const styles = StyleSheet.create({
  activeCategory: {
    color: Colors.primary,
  },
  button: {
    ...Layout.rowCross,
  },
  icon: {
    color: Colors.text,
    fontSize: 30,
    marginRight: '5%',
  },
  label: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  nonActiveCategory: {
    color: Colors.placeholder,
  },
});
