import React from 'react';
import { Title } from 'react-native-paper';

const CustomTitle = ({ children, style }) => (
  <Title style={style}>{children}</Title>
);

export default CustomTitle;
