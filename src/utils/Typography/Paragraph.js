import React from 'react';
import { Paragraph } from 'react-native-paper';

const CustomParagraph = ({ children, color, margin, fontSize, textAlign }) => (
  <Paragraph
    color={color}
    margin={margin}
    fontSize={fontSize}
    textAlign={textAlign}
  >
    {children}
  </Paragraph>
);

export default CustomParagraph;
