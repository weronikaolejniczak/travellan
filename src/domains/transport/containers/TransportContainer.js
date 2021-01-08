import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  FlatList,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import * as transportActions from 'actions/transportActions';
import { HeaderButton, ItemlessFrame, LoadingFrame } from 'utils';
import { TransportItem } from '../components';
import { cardWidth } from '../components/TransportItem/TransportItemStyle';
import { styles } from './TransportContainerStyle';

const TransportContainer = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const transport = useSelector(
    (state) => state.trips.trips.find((item) => item.id === tripId).transport,
  );

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const addQR = useCallback(
    async (id) => {
      setIsRefreshing(true);
      try {
        props.navigation.navigate('Add QR', {
          tripId: tripId,
          ticketId: id,
        });
      } catch {
        setError('Something went wrong!');
      }
      setIsRefreshing(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tripId],
  );

  const persistDelete = useCallback(
    (id) => {
      setIsRefreshing(true);
      try {
        dispatch(transportActions.deleteTransportRequest(tripId, id));
      } catch {
        setError('Something went wrong!');
      }
      setIsRefreshing(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tripId],
  );

  const handleDelete = useCallback((noteId) => {
    setIsRefreshing(true);
    Alert.alert(
      'Delete note',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => persistDelete(noteId),
        },
      ],
      { cancelable: true },
    );
    setIsRefreshing(false);
  }, []);

  const loadTransport = useCallback(() => {
    setError(null);
    setIsLoading(true);
    try {
      dispatch(transportActions.fetchTransportRequest(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  useEffect(() => {
    loadTransport();
  }, [loadTransport]);

  if (!Array.isArray(transport) || isLoading || isRefreshing) {
    return <LoadingFrame />;
  }

  if (error) {
    return (
      <View>
        <Text>Something went wrong!</Text>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (Array.isArray(transport) && transport.length < 1) {
    return <ItemlessFrame message="You have no transport saved!" />;
  }

  let scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, cardWidth);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      <View>
        <FlatList
          onRefresh={loadTransport}
          refreshing={isRefreshing}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
          decelerationRate={0}
          snapToInterval={cardWidth + 20}
          snapToAlignment="center"
          contentInset={styles.contentInsetIOS}
          data={transport}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(data) => (
            <TransportItem
              tripId={tripId}
              destination={selectedTrip.destination}
              id={data.item.id}
              isTicketTo={data.item.isTicketTo}
              isTicketFrom={data.item.isTicketFrom}
              dateOfDeparture={data.item.dateOfDeparture}
              placeOfDeparture={data.item.placeOfDeparture}
              QR={data.item.QR}
              PDF={data.item.PDF}
              handleDeleteTransport={() => handleDelete(data.item.id)}
              handleAddQR={() => addQR(data.item.id)}
            />
          )}
        />
        <View style={styles.justifyRow}>
          {transport.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return <Animated.View key={i} style={{ opacity, ...styles.dot }} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export const transportOptions = (navData) => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create a trip"
          iconName="plus"
          onPress={() => {
            navData.navigation.navigate('Add transport', {
              tripId: navData.route.params.tripId,
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default TransportContainer;
