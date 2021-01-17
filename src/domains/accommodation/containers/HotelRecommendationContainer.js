import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  ScrollView as Container,
  Headline,
  ItemlessFrame,
  TextInput,
  Subheading,
} from 'utils';
import { View, Animated, FlatList } from 'react-native';
import { styles } from './HotelRecommendationContainerStyle';
import recommendHotel from 'services/recommendHotel';
import { DUMMY_AMADEUS_RECOMMENDATION } from 'data/DummyAmadeusHotel';
import { RecommendationItemShort } from 'domains/accommodation/components';
import { cardWidth } from 'domains/accommodation/components/AccommodationItem/AccommodationItemStyle';

const HotelRecommendationContainer = (props) => {
  let { startDate, endDate } = props.route.params;
  const cityCode = props.route.params.cityCode;
  const [isLoading, setIsLoading] = useState(false);
  const [isDateSame, setIsDateSame] = useState(true);
  const [adults, setAdults] = useState(0);
  const [roomQuantity, setRoomQuantity] = useState(0);
  const [data, setData] = useState();
  const [error, setError] = useState('');
  const testData = DUMMY_AMADEUS_RECOMMENDATION;
  console.log('test data:', testData);
  let scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, cardWidth);

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

  const findHotels = useCallback(async () => {
    startDate = formatDate(startDate);
    endDate = formatDate(endDate);
    try {
      const result = await recommendHotel(
        cityCode,
        startDate,
        endDate,
        adults,
        roomQuantity,
      );
      setData(result);
    } catch {
      setError(error);
    }
  }, [cityCode, startDate, endDate, adults, roomQuantity, error]);

  const handlePress = () => {
    setIsLoading(true);
    handleAdults();
    handleRoomQuantity();
    findHotels(cityCode, startDate, endDate, adults, roomQuantity);
  };

  useEffect(() => {
    if (formatDate(startDate) === formatDate(endDate)) {
      setIsDateSame(true);
    } else {
      setIsDateSame(false);
    }
  }, [startDate, endDate, testData]);

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

  if (testData)
    return (
      <Container>
        <FlatList
          data={testData}
          keyExtractor={(item) => item.dupeId.toString()}
          renderItem={(data) => <RecommendationItemShort data={data.item} />}
        />
      </Container>
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
