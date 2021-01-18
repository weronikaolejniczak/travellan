import React from 'react';
import { Caption } from 'react-native-paper';

const CustomCaption = ({ children, style }) => (
  <Caption style={style}>{children}</Caption>
);

export default CustomCaption;
