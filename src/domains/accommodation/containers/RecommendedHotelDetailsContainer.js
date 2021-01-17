import React from 'react';
import { ScrollView as Container } from 'utils';
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
