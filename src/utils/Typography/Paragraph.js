import React, { memo } from 'react';
import { Paragraph } from 'react-native-paper';

const CustomParagraph = ({ children, style }) => (
  <Paragraph style={style}>{children}</Paragraph>
);

export default memo(CustomParagraph);
