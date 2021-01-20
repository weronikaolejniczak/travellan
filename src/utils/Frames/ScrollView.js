import React from 'react';
import { ScrollView } from 'react-native';

import AppStyles from 'styles/AppStyles';

const CustomScrollView = ({ children, contentContainerStyle, style }) => (
  <ScrollView
    contentContainerStyle={[AppStyles.scrollViewContent, contentContainerStyle]}
    indicatorStyle="white"
    style={[AppStyles.scrollView, style]}
  >
    {children}
  </ScrollView>
);

export default CustomScrollView;
