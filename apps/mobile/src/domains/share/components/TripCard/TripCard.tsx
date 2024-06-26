import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';

import { Colors } from 'constants';
import { Card, Paragraph, Title } from 'utils';
import { styles } from './TripCardStyle';

const TripCard = ({
  id,
  isDisabled,
  destination,
  startDate,
  endDate,
  handleSelectTrip,
  isTripSelected,
}) => (
  <Card style={[styles.trip, isTripSelected && styles.selectedTrip]}>
    <TouchableOpacity
      style={styles.touchable}
      onPress={!isDisabled ? () => handleSelectTrip(id) : undefined}
    >
      <>
        <Title
          style={{ color: isTripSelected ? Colors.background : Colors.text }}
        >
          {destination}
        </Title>
        <Paragraph
          style={{ color: isTripSelected ? Colors.background : Colors.text }}
        >
          {new Date(startDate).toDateString()} -
          {new Date(endDate).toDateString()}
        </Paragraph>
      </>
    </TouchableOpacity>
  </Card>
);

export default memo(TripCard);
