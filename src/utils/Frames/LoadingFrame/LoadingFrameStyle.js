import AppStyles from 'styles/AppStyles';
import Layout from 'constants/Layout';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...AppStyles.container,
    ...Layout.fillCenter,
  },
});

export default styles;
