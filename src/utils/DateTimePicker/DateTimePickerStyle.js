import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  icon: {
    color: Colors.placeholder,
    fontSize: 24,
    position: 'absolute',
    right: 7,
    top: 22,
  },
  label: {
    color: Colors.primary,
    marginBottom: 7,
  },
  picker: {
    borderColor: Colors.placeholder,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    marginVertical: 15,
    padding: 7,
  },
  text: {
    color: Colors.text,
    fontSize: 18,
  },
});
