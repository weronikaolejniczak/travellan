import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
    padding: 10,
    width: 300,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
  },
  loader: {
    marginRight: '3%',
  },
});
