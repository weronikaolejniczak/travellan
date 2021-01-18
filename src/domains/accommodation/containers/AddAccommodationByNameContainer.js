import React, { useCallback, useEffect, useState } from 'react';
import fetchHotelByName from 'services/fetchHotelByName';
import {
  Button,
  ScrollView as Container,
  Headline,
  ItemlessFrame,
  TextInput,
} from 'utils';
import { View } from 'react-native';
import { HotelCard } from 'components';
import { styles } from './AddAccommodationByNameStyleContainer';
import { DUMMY_HOTELS_BY_NAME as testData } from 'data/DummyHotelByName';

const AddAccommodationByNameContainer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDateSame, setIsDateSame] = useState(true);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState();
  const { startDate, endDate, cityCode } = props.route.params;

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

  const handleChange = (val) => setValue(val);

  const fetchHotel = useCallback(async () => {
    try {
      const result = await fetchHotelByName(cityCode, value);
      setData(result);
    } catch {
      setError(error);
    }
  }, [cityCode, error, value]);

  const handlePress = () => {
    handleChange();
    setIsLoading(true);
    fetchHotel(cityCode, value);
  };

  useEffect(() => {
    if (formatDate(startDate) === formatDate(endDate)) {
      setIsDateSame(true);
    } else {
      setIsDateSame(false);
    }
  }, [testData]);

  if (cityCode === undefined)
    return (
      <ItemlessFrame message="Sorry, searching for hotels by name near your destination is impossible!" />
    );

  if (isDateSame)
    return (
      <ItemlessFrame message="Sorry, searching for hotels by name is not possible if you are going on one day trip!" />
    );

  if (testData)
    return (
      <Container contentContainerStyle={styles.container}>
        <View style={styles.hotelCardWrapper}>
          <HotelCard {...testData[0]} />
        </View>
      </Container>
    );

  return (
    <Container>
      <View style={{ marginBottom: 10, marginTop: 10 }}>
        <Headline>Add your accomodation by typing name of your hotel</Headline>
      </View>
      <TextInput
        label="Hotel name"
        error={error}
        onChange={handleChange}
        value={value}
      />
      <Button loading={isLoading} disabled={isLoading} onPress={handlePress}>
        Submit
      </Button>
    </Container>
  );
};

export default AddAccommodationByNameContainer;
