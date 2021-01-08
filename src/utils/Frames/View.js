import React from 'react';
import { View } from 'react-native';

import AppStyles from 'styles/AppStyles';

const CustomView = ({ children }) => {
  return <View style={AppStyles.container}>{children}</View>;
};

export default CustomView;
