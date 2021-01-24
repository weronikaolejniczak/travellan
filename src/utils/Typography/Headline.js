import React, { memo } from 'react';
import { Headline } from 'react-native-paper';

const CustomHeadline = ({
  children,
  color,
  margin,
  fontSize,
  textAlign,
  ...rest
}) => (
  <Headline
    {...rest}
    color={color}
    margin={margin}
    fontSize={fontSize}
    textAlign={textAlign}
  >
    {children}
  </Headline>
);

export default memo(CustomHeadline);
