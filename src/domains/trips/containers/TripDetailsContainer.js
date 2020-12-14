import React from 'react';
import {View, ScrollView, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {addEventToCalendar} from 'services/handleCalendarEvent';
import NavigationButton from '../components/navigationButton/NavigationButton';
import {styles} from './TripDetailsContainerStyle.js';

const TripDetailsContainer = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  let CalendarEventChandler = addEventToCalendar;
  const author = selectedTrip.image.authorName;
  const username = selectedTrip.image.username;
  const imageUrl = selectedTrip.image.imageUrl;
  const destination = selectedTrip.destination;
  let startDateOrigin= selectedTrip.startDate;
  let endDateOrigin= selectedTrip.endDate;
  const startDate = selectedTrip.startDate.split(' ').slice(1, 4).join(' ');
  const endDate = selectedTrip.endDate.split(' ').slice(1, 4).join(' ');

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
                  <Text style={[styles.text, styles.date]}>{startDate}</Text>
                ) : (
                  <Text style={[styles.text, styles.date]}>
                    {startDate} - {endDate}
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
                Date.parse(startDateOrigin),
                Date.parse(endDateOrigin),
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
    headerTitle: navigation.route.params.tripDestination,
  };
};

export default TripDetailsContainer;
