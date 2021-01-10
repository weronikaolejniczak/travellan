import React, { memo } from 'react';
import { Title } from 'react-native-paper';

const CustomTitle = ({ children }) => <Title>{children}</Title>;

export default memo(CustomTitle);
