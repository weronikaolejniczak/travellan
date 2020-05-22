import React, { useState, useEffect} from 'react';
import {
  Text,
  View,
  Alert,
  TouchableHighlight,
  FlatList,
  Platform,
  ActivityIndicator,
  StyleSheet
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
import {tripsOverviewScreenStyle as styles} from './TripsOverviewScreenStyle';
import Colors from '../../Constants/Colors';

/**
 * Trips overview screen - displays stored trips in the form of cards
 */
const TripsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const trips = useSelector((state) => state.trips.availableTrips);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTrips = async () => {
      setIsLoading(true);
      await dispatch(tripActions.fetchTrips());
      setIsLoading(false);
    }
    loadTrips();
  }, [dispatch]);

  const selectItemHandler = (id, destination) => {
    props.navigation.navigate('Details', {
      tripId: id,
      tripDestination: destination,
    });
  };

  if (isLoading) {
    return ( <View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.primary}/>
    </View>
    );
  }

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
    /* MENU BUTTON - uncomment for next release
    headerLeft: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          style={{marginLeft: 8}}
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {}}
        />
      </HeaderButtons>
    ), */
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


export default TripsOverviewScreen;
