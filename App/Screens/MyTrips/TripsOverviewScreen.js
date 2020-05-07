/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  FlatList,
  Platform,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
// imports from within the module
import TripItem from '../../Components/MyTrips/TripItem';
import HeaderButton from '../../Components/UI/HeaderButton';
import * as tripActions from '../../Stores/Actions/Trips';
// import Colors from '../../Constants/Colors';

/**
 * REFACTOR
 * Clicking on delete button displays an alert.
 * Preferable way but doesn't work because clicking on the button also triggers parent's onSelect function:
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
                }
 */

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
      {trips.length === 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={[styles.text, styles.triplessText]}>
            There are no trips!
          </Text>
          <Text style={[styles.text, styles.triplessText]}>
            Create one with the
          </Text>
          <Icon name="md-add" size={32} style={[styles.text, {margin: 10}]} />
          <Text style={[styles.text, styles.triplessText]}>sign above!</Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
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
                  selectItemHandler(
                    itemData.item.id,
                    itemData.item.destination,
                  );
                }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 50,
                    padding: 10,
                    paddingHorizontal: 15,
                    backgroundColor: '#FF8C00',
                  }}
                  onPress={() => {
                    dispatch(tripActions.deleteTrip(itemData.item.id));
                  }}>
                  <Icon name="md-trash" size={30} color="#FFFFFF" />
                </TouchableOpacity>
              </TripItem>
            )}
          />
        </View>
      )}
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

const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
  },
  triplessText: {
    fontSize: 20,
  },
});

export default TripsOverviewScreen;
