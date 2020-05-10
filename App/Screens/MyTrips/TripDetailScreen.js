import React from 'react';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
/**
 * IMPORTS FROM WITHIN THE MODULE
 */
import {tripDetailScreenStyle as styles} from './TripDetailScreenStyle';

/**
 * Trip detail screen - displays details about each trip
 * TODO:
 * refactor repeating elements into reusable components
 */
const TripDetailScreen = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image style={styles.image} source={{uri: selectedTrip.imageUrl}} />
      </View>

      <View>
        <View style={styles.dateContainer}>
          <Text style={[styles.text, styles.header, styles.date]}>
            {selectedTrip.startDate} - {selectedTrip.endDate}
          </Text>
        </View>

        <View>
          <View // 1st row of functionalities buttons
            style={styles.justifyRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.navigate('Transport', {trip: selectedTrip});
              }}>
              <Text style={styles.buttonText}>Transport</Text>
              <Icon name="md-paper-plane" size={42} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.navigate('Housing', {
                  trip: selectedTrip,
                });
              }}>
              <Text style={styles.buttonText}>Housing</Text>
              <Icon name="md-bed" size={42} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View // 2nd row of functionalities buttons
            style={styles.justifyRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.navigate('Map', {tripId: selectedTrip.id});
              }}>
              <Text style={styles.buttonText}>Map</Text>
              <Icon name="md-map" size={42} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.navigate('Daily plan');
              }}>
              <Text style={styles.buttonText}>Daily plan</Text>
              <Icon name="md-calendar" size={42} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View // 3rd row of functionalities buttons
            style={styles.justifyRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.navigate('Weather');
              }}>
              <Text style={styles.buttonText}>Weather</Text>
              <Icon name="md-cloudy" size={42} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.navigate('Budget');
              }}>
              <Text style={styles.buttonText}>Budget</Text>
              <Icon name="md-wallet" size={42} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View // 4th row of functionalities buttons
            style={styles.justifyRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.navigate('Notes');
              }}>
              <Text style={styles.buttonText}>Notes</Text>
              <Icon name="md-journal" size={42} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Events</Text>
              <Icon name="md-bonfire" size={42} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

/**
 * we export screenOptions to use in our Stack.Navigator
 * @param {*} navData: lets us use "navigation" prop from within this function
 */
export const tripDetailScreenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.tripDestination,
  };
};

export default TripDetailScreen;
