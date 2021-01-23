import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { ScrollView } from 'react-native';

import AppStyles from 'styles/AppStyles';

const CustomScrollView = ({ children, ...props }, ref) => {
  const scrollViewRef = useRef();

  useImperativeHandle(ref, () => ({
    scrollToEnd: () => scrollViewRef.current.scrollToEnd({ animated: true }),
  }));

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={AppStyles.scrollViewContent}
      indicatorStyle="white"
      style={AppStyles.scrollView}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default forwardRef(CustomScrollView);
