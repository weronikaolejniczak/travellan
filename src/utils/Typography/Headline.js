import React from 'react';
import { Headline } from 'react-native-paper';

const CustomHeadline = ({ children, style }) => (
  <Headline style={style}>{children}</Headline>
);

export default CustomHeadline;
