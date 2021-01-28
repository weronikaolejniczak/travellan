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
  container: {
    padding: 0,
  },
  flex: {
    flex: 1,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  iconWrapper: {
    padding: 15,
  },
  text: {
    color: Colors.text,
  },
  triplessContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  triplessText: {
    fontSize: 18,
  },
});
