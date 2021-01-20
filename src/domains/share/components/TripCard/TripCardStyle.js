import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  selectedText: {
    color: Colors.backgroundColor,
  },
  selectedTrip: {
    backgroundColor: Colors.primary,
  },
  text: {
    color: Colors.text,
  },
  touchable: {
    padding: '2%',
  },
  trip: {
    margin: '2%',
    overflow: 'hidden',
  },
});
