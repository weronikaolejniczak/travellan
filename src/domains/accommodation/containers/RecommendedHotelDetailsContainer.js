import React, { memo } from 'react';

import { ScrollView as Container } from 'utils';
import { RecommendationItemDetails } from '../components';

// $todo: fix styling - don't duplicate code!
const HotelRecommendationContainer = ({ route }) => (
  <Container>
    <RecommendationItemDetails data={route.params.hotelDetails} />
  </Container>
);

export default memo(HotelRecommendationContainer);
