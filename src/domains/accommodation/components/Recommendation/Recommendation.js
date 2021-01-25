import LinearGradient from 'react-native-linear-gradient';
import React, { memo } from 'react';
import {
  ImageBackground,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import { Caption, Card, Headline, Paragraph, Subheading } from 'utils';
import { Colors, Layout } from 'constants';
import { styles } from './RecommendationStyle';

const Recommendation = ({ data, onSelect }) => {
  const { image, rating, location, name, offer } = data;
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21)
    TouchableCmp = TouchableNativeFeedback;

  return (
    <Card style={styles.recommendationCard}>
      <TouchableCmp onPress={onSelect} useForeground>
        <ImageBackground style={styles.imageContainer} source={{ uri: image }}>
          <LinearGradient
            colors={['transparent', Colors.cards]}
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

        <View style={styles.content}>
          <Caption>Timespan</Caption>
          <Paragraph>
            {offer.price.variations.changes[0].startDate} to{' '}
            {offer.price.variations.changes[0].endDate}
          </Paragraph>

          <Caption>Pricing</Caption>
          <Paragraph>
            {offer.price.total} {offer.price.currency}
          </Paragraph>
        </View>
      </TouchableCmp>
    </Card>
  );
};

export default memo(Recommendation);
