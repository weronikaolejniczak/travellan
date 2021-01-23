import { StyleSheet } from 'react-native';

import Colors from 'constants/Colors';

export const styles = StyleSheet.create({
  actionButton: {
    padding: 15,
  },
  actionIcon: {
    color: Colors.primary,
    fontSize: 30,
  },
  flex: {
    flex: 1,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
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
  height: {
    height: 30,
  },
});
