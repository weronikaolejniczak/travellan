import React, { memo } from 'react';
import { Subheading } from 'react-native-paper';

const CustomSubheading = ({ children }) => <Subheading>{children}</Subheading>;

export default memo(CustomSubheading);
