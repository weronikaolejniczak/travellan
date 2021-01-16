import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  ScrollView as Container,
  Headline,
  ItemlessFrame,
  TextInput,
} from 'utils';
import { View } from 'react-native';

const HotelRecommendationContainer = (props) => {
  const { startDate, endDate, cityCode } = props.route.params;

  return (
    <Container>
      <View>
        <Headline>Add your accomodation by typing name of your hotel</Headline>
      </View>
    </Container>
  );
};

export default HotelRecommendationContainer;
