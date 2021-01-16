import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';

import { Card, Headline, ReadMore, Subheading, Title } from 'utils';
import { Colors } from 'constants';
import { styles } from './BookingHotelCardStyle';

const BookingHotelCard = ({
  image,
  name,
  location,
  frontDesk24h,
  description,
  creditCardPaymentPossible,
  checkInHours,
  checkOutHours,
  checkInExtra,
}) => (
  <Card>
    <ScrollView>
      <ImageBackground style={styles.image} source={{ uri: image }}>
        <LinearGradient
          colors={[Colors.transparent, Colors.cards]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          locations={[0.6, 1]}
          style={styles.linearGradient}
        >
          <View style={styles.header}>
            <Headline style={styles.text}>{name}</Headline>
            <Subheading style={styles.subheading}>
              {location.address}
            </Subheading>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.content}>
        <View style={styles.section}>
          <Title style={styles.text}>Description</Title>
          <ReadMore longText={description} />
        </View>
      </View>
    </ScrollView>
  </Card>
);

export default BookingHotelCard;
