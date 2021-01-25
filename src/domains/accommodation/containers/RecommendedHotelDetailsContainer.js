import LinearGradient from 'react-native-linear-gradient';
import React, { memo } from 'react';
import {
  ImageBackground,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import { Colors, Layout } from 'constants';
import { ScrollView as Container, ReadMore } from 'utils';
import { styles } from './RecommendedHotelDetailsContainerStyle';

// $todo: fix styling - don't duplicate code!
const HotelRecommendationContainer = ({ route }) => {
  const {
    amenities,
    creditCardPaymentPossible,
    description,
    image,
    location,
    name,
    offer,
    phone,
    rating,
  } = route.params.hotelDetails;

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const URL = 'https://www.google.com/search?q=';

  return (
    <Container>
      <ImageBackground style={styles.imageContainer} source={{ uri: image }}>
        <LinearGradient
          colors={['transparent', Colors.cards]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          locations={[0.4, 1]}
          style={Layout.fill}
        >
          <View style={styles.rating}>
            <Text style={[styles.text, styles.header]}>{rating}</Text>
          </View>
          <View style={styles.headerOverImage}>
            <Text style={[styles.text, styles.header]}>{name}</Text>
            <Text style={[styles.text, styles.subheader]}>
              {location.address}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.alignRow}>
        <View style={styles.details}>
          <Text style={[styles.text, styles.destination]}>Phone:</Text>
          <Text style={[styles.text, styles.date]}>{phone}</Text>
          <Text style={[styles.text, styles.destination]}>Description:</Text>
          <ReadMore longText={description} />
          <Text style={[styles.text, styles.destination]}>Amenities:</Text>
          <ReadMore longText={amenities.join(', ')} />
          <Text style={[styles.text, styles.destination]}>
            Payment by card:
          </Text>
          <Text style={[styles.text, styles.date]}>
            {creditCardPaymentPossible ? 'Possible' : 'Impossible'}
          </Text>
          <Text style={[styles.text, styles.destination]}>
            Hotel offer refers to:
          </Text>
          <Text style={[styles.text, styles.date]}>
            From: {offer.price.variations.changes[0].startDate} to{' '}
            {offer.price.variations.changes[0].endDate} for{' '}
            {offer.guests.adults} adults in total cost of {offer.price.total}
            {offer.price.currency}
          </Text>
          <TouchableCmp
            onPress={() => Linking.openURL(URL + name + location.address)}
          >
            <Text style={[styles.text, styles.destination]}>
              Search for this hotel in web
            </Text>
          </TouchableCmp>
        </View>
      </View>
    </Container>
  );
};

export default memo(HotelRecommendationContainer);
