import React from 'react';
import { ScrollView } from 'react-native';

import AppStyles from 'styles/AppStyles';

const CustomScrollView = ({ children, ...props }) => {
  return (
    <ScrollView
      contentContainerStyle={AppStyles.scrollViewContent}
      indicatorStyle="white"
      style={AppStyles.scrollView}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default CustomScrollView;
