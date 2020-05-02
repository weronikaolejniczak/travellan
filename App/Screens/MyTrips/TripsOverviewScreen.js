/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, Alert, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import TripItem from '../../Components/MyTrips/TripItem';
import HeaderButton from '../../Components/UI/HeaderButton';

const deleteTrip = () => {}; // TODO

const TripsOverviewScreen = (props) => {
  const trips = useSelector((state) => state.trips.availableTrips);
  return (
    <View style={{backgroundColor: '#333333', flex: 1}}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <TripItem
            image={itemData.item.imageUrl}
            destination={itemData.item.destination}
            startDate={itemData.item.startDate}
            endDate={itemData.item.endDate}
            onViewDetail={() => {
              props.navigation.navigate('Details', {
                tripId: itemData.item.id,
                tripDestination: itemData.item.destination,
              });
            }}
            deleteTrip={() => {
              /* Alert.alert('Delete trip', 'Are you sure?', [
                {
                  text: 'Cancel',
                  onPress: () => {},
                },
                {
                  text: 'Ok',
                  onPress: deleteTrip(),
                },
              ]); */
            }}
          />
        )}
      />
    </View>
  );
};

/**
 * we export screenOptions to use in our Stack.Navigator
 * @param {*} navData: lets us use "navigation" prop from within this function
 */

export const tripsScreenOptions = (navData) => {
  return {
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create a trip"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('Create a trip');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default TripsOverviewScreen;
