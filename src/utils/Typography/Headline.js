import React, { memo } from 'react';
import { Headline } from 'react-native-paper';

const CustomHeadline = ({ children }) => <Headline>{children}</Headline>;

export default memo(CustomHeadline);
