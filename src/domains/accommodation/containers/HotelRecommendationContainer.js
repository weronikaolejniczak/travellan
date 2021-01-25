import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import recommendHotel from 'services/recommendHotel';
import {
  Button,
  View as Container,
  Headline,
  ItemlessFrame,
  TextInput,
  Text,
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

  const handleSelectItem = (data) => {
    navigation.navigate('Recommended Hotel Details', {
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

  if (data && data.length === 0)
    return (
      <ItemlessFrame>
        Sorry, we couldn't find any hotel recommendations for your trip!
      </ItemlessFrame>
    );

  if (data && data.length > 0)
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
      <Text style={styles.text}>
        Loading recommended hotels may take up to one minute!
      </Text>
    </Container>
  );
};

export default HotelRecommendationContainer;
