import AppStyles from 'styles/AppStyles';
import React from 'react';
import { ScrollView } from 'react-native';

const CustomScrollView = ({ children }) => {
  return (
    <ScrollView
      contentContainerStyle={AppStyles.scrollViewContent}
      indicatorStyle="white"
      style={AppStyles.scrollView}
    >
      {children}
    </ScrollView>
  );
};

export default CustomScrollView;
