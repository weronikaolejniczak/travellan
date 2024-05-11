import React, { memo } from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HeaderButton } from 'react-navigation-header-buttons';

import { Colors } from 'constants';

const CustomHeaderButton = (props) => (
  <HeaderButton
    {...props}
    IconComponent={Icon}
    iconSize={23}
    color={Platform.OS === 'android' ? Colors.text : Colors.accent}
  />
);

export default memo(CustomHeaderButton);
