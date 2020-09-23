import {StyleSheet} from 'react-native';
import {Layout} from 'constants';
import AppStyles from 'styles/AppStyles';

export const loadingStyle = StyleSheet.create({
  container: {
    ...AppStyles.container,
    ...Layout.fillCenter,
  },
});
