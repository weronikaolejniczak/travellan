import React from 'react';
import { Paragraph } from 'react-native-paper';

const CustomParagraph = ({
  children,
  color,
  margin,
  fontSize,
  textAlign,
  ...rest
}) => (
  <Paragraph
    {...rest}
    color={color}
    margin={margin}
    fontSize={fontSize}
    textAlign={textAlign}
  >
    {children}
  </Paragraph>
);

export default CustomParagraph;
