import { StyleSheet } from 'react-native';

import { Colors, Metrics } from 'constants';

export const styles = StyleSheet.create({
  activeLabel: {
    color: Colors.primary,
    fontSize: 18,
  },
  activeRadioIcon: {
    color: Colors.primary,
    fontSize: 26,
  },
  destination: {
    alignItems: 'center',
    marginLeft: '7%',
    marginTop: '5%',
  },
  disactiveLabel: {
    color: 'grey',
    fontSize: 18,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
  },
  inputWrapper: {
    ...Metrics.verticalMargin,
  },
  nonActiveRadioIcon: {
    color: 'grey',
    fontSize: 26,
  },
  picker: {
    marginTop: '5%',
  },
  radio: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
