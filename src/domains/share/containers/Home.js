import React, { useCallback, useEffect, useState } from 'react';
import ShareExtension from 'rn-extensions-share';
import axios from 'axios';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { BACKEND_URL } from 'react-native-dotenv';

import dummyHotel from '../data/DummyHotel.json';
import { BookingHotelCard, TripCard } from '../components';
import { Colors } from 'constants';
import {
  View as Container,
  Headline,
  ScrollView as ScrollContainer,
  Subheading,
} from 'utils';
import { store } from 'src/store';
import { homeStyle as styles } from './HomeStyle';

const COULD_NOT_SCRAPE_HOTEL_ERROR = `Sorry, we couldn't get your hotel info!\nAre you sure you have internet connection?`;
const INCORRECT_SHARING_DATA_ERROR = `You didn't share a Booking.com hotel page!\nUnfortunately, we don't support any other sharing data.`;
const USER_NOT_LOGGED_IN_ERROR = `You are not logged in!\nPlease, log in and share the webpage again!`;
const bookingRegex = new RegExp('www.booking.com/hotel');

// √ $todo: create accommodation card
// √ $todo: make user choose whether the data is correct
// √ $todo: display list of trips to save to
// $todo: send a request to add accommodation for each selected trip
// √ $todo: show error if user isn't logged in
// $todo: reuse repeated sections
// $todo: create reusable accommodation card
const Home = () => {
  const [value, setValue] = useState();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [trips, setTrips] = useState();
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [hotel, setHotel] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isSubmitting, setIsSubmitting] = useState();

  const authenticateUser = () => {
    const storedToken = store.getState().auth.token;
    const storedUserId = store.getState().auth.userId;

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);

      const storedTrips = store.getState().trips.trips;
      if (Array.isArray(storedTrips) && storedTrips.length > 0)
        setTrips(storedTrips);
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

  const handleSelectTrip = (id) =>
    selectedTrips.includes(id)
      ? setSelectedTrips([...selectedTrips.filter((item) => item.id !== id)])
      : setSelectedTrips([...selectedTrips, id]);

  const submitHandler = async () => {
    setIsSubmitting(true);
    await sleep(3000);
    setIsSubmitting(false);
  };

  useEffect(() => {
    authenticateUser();
    // fetchHotel();
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
        <Headline style={styles.text}>An error has occured!</Headline>
        <Subheading style={styles.error}>{error}</Subheading>
      </Container>
    );

  return (
    <ScrollContainer contentContainerStyle={styles.container}>
      <View>
        <Headline style={styles.headline}>1. Verify hotel data</Headline>
        <Subheading style={styles.caution}>
          Be sure to check it's valid!
        </Subheading>
        <View style={styles.hotelCardWrapper}>
          {!!hotel && <BookingHotelCard {...hotel} />}
        </View>
      </View>

      <View style={styles.section}>
        <Headline style={styles.headline}>2. Select trips</Headline>
        <Subheading style={styles.caution}>
          Save the hotel in as many trips as you'd like!
        </Subheading>
        <View>
          {trips ? (
            trips.map((item) => (
              <TripCard
                key={item.id}
                isTripSelected={selectedTrips.includes(item.id)}
                handleSelectTrip={handleSelectTrip}
                {...item}
              />
            ))
          ) : (
            <Text style={styles.text}>You have no trips! Create one.</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Headline style={styles.headline}>3. Add accommodation</Headline>
        <Subheading style={styles.caution}>
          Add the hotel from Booking.com to your trip!
        </Subheading>
        <View style={styles.submitWrapper}>
          <TouchableOpacity onPress={submitHandler} style={styles.button}>
            {isSubmitting && (
              <ActivityIndicator
                style={styles.loader}
                color={Colors.background}
              />
            )}
            <Text style={styles.buttonText}>Submit the hotel!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollContainer>
  );
};

export default Home;
