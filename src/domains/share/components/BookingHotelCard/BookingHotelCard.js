import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';

import BookingHotelCardSection from '../BookingHotelCardSection/BookingHotelCardSection';
import {
  Caption,
  Card,
  Headline,
  Paragraph,
  ReadMore,
  Subheading,
  Text,
} from 'utils';
import { Colors } from 'constants';
import { styles } from './BookingHotelCardStyle';

const BookingHotelCard = ({
  amenities,
  creditCardPaymentPossible,
  checkInHours,
  checkOutHours,
  checkInExtra,
  description,
  frontDesk24h,
  image,
  location,
  name,
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
        <BookingHotelCardSection title="Hotel hours">
          {frontDesk24h && (
            <Paragraph style={styles.caution}>
              Front desk is open 24 hours a day!
            </Paragraph>
          )}
          {!!checkInExtra && (
            <Paragraph style={styles.caution}>{checkInExtra}</Paragraph>
          )}
          <View style={styles.checkInAndCheckOutHoursWrapper}>
            <View style={styles.checkInWrapper}>
              <Caption style={styles.caption}>Check in hours</Caption>
              <Text style={styles.text}>{checkInHours}</Text>
            </View>
            <View style={styles.checkOutWrapper}>
              <Caption style={styles.caption}>Check out hours</Caption>
              <Text style={styles.text}>{checkOutHours}</Text>
            </View>
          </View>
        </BookingHotelCardSection>

        <BookingHotelCardSection title="Amenities">
          <ReadMore longText={amenities.join(', ')} />
        </BookingHotelCardSection>

        <BookingHotelCardSection title="Description">
          <ReadMore longText={description} />
        </BookingHotelCardSection>

        <BookingHotelCardSection title="Payment">
          <Paragraph style={styles.text}>
            {creditCardPaymentPossible
              ? 'Credit card payment is possible!'
              : 'Credit card payment is NOT possible!'}
          </Paragraph>
        </BookingHotelCardSection>
      </View>
    </ScrollView>
  </Card>
);

export default BookingHotelCard;
