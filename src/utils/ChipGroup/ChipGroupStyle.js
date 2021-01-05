import { StyleSheet } from 'react-native';

import { Layout } from 'constants';

export const styles = StyleSheet.create({
  wrapper: {
    ...Layout.row,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});
