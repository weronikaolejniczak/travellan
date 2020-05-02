/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
// imports from within the module
import {Colors} from '../../Constants/Colors';

// REFACTOR to use constants
const TripDetailScreen = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((prod) => prod.id === tripId),
  );

  return (
    <ScrollView style={{backgroundColor: '#222222', flex: 1}}>
      <Image style={styles.image} source={{uri: selectedTrip.imageUrl}} />
      <View style={{margin: 20}}>
        <Text style={[styles.text, styles.header]}>
          <Text style={{fontWeight: 'bold'}}>From:</Text>{' '}
          {selectedTrip.startDate}
        </Text>
        <Text style={[styles.text, styles.header]}>
          <Text style={{fontWeight: 'bold'}}>Until:</Text>{' '}
          {selectedTrip.endDate}
        </Text>
      </View>
      <View>
        <View style={styles.justifyRow}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Transport</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Accommodation</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.justifyRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.navigate('Map');
            }}>
            <Text style={styles.buttonText}>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Daily plan</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.justifyRow}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Weather forecast</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Budget</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.justifyRow}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>X</Text>
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

const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
  },
  header: {
    fontSize: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    width: '40%',
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
