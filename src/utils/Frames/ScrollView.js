import React, { memo } from 'react';
import { ScrollView } from 'react-native';

import AppStyles from 'styles/AppStyles';

const CustomScrollView = ({
  children,
  contentContainerStyle,
  style,
  ...rest
}) => (
  <ScrollView
    contentContainerStyle={[AppStyles.scrollViewContent, contentContainerStyle]}
    indicatorStyle="white"
    style={[AppStyles.scrollView, style]}
    {...rest}
  >
    {children}
  </ScrollView>
);

export default memo(CustomScrollView);
