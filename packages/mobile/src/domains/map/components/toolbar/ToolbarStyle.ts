import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overlay: {
    backgroundColor: Colors.cards,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  searchResult: {
    backgroundColor: Colors.background,
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  text: { color: 'orange' },
});
