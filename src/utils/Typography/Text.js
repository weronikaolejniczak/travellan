import React, { memo } from 'react';
import { Text } from 'react-native-paper';

const CustomText = ({ children, style }) => (
  <Text style={style}>{children}</Text>
);

export default memo(CustomText);
