import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';

import Colors from 'constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Icon}
      iconSize={23}
      color={Platform.OS === 'android' ? Colors.text : Colors.accent}
    />
  );
};

export default CustomHeaderButton;
