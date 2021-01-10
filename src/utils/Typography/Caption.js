import React, { memo } from 'react';
import { Caption } from 'react-native-paper';

const CustomCaption = ({ children }) => <Caption>{children}</Caption>;

export default memo(CustomCaption);
