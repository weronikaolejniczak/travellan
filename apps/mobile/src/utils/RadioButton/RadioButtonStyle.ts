import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  radioCircle: {
    alignItems: 'center',
    borderColor: Colors.accent,
    borderRadius: 100,
    borderWidth: 2,
    height: 20,
    justifyContent: 'center',
    marginRight: 10,
    width: 20,
  },
  selectedRadioButton: {
    backgroundColor: Colors.accent,
    borderRadius: 50,
    height: 10,
    width: 10,
  },
});
