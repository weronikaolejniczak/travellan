import React, { memo } from 'react';
import { Text } from 'react-native-paper';

const CustomText = ({ children }) => <Text>{children}</Text>;

export default memo(CustomText);
