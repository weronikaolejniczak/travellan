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
    marginLeft: '5%',
  },
  disactiveLabel: {
    color: Colors.placeholder,
    fontSize: 18,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputWrapper: {
    ...Metrics.verticalMargin,
    ...Metrics.bigMarginBottom,
  },
  nonActiveRadioIcon: {
    color: Colors.placeholder,
    fontSize: 26,
  },
  picker: {
    ...Metrics.bigMarginTop,
  },
  radio: {
    alignItems: 'center',
    ...Metrics.horizontalMargin,
  },
  validationError: {
    color: Colors.error,
  },
  validationErrorWrapper: {
    ...Metrics.bigMarginTop,
  },
});
