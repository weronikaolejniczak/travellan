import React, { memo } from 'react';
import { Paragraph } from 'react-native-paper';

const CustomParagraph = ({ children }) => <Paragraph>{children}</Paragraph>;

export default memo(CustomParagraph);
