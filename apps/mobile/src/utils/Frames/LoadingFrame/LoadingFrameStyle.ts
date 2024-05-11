import { StyleSheet } from 'react-native';

import Layout from 'constants/Layout';
import AppStyles from 'styles/AppStyles';

export const styles = StyleSheet.create({
  container: {
    ...AppStyles.container,
    ...Layout.fillCenter,
  },
});
