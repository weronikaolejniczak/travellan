import React from 'react';
import { Text } from 'react-native-paper';

const CustomText = ({ children, style }) => (
  <Text style={style}>{children}</Text>
);

export default CustomText;
