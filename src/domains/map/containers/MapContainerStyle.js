import { StyleSheet } from 'react-native';

import { Layout } from 'constants';

export const styles = StyleSheet.create({
  container: {
    ...Layout.fill,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
