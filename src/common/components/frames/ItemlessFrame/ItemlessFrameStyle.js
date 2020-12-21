import { StyleSheet } from 'react-native';

import { Layout, Typography } from 'constants';
import AppStyles from 'styles/AppStyles';

export const styles = StyleSheet.create({
  container: {
    ...AppStyles.container,
    ...Layout.center,
  },
  text: {
    ...AppStyles.text,
    ...Typography.mainHeader,
    textAlign: 'center',
  },
});
