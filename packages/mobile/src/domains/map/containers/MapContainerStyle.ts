import { StyleSheet } from 'react-native';

import { Colors, Layout } from 'constants';

export const styles = StyleSheet.create({
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    ...Layout.fill,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    backgroundColor: Colors.cards,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 50,
    width: '100%',
  },
  text: { color: 'orange' },
});
