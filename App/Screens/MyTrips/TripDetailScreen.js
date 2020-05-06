/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

// imports from within the module
// import {Colors} from '../../Constants/Colors';

const {height, width} = Dimensions.get('window');

// REFACTOR to use constants
const TripDetailScreen = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );

  return (
    <ScrollView style={{backgroundColor: '#222222', flex: 1}}>
      <Image style={styles.image} source={{uri: selectedTrip.imageUrl}} />
      <View>
        <View
          style={[
            {margin: 20, height: height * 0.08, justifyContent: 'center'},
          ]}>
          <Text
            style={[
              styles.text,
              styles.header,
              {fontWeight: 'bold', textAlign: 'center'},
            ]}>
            {selectedTrip.startDate} - {selectedTrip.endDate}
          </Text>
        </View>
        <View style={styles.justifyRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.navigate('Transport');
            }}>
            <Text style={styles.buttonText}>Transport</Text>
            <Icon name="md-airplane" size={42} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.navigate('Accommodation');
            }}>
            <Text style={styles.buttonText}>Accommodation</Text>
            <Icon name="md-bed" size={42} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.justifyRow}>
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
        <View style={styles.justifyRow}>
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
        <View style={styles.justifyRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.navigate('Notes');
            }}>
            <Text style={styles.buttonText}>Notes</Text>
            <Icon name="md-folder" size={42} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Events</Text>
            <Icon name="md-bonfire" size={42} color="#FFFFFF" />
          </TouchableOpacity>
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

// REFACTOR!
const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
  },
  header: {
    fontSize: 24,
  },
  image: {
    width: '100%',
    height: height * 0.3,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: height * 0.19,
    padding: 15,
    margin: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  justifyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default TripDetailScreen;
