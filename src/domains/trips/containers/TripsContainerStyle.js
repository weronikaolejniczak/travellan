import { StyleSheet } from 'react-native';

import Colors from 'constants/Colors';

export const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  flex: {
    flex: 1,
  },
  triplessContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: Colors.text,
  },
  triplessText: {
    fontSize: 18,
  },
  actionButton: {
    padding: 15,
  },
  actionIcon: {
    fontSize: 30,
    color: Colors.primary,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
