import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    borderWidth: 2,
    marginTop: '5%',
    padding: 15,
  },
  date: {
    color: Colors.text,
  },
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.text,
    fontWeight: 'bold',
    marginTop: 5,
  },
  value: {
    color: Colors.text,
    fontSize: 22,
  },
});
