/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, View, Text, Image, Button, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
// imports from within the module
// import {Colors} from '../../Constants/Colors';

// REFACTOR to use constants
const TripDetailScreen = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((prod) => prod.id === tripId),
  );

  return (
    <ScrollView style={{backgroundColor: '#222222', flex: 1}}>
      <Image style={styles.image} source={{uri: selectedTrip.imageUrl}} />
      <Button
        title="See the trip on the map"
        onPress={() => {
          props.navigation.navigate('Map');
        }}
      />
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
    fontSize: 22,
  },
  image: {
    width: '100%',
    height: 250,
  },
});

export default TripDetailScreen;
