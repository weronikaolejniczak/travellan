import { StyleSheet } from 'react-native';

import Colors from 'constants/Colors';

export const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  deleteButton: {
    padding: 15,
  },
  deleteIcon: {
    color: Colors.primary,
    fontSize: 30,
  },
  flex: {
    flex: 1,
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
