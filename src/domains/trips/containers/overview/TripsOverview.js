import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  Alert,
  TouchableHighlight,
  FlatList,
  Platform,
  Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';
import Itemless from 'components/frames/itemless/Itemless';
import Loading from 'components/frames/loading/Loading';
import TripItem from 'trips/components/item/Trip';
import HeaderButton from 'components/headerButton/HeaderButton';
import * as tripActions from 'state/trip/tripActions';
import { tripsOverviewStyle as styles } from './TripsOverviewStyle';
import Colors from 'constants/Colors';

const TripsOverview = (props) => {
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trips.availableTrips);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const loadTrips = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(tripActions.fetchTrips());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadTrips();
    SplashScreen.hide();
  }, [dispatch, loadTrips]);

  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener(
      'willFocus',
      loadTrips,
    );
    // clean up listener
    return () => {
      willFocusSubscription.remove();
    };
  }, []); // do not add props.navigation as a dependency, it may cause a loop

  const selectItemHandler = (id, destination) => {
    props.navigation.navigate('Details', {
      tripId: id,
      tripDestination: destination,
    });
  };

  const mover = () => {
    props.navigation.navigate('Startup');
  };

  /* KNOWN ISSUE: user can click on the card and immediately after on the trip,
  which navigates him to trip details and still shows an alert to delete the trip;
  afterwards application crashes */
  const deleteItemHandler = (item) => {
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
          onPress: () => {
            setIsLoading(true);
            dispatch(tripActions.deleteTrip(item.id));
            dispatch(tripActions.fetchTrips()).then(() => setIsLoading(false));
          },
        },
      ],
      { cancelable: true },
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: Colors.background }]}>
        <Text style={styles.text}>{error}</Text>
        <Button title="Try again" onPress={loadTrips} color={Colors.primary} />
      </View>
    );
  }

  if (trips.length === 0 || trips === undefined) {
    return <Itemless message={'You have no trips saved!'} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <TripItem
            image={itemData.item.image}
            destination={itemData.item.destination}
            startDate={itemData.item.startDate.split(' ').slice(1, 4).join(' ')}
            endDate={itemData.item.endDate.split(' ').slice(1, 4).join(' ')}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.destination);
            }}
          >
            <TouchableHighlight
              style={styles.deleteButton}
              onPress={() => deleteItemHandler(itemData.item)}
            >
              <Icon name="delete" style={styles.deleteIcon} />
            </TouchableHighlight>
          </TripItem>
        )}
      />
    </View>
  );
};

/** we export screenOptions to use in our Stack.Navigator
 * @param {*} navData: lets us use "navigation" prop from within this function */
export const tripsOverviewOptions = (navData) => {
  return {
    headerLeft: null,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="New trip"
          style={{ marginRight: 3 }}
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('New trip');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default TripsOverview;
