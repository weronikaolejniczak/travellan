import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Alert,
  TouchableHighlight,
  FlatList,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import TripItem from 'myTrips/components/item/Trip';
import HeaderButton from 'components/headerButton/HeaderButton';
import * as tripActions from 'myTrips/state/Actions';
import {tripsOverviewStyle as styles} from './TripsOverviewStyle';
import Colors from 'constants/Colors';

/** Trips overview container displays stored trips in the form of cards */
const TripsOverview = (props) => {
  const dispatch = useDispatch();

  const trips = useSelector((state) => state.trips.availableTrips);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTrips = async () => {
      setIsLoading(true);
      await dispatch(tripActions.fetchTrips());
      setIsLoading(false);
    };
    loadTrips();
  }, [dispatch]);

  const selectItemHandler = (id, destination) => {
    props.navigation.navigate('Details', {
      tripId: id,
      tripDestination: destination,
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.centered, {backgroundColor: Colors.background}]}>
        <ActivityIndicator size="large" color={Colors.primary} />
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
          <Icon
            name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            size={32}
            style={[styles.text, {margin: 10}]}
          />
          <Text style={[styles.text, styles.triplessText]}>sign above!</Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={trips}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(itemData) => (
              <TripItem
                image={itemData.item.image}
                destination={itemData.item.destination}
                startDate={itemData.item.startDate
                  .split(' ')
                  .slice(1, 4)
                  .join(' ')}
                endDate={itemData.item.endDate.split(' ').slice(1, 4).join(' ')}
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
                      `Delete a trip to ${itemData.item.destination}`,
                      'Are you sure?',
                      [
                        {
                          text: 'Cancel',
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
                  <Icon
                    name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    style={styles.deleteIcon}
                  />
                </TouchableHighlight>
              </TripItem>
            )}
          />
        </View>
      )}
    </View>
  );
};

/** we export screenOptions to use in our Stack.Navigator
 * @param {*} navData: lets us use "navigation" prop from within this function */
export const tripsScreenOptions = (navData) => {
  return {
    /* MENU BUTTON
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
    headerLeft: null,
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

export default TripsOverview;
