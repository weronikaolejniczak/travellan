import LinearGradient from 'react-native-linear-gradient';
import React, { memo } from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';

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
import { HotelCardSection } from '../';
import { styles } from './HotelCardStyle';

const HotelCard = ({
  sharing,
  inAccommodationListing,
  amenities,
  cardStyle,
  creditCardPaymentPossible,
  checkInHours,
  checkOutHours,
  checkInExtra,
  description,
  frontDesk24h,
  image,
  location,
  name,
  phone,
  reservationDetails,
}) => (
  <Card style={cardStyle}>
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
            <Headline style={styles.headline}>{name}</Headline>
            <Subheading style={styles.subheading}>
              {location.address}
            </Subheading>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.content}>
        {!sharing && (
          <HotelCardSection title="Contact">
            <Caption style={styles.caption}>Phone</Caption>
            <Paragraph style={styles.text}>
              {phone ? phone : 'not declared'}
            </Paragraph>
          </HotelCardSection>
        )}

        {checkInHours && checkOutHours && (
          <HotelCardSection title="Hotel hours">
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
          </HotelCardSection>
        )}

        <HotelCardSection title="Amenities">
          <ReadMore longText={amenities.join(', ')} />
        </HotelCardSection>

        <HotelCardSection title="Description">
          <ReadMore longText={description} />
        </HotelCardSection>

        <HotelCardSection title="Payment">
          <Paragraph style={styles.text}>
            {creditCardPaymentPossible
              ? 'Credit card payment is possible!'
              : 'Credit card payment is NOT possible!'}
          </Paragraph>
        </HotelCardSection>

        {inAccommodationListing && (
          <HotelCardSection title="Reservation details">
            {reservationDetails ? (
              <ReadMore longText={reservationDetails} />
            ) : (
              <Paragraph style={styles.placeholder}>
                check in/out information, room number, direction tips, contact,
                is all-inclusive etc.
              </Paragraph>
            )}
          </HotelCardSection>
        )}
      </View>
    </ScrollView>
  </Card>
);

export default memo(HotelCard);
