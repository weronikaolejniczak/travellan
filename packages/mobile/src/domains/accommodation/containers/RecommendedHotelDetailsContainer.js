import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import React, { memo } from 'react';
import {
  ImageBackground,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Caption,
  Headline,
  Paragraph,
  ReadMore,
  Subheading,
  Text,
  Title,
} from 'utils';
import { Colors, Layout } from 'constants';
import { styles } from './RecommendedHotelDetailsContainerStyle';

// $todo: fix styling - don't duplicate code!
const RecommendedHotelDetailsContainer = ({ route }) => {
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

  const URL = 'https://www.google.com/search?q=';

  return (
    <ScrollView style={styles.content}>
      <ImageBackground style={styles.imageContainer} source={{ uri: image }}>
        <LinearGradient
          colors={['transparent', Colors.background]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          locations={[0.4, 1]}
          style={Layout.fill}
        >
          <View style={styles.rating}>
            <Headline>{rating}</Headline>
          </View>
          <View style={styles.headerOverImage}>
            <Headline>{name}</Headline>
            <Subheading>{location.address}</Subheading>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.details}>
        <View style={[styles.section, styles.linkButtonWrapper]}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => Linking.openURL(URL + name + location.address)}
          >
            <Icon name="search-web" style={styles.linkButtonIcon} />
            <Text style={styles.linkButtonText}>
              Search for this hotel in web
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Title>Contact</Title>
          <Caption>Phone</Caption>
          <Paragraph>{phone}</Paragraph>
        </View>

        <View style={styles.section}>
          <Title>Description</Title>
          <ReadMore longText={description} />
        </View>

        <View style={styles.section}>
          <Title>Amenities</Title>
          <ReadMore longText={amenities.join(', ')} />
        </View>

        <View style={styles.section}>
          <Title>Payment methods</Title>
          <Caption>Credit card</Caption>
          <Paragraph>
            {creditCardPaymentPossible
              ? 'Credit card payment available'
              : 'Credit card payment NOT available'}
          </Paragraph>
        </View>

        <View style={styles.section}>
          <Title>Offer details</Title>
          <View style={styles.offerContent}>
            <View style={styles.offerColumn}>
              <Caption>From</Caption>
              <Paragraph>
                {offer.price.variations.changes[0].startDate}
              </Paragraph>
              <Caption>Until</Caption>
              <Paragraph>{offer.price.variations.changes[0].endDate}</Paragraph>
            </View>
            <View style={styles.offerColumn}>
              <Caption>Number of adults</Caption>
              <Paragraph>{offer.guests.adults}</Paragraph>
              <Caption>Total cost</Caption>
              <Paragraph>
                {offer.price.total} {offer.price.currency}
              </Paragraph>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default memo(RecommendedHotelDetailsContainer);
