import { StyleSheet } from 'react-native';

import { Colors, Layout } from 'constants';

export const styles = StyleSheet.create({
  container: {
    ...Layout.fillCenter,
  },
  error: {
    color: Colors.error,
  },
});
