import { StyleSheet } from 'react-native';

import { Layout, Colors } from 'constants';

export const styles = StyleSheet.create({
  container: {
    ...Layout.fill,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: { color: 'orange' },
  overlay: {
    backgroundColor: Colors.cards,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 50,
    width: '100%',
  },
});
