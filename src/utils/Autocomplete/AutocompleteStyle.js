import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  container: {
    color: Colors.text,
    flex: 1,
    marginTop: 5,
  },
  input: {
    borderWidth: 0,
  },
  result: {
    backgroundColor: '#333',
    borderWidth: 0,
    padding: 10,
  },
});
