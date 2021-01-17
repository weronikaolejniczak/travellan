import React from 'react';
import {
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Layout } from 'constants';

import { Card, ReadMore } from 'utils';
import { styles } from './RecommendationItemDetailsStyle';

const RecommendationItemDetails = ({ data, onSelect }) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.recommendationCard}>
      <TouchableCmp onPress={onSelect} useForeground>
        <ImageBackground
          style={styles.imageContainer}
          source={{ uri: data.image }}
        >
          <LinearGradient
            colors={['transparent', Colors.cards]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            locations={[0.4, 1]}
            style={Layout.fill}
          >
            <View style={styles.rating}>
              <Text style={[styles.text, styles.header]}>{data.rating}</Text>
            </View>
            <View style={styles.headerOverImage}>
              <Text style={[styles.text, styles.header]}>{data.name}</Text>
              <Text style={[styles.text, styles.subheader]}>
                {data.location.address}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.alignRow}>
          <View style={styles.details}>
            <Text style={[styles.text, styles.destination]}>Phone:</Text>
            <Text style={[styles.text, styles.date]}>{data.phone}</Text>
            <Text style={[styles.text, styles.destination]}>Description:</Text>
            <ReadMore longText={data.description} />
            <Text style={[styles.text, styles.destination]}>Amenities:</Text>
            <ReadMore longText={data.amenities.join(', ')} />
            <Text style={[styles.text, styles.destination]}>
              Payment by card:
            </Text>
            <Text style={[styles.text, styles.date]}>
              {data.creditCardPaymentPossible ? 'Possible' : 'Impossible'}
            </Text>
            <Text style={[styles.text, styles.destination]}>
              Hotel offer refers to:
            </Text>
            <Text style={[styles.text, styles.date]}>
              From: {data.offer.price.variations.changes[0].startDate} to{' '}
              {data.offer.price.variations.changes[0].endDate} for{' '}
              {data.offer.guests.adults} adults in total cost of{' '}
              {data.offer.price.total}
              {data.offer.price.currency}
            </Text>
          </View>
        </View>
      </TouchableCmp>
    </Card>
  );
};

export default RecommendationItemDetails;
