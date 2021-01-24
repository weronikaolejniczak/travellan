import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useCallback, useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Alert, FlatList, TouchableHighlight, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as tripsActions from 'actions/tripsActions';
import {
  View as Container,
  ErrorFrame,
  FloatingActionButton,
  ItemlessFrame,
  LoadingFrame,
} from 'utils';
import { TripItem } from '../components';
import { styles } from './TripsContainerStyle';

const TripsContainer = ({ navigation }) => {
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trips.trips);

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const loadTrips = useCallback(async () => {
    try {
      await dispatch(tripsActions.fetchTripsRequest());
    } catch {
      setError('Something went wrong!');
    }
    setIsLoading(false);
  }, [dispatch]);

  const deleteTrip = useCallback(
    (id) => {
      setIsLoading(true);
      try {
        dispatch(tripsActions.deleteTripRequest(id));
      } catch {
        setError('Something went wrong!');
      }
      setIsLoading(false);
      setIsDeleting(false);
    },
    [dispatch],
  );

  const handleDeleteTrip = (item) => {
    setIsDeleting(true);
    Alert.alert(
      `Delete a trip to ${item.destination}`,
      'Are you sure?',
      [
        {
          onPress: () => setIsDeleting(false),
          style: 'cancel',
          text: 'Cancel',
        },
        {
          onPress: () => deleteTrip(item.id),
          text: 'OK',
        },
      ],
      { cancelable: true, onDismiss: () => setIsDeleting(false) },
    );
  };

  const handleSelectItem = (id, destination, cityCode) => {
    !isDeleting &&
      navigation.navigate('Details', {
        cityCode: cityCode,
        destination,
        tripId: id,
      });
  };

  const handleEdit = (item) => {
    navigation.navigate('Edit trip', {
      accommodation: item.accommodation,
      budget: item.budget,
      currentDestination: item.destination,
      currentEndDate: item.endDate,
      currentStartDate: item.startDate,
      map: item.map,
      notes: item.notes,
      transport: item.transport,
      tripId: item.id,
    });
  };

  useEffect(() => {
    loadTrips();
    SplashScreen.hide();
  }, [loadTrips]);

  if (isLoading) {
    return <LoadingFrame />;
  }

  if (error) {
    return <ErrorFrame error={error} />;
  }

  if (Array.isArray(trips) && trips.length < 1) {
    return (
      <>
        <FloatingActionButton
          loading={isLoading}
          disabled={isLoading}
          onPress={() => navigation.navigate('Add trip')}
        />
        <ItemlessFrame>You have no trips saved!</ItemlessFrame>
      </>
    );
  }

  return (
    <Container>
      <FloatingActionButton
        loading={isLoading}
        disabled={isLoading}
        onPress={() => navigation.navigate('Add trip')}
      />
      <FlatList
        data={trips}
        ListFooterComponent={() => <View />}
        keyExtractor={(item) => item.id}
        renderItem={(data) => (
          <TripItem
            {...data.item}
            startDate={data.item.startDate.split(' ').slice(1, 4).join(' ')}
            endDate={data.item.endDate.split(' ').slice(1, 4).join(' ')}
            onSelect={() => {
              handleSelectItem(
                data.item.id,
                data.item.destination,
                data.item.cityCode,
              );
            }}
          >
            <View style={styles.actionButton}>
              <TouchableHighlight
                style={styles.iconWrapper}
                onPress={() => handleDeleteTrip(data.item)}
              >
                <Icon name="delete" style={styles.actionIcon} />
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.iconWrapper}
                onPress={() => handleEdit(data.item)}
              >
                <Icon name="edit" style={styles.actionIcon} />
              </TouchableHighlight>
            </View>
          </TripItem>
        )}
      />
    </Container>
  );
};

export default TripsContainer;
