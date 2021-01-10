import LinearGradient from 'react-native-linear-gradient';
import React, { memo } from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationButton } from '../components';
import { addEventToCalendar } from 'services/handleCalendarEvent';
import { styles } from './TripDetailsContainerStyle.js';

const TripDetailsContainer = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const { destination, startDate, endDate, image } = selectedTrip;
  const { author, username, imageUrl } = image;

  const startDateFormatted = selectedTrip.startDate
    .split(' ')
    .slice(1, 4)
    .join(' ');

  const endDateFormatted = selectedTrip.endDate
    .split(' ')
    .slice(1, 4)
    .join(' ');

  const CalendarEventChandler = addEventToCalendar;

  const addTripToCalendar = () =>
    CalendarEventChandler.addToCalendar(
      'Trip to ' + destination,
      Date.parse(startDate),
      Date.parse(endDate),
      destination,
      'Remember to pack everything and check weather forecast!',
    );

  return (
    <ScrollView style={styles.container}>
      <ImageBackground style={styles.image} source={{ uri: imageUrl }}>
        <Icon
          name="calendar"
          onPress={addTripToCalendar}
          size={35}
          style={styles.calendarIcon}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.00)', '#222222']}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          locations={[0.6, 1]}
          style={styles.linearGradient}
        >
          <View style={styles.dateContainer}>
            <View style={{ justifyContent: 'space-around' }}>
              <Text style={[styles.text, { textAlign: 'center' }]}>
                Photo by {author} @Unsplash/{username}
              </Text>
            </View>
            <Text style={[styles.text, styles.header, styles.date]}>
              <Text style={[styles.text, styles.date]}>
                {startDate === endDate
                  ? startDateFormatted
                  : `${startDateFormatted} - ${endDateFormatted}`}
              </Text>
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View>
        <View style={styles.tiles}>
          <NavigationButton
            navigation={props.navigation}
            to="Transport"
            tripId={selectedTrip.id}
            startDate={selectedTrip.startDate}
            endDate={selectedTrip.endDate}
            icon="flight"
          />
          <NavigationButton
            navigation={props.navigation}
            to="Accommodation"
            tripId={selectedTrip.id}
            startDate={selectedTrip.startDate}
            endDate={selectedTrip.endDate}
            icon="hotel"
          />
          {/* <NavigationButton
            navigation={props.navigation}
            to="Map"
            tripId={selectedTrip.id}
            icon="map"
          /> */}
          <NavigationButton
            navigation={props.navigation}
            to="Weather"
            tripId={selectedTrip.id}
            icon="cloud"
          />
          <NavigationButton
            navigation={props.navigation}
            to="Budget"
            tripId={selectedTrip.id}
            icon="account-balance-wallet"
          />
          <NavigationButton
            navigation={props.navigation}
            to="Notes"
            tripId={selectedTrip.id}
            icon="note"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export const tripDetailsOptions = (navigation) => {
  return {
    headerTitle: navigation.route.params.destination,
  };
};

export default memo(TripDetailsContainer);
