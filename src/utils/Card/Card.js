import React, { memo } from 'react';
import { View } from 'react-native';

import { styles } from './CardStyle';

const Card = ({ style, children }) => (
  <View style={{ ...styles.card, ...style }}>{children}</View>
);

export default memo(Card);
