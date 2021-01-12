import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  accountsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailsContainer: {
    paddingBottom: '5%',
    paddingHorizontal: '5%',
  },
  historyContainer: {
    marginTop: '5%',
  },
  label: {
    color: Colors.placeholder,
  },
  navigationButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  navigationText: {
    color: Colors.primary,
    fontSize: 18,
  },
  operationsContainer: {
    marginTop: '5%',
    //smallMarginTop
  },
  operationsContent: {
    padding: '5%',
  },
});
