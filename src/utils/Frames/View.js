import AppStyles from 'styles/AppStyles';
import React from 'react';
import { View } from 'react-native';

const CustomView = ({ children }) => {
  return <View style={AppStyles.container}>{children}</View>;
};

export default CustomView;
