import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  ScrollView as Container,
  Headline,
  ItemlessFrame,
  TextInput,
  Subheading,
} from 'utils';
import RecommendationItemDetails from '../components/RecommendationItemDetails/RecommendationItemDetails';

const HotelRecommendationContainer = (props) => {
  const hotelInfo = props.route.params.hotelDetails;
  return (
    <Container>
      <RecommendationItemDetails data={hotelInfo} />
    </Container>
  );
};

export default HotelRecommendationContainer;
