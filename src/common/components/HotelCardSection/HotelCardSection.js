import React, { memo } from 'react';
import { View } from 'react-native';

import { Title } from 'utils';
import { styles } from './HotelCardSectionStyle';

const HotelCardSection = ({ title = 'Section title', children }) => (
  <View style={styles.section}>
    <Title style={styles.text}>{title}</Title>
    {children}
  </View>
);

export default memo(HotelCardSection);
