import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import recommendHotel from 'services/recommendHotel';
import {
  Button,
  ScrollView as Container,
  Headline,
  ItemlessFrame,
  TextInput,
} from 'utils';
import { Recommendation } from '../components';
import { styles } from './HotelRecommendationContainerStyle';

const HotelRecommendationContainer = ({ navigation, route }) => {
  const { cityCode, startDate, endDate } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [isDateSame, setIsDateSame] = useState(true);
  const [adults, setAdults] = useState('');
  const [roomQuantity, setRoomQuantity] = useState('');
  const [data, setData] = useState();
  const [error, setError] = useState('');

  const formatDate = (date) => {
    // format to YYYY-MM-DD
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const findHotels = useCallback(async () => {
    setIsLoading(true);
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    try {
      const result = await recommendHotel(
        cityCode,
        formattedStartDate,
        formattedEndDate,
        adults,
        roomQuantity,
      );

      setData(result);
      setIsLoading(false);
    } catch {
      setError(error);
      setIsLoading(false);
    }
  }, [cityCode, startDate, endDate, adults, roomQuantity, error]);

  const handleSubmit = () => {
    findHotels(cityCode, startDate, endDate, adults, roomQuantity);
    setAdults();
    setRoomQuantity();
  };

  const handleSelectItem = () => {
    navigation.navigate('Hotel details', {
      hotelDetails: data,
    });
  };

  useEffect(() => {
    if (formatDate(startDate) === formatDate(endDate)) {
      setIsDateSame(true);
    } else {
      setIsDateSame(false);
    }
  }, [data, endDate, startDate]);

  if (cityCode === undefined)
    return (
      <ItemlessFrame>
        Sorry, recommendation for hotels near your destination is impossible!
      </ItemlessFrame>
    );

  if (isDateSame)
    return (
      <ItemlessFrame>
        Recommendation for hotels is not possible if you are going on a one day
        trip!
      </ItemlessFrame>
    );

  if (data)
    return (
      <Container>
        <FlatList
          data={data}
          keyExtractor={(item) => item.dupeId}
          renderItem={(el) => (
            <Recommendation
              data={el.item}
              onSelect={() => handleSelectItem(el.item)}
            />
          )}
        />
      </Container>
    );

  return (
    <Container>
      <Headline style={styles.headline}>
        We will find the most attractive accommodation offers for your
        destination
      </Headline>

      <TextInput
        label="Number of adults"
        value={adults}
        onChange={setAdults}
        keyboardType="numeric"
      />

      <TextInput
        label="Room quantity"
        value={roomQuantity}
        onChange={setRoomQuantity}
        keyboardType="numeric"
      />

      <Button loading={isLoading} disabled={isLoading} onPress={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default HotelRecommendationContainer;
