import React from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

import { Card } from 'utils';
import { styles } from './RecommendationItemHeaderStyle';

const RecommendationItemHeader = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.tripCard}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: props.image.imageUrl }}
              />
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

export default RecommendationItemHeader;
