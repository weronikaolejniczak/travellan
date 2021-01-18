import React from 'react';
import { View } from 'react-native';

import AppStyles from 'styles/AppStyles';

const CustomView = ({ children, style }) => (
  <View style={[AppStyles.container, style]}>{children}</View>
);

export default CustomView;
