import React from 'react';
import { Subheading } from 'react-native-paper';

const CustomSubheading = ({ children, style }) => (
  <Subheading style={style}>{children}</Subheading>
);

export default CustomSubheading;
