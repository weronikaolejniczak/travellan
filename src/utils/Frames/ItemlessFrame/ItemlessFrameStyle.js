import { StyleSheet } from 'react-native';

import AppStyles from 'styles/AppStyles';
import { Layout } from 'constants';

export const styles = StyleSheet.create({
  container: {
    ...AppStyles.container,
    ...Layout.center,
  },
  text: {
    ...AppStyles.text,
    textAlign: 'center',
  },
});
