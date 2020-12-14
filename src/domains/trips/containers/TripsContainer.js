import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  Alert,
  TouchableHighlight,
  FlatList,
<<<<<<< HEAD:src/domains/trips/containers/TripsContainer.js
  Platform,
=======
  Button,
>>>>>>> 8084622 ((344) Change icons to MaterialCommunityIcons):src/domains/trips/containers/overview/TripsOverview.js
} from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/MaterialIcons';
<<<<<<< HEAD:src/domains/trips/containers/TripsContainer.js
import SplashScreen from 'react-native-splash-screen';

import {ItemlessFrame, LoadingFrame} from 'components/frames';
import {TripItem} from 'domains/trips/components';
import HeaderButton from 'components/headerButton/HeaderButton';
import * as tripsActions from 'actions/tripsActions';
import {styles} from './TripsContainerStyle';
=======
import SplashScreen from 'react-native-splash-screen'

import Itemless from 'components/frames/itemless/Itemless';
import Loading from 'components/frames/loading/Loading';
import TripItem from 'trips/components/item/Trip';
import HeaderButton from 'components/headerButton/HeaderButton';
import * as tripActions from 'state/trip/tripActions';
import { tripsOverviewStyle as styles } from './TripsOverviewStyle';
>>>>>>> 8084622 ((344) Change icons to MaterialCommunityIcons):src/domains/trips/containers/overview/TripsOverview.js
import Colors from 'constants/Colors';

const TripsContainer = (props) => {
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trips.trips);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const loadTrips = useCallback(() => {
    tripsActions.fetchTripsRequest();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadTrips();
<<<<<<< HEAD:src/domains/trips/containers/TripsContainer.js
    SplashScreen.hide();
  }, [loadTrips]);

  const handleSelectItem = (id, destination) => {
=======
    SplashScreen.hide()
  }, [dispatch, loadTrips]);

  const selectItemHandler = (id, destination) => {
>>>>>>> 8084622 ((344) Change icons to MaterialCommunityIcons):src/domains/trips/containers/overview/TripsOverview.js
    props.navigation.navigate('Details', {
      tripId: id,
      tripDestination: destination,
    });
  };

  const deleteItem = (id) => {
    setIsLoading(true);
    dispatch(tripsActions.deleteTripRequest(id));
    setIsLoading(false);
  };

  /* KNOWN ISSUE: user can click on the card and immediately after on the trip,
  which navigates him to trip details and still shows an alert to delete the trip;
  afterwards application crashes */
  const handleDeleteItem = (item) => {
    Alert.alert(
      `Delete a trip to ${item.destination}`,
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteItem(item.id),
        },
      ],
      {cancelable: true},
    );
  };

  if (isLoading) {
    return <LoadingFrame />;
  }

  if (error) {
    return (
      <View style={[styles.centered, {backgroundColor: Colors.background}]}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }

<<<<<<< HEAD:src/domains/trips/containers/TripsContainer.js
  if (Array.isArray(trips) && trips.length < 1) {
    return <ItemlessFrame message={'You have no trips saved!'} />;
=======
  if (trips.length === 0 || trips === undefined) {
    return <Itemless message="You have no trips saved!" />;
>>>>>>> 8084622 ((344) Change icons to MaterialCommunityIcons):src/domains/trips/containers/overview/TripsOverview.js
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={(data) => (
          <TripItem
            image={data.item.image}
            destination={data.item.destination}
            startDate={data.item.startDate.split(' ').slice(1, 4).join(' ')}
            endDate={data.item.endDate.split(' ').slice(1, 4).join(' ')}
            onSelect={() => {
              handleSelectItem(data.item.id, data.item.destination);
            }}>
            <TouchableHighlight
              style={styles.deleteButton}
              onPress={() => handleDeleteItem(data.item)}>
              <Icon name="delete" style={styles.deleteIcon} />
            </TouchableHighlight>
          </TripItem>
        )}
      />
    </View>
  );
};

<<<<<<< HEAD:src/domains/trips/containers/TripsContainer.js
/** we export screenOptions to use in our Stack.Navigator
 * @param {*} navData: lets us use "navigation" prop from within this function */
export const tripsOptions = (navData) => {
=======
export const tripsOverviewOptions = (navData) => {
>>>>>>> 8084622 ((344) Change icons to MaterialCommunityIcons):src/domains/trips/containers/overview/TripsOverview.js
  return {
    headerLeft: null,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add trip"
          style={{marginRight: 3}}
<<<<<<< HEAD:src/domains/trips/containers/TripsContainer.js
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('Add trip');
          }}
=======
          iconName="plus"
          onPress={() => navData.navigation.navigate('New trip')}
>>>>>>> 8084622 ((344) Change icons to MaterialCommunityIcons):src/domains/trips/containers/overview/TripsOverview.js
        />
      </HeaderButtons>
    ),
  };
};

export default TripsContainer;
