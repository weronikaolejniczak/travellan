import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  container: {
    borderColor: Colors.primary,
    borderRadius: 25,
    elevation: 3,
    marginTop: '5%',
    overflow: 'hidden',
    shadowColor: '#111',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
