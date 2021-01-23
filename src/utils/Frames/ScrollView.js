import React, { forwardRef } from 'react';
import { ScrollView } from 'react-native';

import AppStyles from 'styles/AppStyles';

const CustomScrollView = ({ children, ...props }, ref) => (
  <ScrollView
    ref={ref}
    contentContainerStyle={AppStyles.scrollViewContent}
    indicatorStyle="white"
    style={AppStyles.scrollView}
    {...props}
  >
    {children}
  </ScrollView>
);

export default forwardRef(CustomScrollView);
