import React, { memo } from 'react';
import { ScrollView } from 'react-native';

import AppStyles from 'styles/AppStyles';

const CustomScrollView = ({ children }) => (
  <ScrollView
    contentContainerStyle={AppStyles.scrollViewContent}
    indicatorStyle="white"
    style={AppStyles.scrollView}
  >
    {children}
  </ScrollView>
);

export default memo(CustomScrollView);
