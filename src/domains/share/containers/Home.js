import React, { useCallback, useEffect, useState } from 'react';
import ShareExtension from 'rn-extensions-share';
import axios from 'axios';
import { ActivityIndicator, Text, View } from 'react-native';
import { BACKEND_URL } from 'react-native-dotenv';

import dummyHotel from '../data/DummyHotel.json';
import { BookingHotelCard } from '../components';
import { Colors } from 'constants';
import {
  View as Container,
  Headline,
  ScrollView as ScrollContainer,
  Subheading,
} from 'utils';
import { store } from 'src/store';
import { homeStyle as styles } from './HomeStyle';

const COULD_NOT_SCRAPE_HOTEL_ERROR = `Sorry, we couldn't get your hotel info! Are you sure you have internet connection?`;
const INCORRECT_SHARING_DATA_ERROR = `You didn't share a Booking.com hotel page! Unfortunately, we don't support any other sharing data.`;
const USER_NOT_LOGGED_IN_ERROR = `You are not logged in! Please, log in and share the webpage again!`;
const bookingRegex = new RegExp('www.booking.com/hotel');

// $todo: create accommodation card
// $todo: make user choose whether the data is correct
// $todo: display list of trips to save to
// $todo: send a request to add accommodation for each selected trip
// √ $todo: show error if user isn't logged in
const Home = () => {
  const [value, setValue] = useState();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [hotel, setHotel] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  const authenticateUser = () => {
    const storedToken = store.getState().auth.token;
    const storedUserId = store.getState().auth.userId;

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    } else {
      setError(USER_NOT_LOGGED_IN_ERROR);
    }
  };

  const sleep = useCallback(
    (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    [],
  );

  const mockFetch = useCallback(async () => {
    setIsLoading(true);
    await sleep(2000);
    setHotel(dummyHotel);
    setIsLoading(false);
  }, [sleep]);

  // $todo: has to be optimized so that the request fires once (not twice)
  // √ $todo: error handling
  // $todo: break this function down to smaller pieces
  // √ $todo: check whether the url matches the Booking.com hotel page RegExp
  const fetchHotel = useCallback(async () => {
    setIsLoading(true);

    if (token && userId && !value) {
      const data = await ShareExtension.data();

      if (data && data[0].value.match(bookingRegex)) {
        setValue(data[0].value);
        const region = data[0].value.split('/')[4];
        const name = data[0].value.split('/')[5].split('.')[0];

        try {
          const result = await axios.get(
            `${BACKEND_URL}/accommodation/booking?region=${region}&name=${name}`,
          );
          setHotel(result.data);
        } catch {
          setError(COULD_NOT_SCRAPE_HOTEL_ERROR);
        }

        setIsLoading(false);
      } else {
        setError(INCORRECT_SHARING_DATA_ERROR);
      }
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    authenticateUser();
    //fetchHotel();
    mockFetch();
  }, [mockFetch]);

  if (isLoading)
    return (
      <Container style={styles.helperContainer}>
        <ActivityIndicator color={Colors.primary} />
        <Subheading style={styles.caution}>
          Loading data may take up to a minute!
        </Subheading>
      </Container>
    );

  if (error)
    return (
      <Container style={styles.helperContainer}>
        <Text style={styles.text}>An error has occured!</Text>
        <Text style={styles.error}>{error}</Text>
      </Container>
    );

  return (
    <ScrollContainer contentContainerStyle={styles.container}>
      <Headline style={styles.text}>Hotel data</Headline>
      <Subheading style={styles.caution}>
        Be sure to check it's valid!
      </Subheading>
      <View style={styles.hotelCardWrapper}>
        {!!hotel && <BookingHotelCard {...hotel} />}
      </View>
    </ScrollContainer>
  );
};

export default Home;
