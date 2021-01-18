import React from 'react';
import { View } from 'react-native';

import { Title } from 'utils';
import { styles } from './BookingHotelCardSectionStyle';

const BookingHotelCardSection = ({ title = 'Section title', children }) => (
  <View style={styles.section}>
    <Title style={styles.text}>{title}</Title>
    {children}
  </View>
);

export default BookingHotelCardSection;
