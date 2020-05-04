/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import TripItem from '../../Components/MyTrips/TripItem';
import HeaderButton from '../../Components/UI/HeaderButton';
import * as tripActions from '../../Stores/Actions/Trips';
import Colors from '../../Constants/Colors';

const TripsOverviewScreen = (props) => {
  const trips = useSelector((state) => state.trips.availableTrips);
  const dispatch = useDispatch();

  const selectItemHandler = (id, destination) => {
    props.navigation.navigate('Details', {
      tripId: id,
      tripDestination: destination,
    });
  };

  return (
    <View style={{backgroundColor: '#333333', flex: 1}}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData) => (
          <TripItem
            image={itemData.item.imageUrl}
            destination={itemData.item.destination}
            startDate={itemData.item.startDate}
            endDate={itemData.item.endDate}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.destination);
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                backgroundColor: '#FF8C00',
                padding: 15,
                alignItems: 'center',
              }}
              onPress={() => {
                Alert.alert(
                  'Delete a trip',
                  'Are you sure?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Delete',
                      onPress: () =>
                        dispatch(tripActions.deleteTrip(itemData.item.id)),
                    },
                  ],
                  {cancelable: true},
                );
              }}>
              <Text
                style={{fontWeight: 'bold', fontSize: 16, color: '#FFFFFF'}}>
                Delete
              </Text>
            </TouchableOpacity>
          </TripItem>
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
    headerLeft: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
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
