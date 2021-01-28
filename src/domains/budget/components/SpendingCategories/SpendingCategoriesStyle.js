import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  activeCategory: {
    color: Colors.primary,
  },
  activeCategoryName: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    color: Colors.backgroundColor,
    marginLeft: 10,
    padding: 3,
    paddingHorizontal: 10,
  },
  //button: {},
  categoriesContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '2%', // extra small margin top
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    fontSize: 38,
    margin: 7,
  },
  label: {
    color: Colors.placeholder,
  },
  nonactiveCategory: {
    color: Colors.placeholder,
  },
});
