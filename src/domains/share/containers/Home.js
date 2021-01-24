import React, { memo, useCallback, useEffect, useState } from 'react';
import ShareExtension from 'rn-extensions-share';
import axios from 'axios';
import { ActivityIndicator, Linking, Text, View } from 'react-native';
import { BACKEND_URL } from 'react-native-dotenv';

import postAccommodation from 'services/accommodation/postAccommodation';
import { Colors } from 'constants';
import {
  View as Container,
  ErrorFrame,
  Headline,
  ScrollView as ScrollContainer,
  Subheading,
} from 'utils';
import { HotelCard } from 'components';
import { SubmitButton, TripCard } from '../components';
import { store } from 'src/store';
import { homeStyle as styles } from './HomeStyle';

const COULD_NOT_SCRAPE_HOTEL_ERROR = `Sorry, we couldn't get your hotel info!\nAre you sure you have internet connection?`;
const INCORRECT_SHARING_DATA_ERROR = `You didn't share a Booking.com hotel page!\nUnfortunately, we don't support any other sharing data.`;
const USER_NOT_LOGGED_IN_ERROR = `You are not logged in!\nPlease, log in and share the webpage again!`;
const NO_TRIPS_SELECTED_ERROR = `You haven't selected any trip!`;
const COULD_NOT_SAVE_ACCOMMODATION_ERROR = `Sorry, we could't save the accommodation!\nAre you sure you are logged in and have internet connection?`;
const APP_URL = 'travellan://app';
const bookingRegex = new RegExp('www.booking.com/hotel');

const Home = () => {
  const [value, setValue] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [trips, setTrips] = useState();
  const [selectedTrips, setSelectedTrips] = useState([]);
  const [selectedTripsError, setSelectedTripsError] = useState('');
  const [hotel, setHotel] = useState();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      } else {
        setError(INCORRECT_SHARING_DATA_ERROR);
      }
    }
  }, [token, userId, value]);

  const handleSelectTrip = (id) => {
    setSelectedTripsError();
    selectedTrips.includes(id)
      ? setSelectedTrips(selectedTrips.filter((item) => item !== id))
      : setSelectedTrips([...selectedTrips, id]);
  };

  const saveAccommodationToTrips = async (data) => {
    for (let i = 0; i < selectedTrips.length; i++) {
      await postAccommodation(
        userId,
        token,
        selectedTrips[i],
        hotel.amenities,
        hotel.breakfast,
        hotel.checkInExtra,
        hotel.checkInHours,
        hotel.checkOutHours,
        hotel.creditCardPaymentPossible,
        hotel.description,
        hotel.frontDesk24H,
        hotel.image,
        hotel.location,
        hotel.name,
        '',
        '',
      );
    }
  };

  const handleSubmit = async () => {
    if (selectedTrips.length > 0) {
      setIsSubmitting(true);
      try {
        await saveAccommodationToTrips();
      } catch {
        setError(COULD_NOT_SAVE_ACCOMMODATION_ERROR);
      }

      if (!error) {
        Linking.canOpenURL(APP_URL)
          ? Linking.openURL(APP_URL)
          : ShareExtension.close();
      }

      setIsSubmitting(false);
    } else {
      setSelectedTripsError(NO_TRIPS_SELECTED_ERROR);
    }
  };

  useEffect(() => {
    authenticateUser();
    fetchHotel();
  }, [fetchHotel]);

  useEffect(() => {
    setIsLoading(false);
  }, [error, hotel]);

  if (isLoading)
    return (
      <Container style={styles.helperContainer}>
        <ActivityIndicator color={Colors.primary} />
        <Subheading style={styles.caution}>
          Loading data may take up to a minute!
        </Subheading>
      </Container>
    );

  if (error) return <ErrorFrame error={error} />;

  return (
    <ScrollContainer contentContainerStyle={styles.container}>
      {!!hotel && (
        <>
          <View>
            <Headline style={styles.headline}>1. Verify hotel data</Headline>
            <Subheading style={styles.caution}>
              Be sure to check it's valid!
            </Subheading>
            <View style={styles.hotelCardWrapper}>
              {!!hotel && <HotelCard sharing {...hotel} />}
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
                    isDisabled={isSubmitting}
                    {...item}
                  />
                ))
              ) : (
                <Text style={styles.text}>You have no trips! Create one.</Text>
              )}
            </View>
            {!!selectedTripsError && (
              <View>
                <Text style={styles.error}>{selectedTripsError}</Text>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Headline style={styles.headline}>3. Add accommodation</Headline>
            <Subheading style={styles.caution}>
              Add the hotel from Booking.com to your trip!
            </Subheading>
            <View style={styles.submitWrapper}>
              <SubmitButton
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                onPress={handleSubmit}
              >
                Submit the hotel
              </SubmitButton>
            </View>
          </View>
        </>
      )}
    </ScrollContainer>
  );
};

export default memo(Home);
