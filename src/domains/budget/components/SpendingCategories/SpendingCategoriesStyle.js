import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  activeCategory: {
    color: Colors.primary,
  },
  activeCategoryName: {},
  button: {},
  categoriesContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '2%', // extra small margin top
  },
  header: {},
  icon: {
    fontSize: 42,
  },
  label: {
    color: Colors.placeholder,
  },
  nonactiveCategory: {
    color: Colors.placeholder,
  },
});
