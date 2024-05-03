import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const selectStyle = {
  color: Colors.primary,
  iconContainer: {
    right: 15,
    top: 6,
  },
  inputAndroid: {
    backgroundColor: Colors.transparent,
  },
};

export const styles = StyleSheet.create({
  icon: {
    color: Colors.placeholder,
    fontSize: 20,
  },
  label: {
    color: Colors.primary,
    marginLeft: 8,
    marginTop: 2,
  },
  wrapper: {
    borderColor: Colors.placeholder,
    borderRadius: 4,
    borderWidth: 1,
  },
});
