import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  actionButton: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  actionIcon: {
    color: Colors.primary,
    fontSize: 30,
  },
  iconWrapper: {
    padding: 15,
  },
});
