import React from 'react';
import {
  Text,
  View,
  Alert,
  TouchableHighlight,
  FlatList,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
/**
 * IMPORTS FROM WITHIN THE MODULE
 */
import TripItem from '../../Components/MyTrips/TripItem';
import HeaderButton from '../../Components/UI/HeaderButton';
import * as tripActions from '../../Stores/Actions/Trips';
import Colors from '../../Constants/Colors';

// constants for responsive design
const {height, width} = Dimensions.get('window');

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
    <View style={styles.container}>
      {trips.length === 0 ? (
        <View style={styles.triplessContainer}>
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
        <View>
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
                <TouchableHighlight
                  style={styles.deleteButton}
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
                          text: 'OK',
                          onPress: () =>
                            dispatch(tripActions.deleteTrip(itemData.item.id)),
                        },
                      ],
                      {cancelable: true},
                    );
                  }}>
                  <Icon name="md-trash" style={styles.deleteIcon} />
                </TouchableHighlight>
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
          style={{marginLeft: 8}}
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create a trip"
          style={{marginRight: 3}}
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
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  triplessContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: Colors.text,
  },
  triplessText: {
    fontSize: 20,
  },
  deleteButton: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 15,
  },
  deleteIcon: {
    fontSize: 30,
    color: Colors.primary,
  },
});

export default TripsOverviewScreen;
