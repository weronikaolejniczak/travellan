import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  ScrollView as Container,
  Headline,
  ItemlessFrame,
  TextInput,
  Subheading,
} from 'utils';
import { View } from 'react-native';
import { styles } from './HotelRecommendationContainerStyle';
import recommendHotel from 'services/recommendHotel';

const HotelRecommendationContainer = (props) => {
  const { startDate, endDate, cityCode } = props.route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isDateSame, setIsDateSame] = useState(true);
  const [adults, setAdults] = useState(0);
  const [roomQuantity, setRoomQuantity] = useState(0);

  // async function recommendHotel(
  //cityCode,
  //checkInDate,
  //checkOutDate,
  //adults,
  //roomQuantity,
  //)

  const formatDate = (date) => {
    //format to YYYY-MM-DD
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const handleAdults = (adults) => setAdults(adults);
  const handleRoomQuantity = (roomQuantity) => setRoomQuantity(roomQuantity);

  const handlePress = () => {
    setIsLoading(true);
    handleAdults();
    handleRoomQuantity();
  };

  useEffect(() => {
    if (formatDate(startDate) === formatDate(endDate)) {
      setIsDateSame(true);
    } else {
      setIsDateSame(false);
    }
  }, [startDate, endDate]);

  if (cityCode === undefined)
    return (
      <ItemlessFrame message="Sorry, recommendation for hotels near your destination is impossible!" />
    );

  if (isDateSame)
    return (
      <ItemlessFrame
        message="Recommendation for hotels is not possible if you are going on a
    one day trip!"
      />
    );

  return (
    <Container>
      <View>
        <Headline style={styles.headline}>
          We will find the most attractive accommodation offers for your
          destination
        </Headline>
        <Subheading>Add number of adults:</Subheading>
        <TextInput
          label="Number of adults"
          value={adults}
          onChange={handleAdults}
          keyboardType="numeric"
        />
        <Subheading>Add number of rooms:</Subheading>
        <TextInput
          label="Room Quantity"
          value={roomQuantity}
          onChange={handleRoomQuantity}
          keyboardType="numeric"
        />

        <Button loading={isLoading} disabled={isLoading} onPress={handlePress}>
          Submit
        </Button>
      </View>
    </Container>
  );
};

export default HotelRecommendationContainer;
