import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 50,
    height: 50,
    justifyContent: 'center',
    margin: 5,
    width: 50,
  },
  container: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    top: 10,
  },
  icon: {
    color: Colors.text,
    fontSize: 32,
  },
});
