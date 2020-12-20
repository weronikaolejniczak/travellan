import React from 'react';
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {addEventToCalendar} from 'services/handleCalendarEvent';
import {NavigationButton} from '../components';
import {styles} from './TripDetailsContainerStyle.js';

const TripDetailsContainer = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const {destination, startDate, endDate, image} = selectedTrip;
  const {author, username, imageUrl} = image;
  const startDateFormatted = selectedTrip.startDate
    .split(' ')
    .slice(1, 4)
    .join(' ');
  const endDateFormatted = selectedTrip.endDate
    .split(' ')
    .slice(1, 4)
    .join(' ');
  const CalendarEventChandler = addEventToCalendar;

  return (
    <ScrollView style={styles.container}>
      <View>
        <ImageBackground style={styles.image} source={{uri: imageUrl}}>
          <LinearGradient
            colors={['rgba(0,0,0,0.00)', '#222222']}
            start={{x: 0.0, y: 0.0}}
            end={{x: 0.0, y: 1.0}}
            locations={[0.6, 1]}
            style={[{flex: 1}]}>
            <View style={styles.dateContainer}>
              <View style={{justifyContent: 'space-around'}}>
                <Text style={[styles.text, {textAlign: 'center'}]}>
                  Photo by {author} @Unsplash/{username}
                </Text>
              </View>
              <Text style={[styles.text, styles.header, styles.date]}>
                {startDate === endDate ? (
                  <Text style={[styles.text, styles.date]}>
                    {startDateFormatted}
                  </Text>
                ) : (
                  <Text style={[styles.text, styles.date]}>
                    {startDateFormatted} - {endDateFormatted}
                  </Text>
                )}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      <View>
        <View style={styles.tiles}>
          <NavigationButton
            navigation={props.navigation}
            to="Transport"
            tripId={selectedTrip.id}
            icon="flight"
          />
          <NavigationButton
            navigation={props.navigation}
            to="Accommodation"
            tripId={selectedTrip.id}
            icon="hotel"
          />
          <NavigationButton
            navigation={props.navigation}
            to="Map"
            tripId={selectedTrip.id}
            icon="map"
          />
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
          <TouchableOpacity
            onPress={() => {
              CalendarEventChandler.addToCalendar(
                'Trip to ' + destination,
                Date.parse(startDate),
                Date.parse(endDate),
                destination,
                'Remember to pack everything and check weather forecast!',
              );
            }}>
            <Text style={[styles.action, styles.callToAction]}>
              Add your trip to your Google Calendar!
            </Text>
          </TouchableOpacity>
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

export default TripDetailsContainer;
