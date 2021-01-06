import { StyleSheet } from 'react-native';

import AppStyles from 'styles/AppStyles';
import Layout from 'constants/Layout';

export const styles = StyleSheet.create({
  container: {
    ...AppStyles.container,
    ...Layout.fillCenter,
  },
});
