import { StyleSheet } from 'react-native';

import AppStyles from 'styles/AppStyles';
import { Layout, Typography } from 'constants';

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
