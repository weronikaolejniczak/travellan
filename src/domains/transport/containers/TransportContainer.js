import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, ScrollView, FlatList, Animated, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from 'components/headerButton/HeaderButton';
import {ItemlessFrame, LoadingFrame} from 'components/frames';
import {TransportItem} from '../components';
import * as transportActions from 'actions/transportActions';
import {cardWidth} from '../components/TransportItem/TransportItemStyle';
import {styles} from './TransportContainerStyle';

const TransportContainer = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const transport = selectedTrip.transport;

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

  const deleteTransport = useCallback(
    async (id) => {
      setIsRefreshing(true);
      try {
        await dispatch(transportActions.deleteTransportRequest(tripId, id));
      } catch {
        setError('Something went wrong!');
      }
      setIsRefreshing(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tripId],
  );

  const handleDeleteTransport = useCallback(
    (ticketId) => {
      setIsRefreshing(true);
      Alert.alert(
        'Delete ticket',
        'Are you sure?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => deleteTransport(ticketId),
          },
        ],
        {cancelable: true},
      );
      setIsRefreshing(false);
    },
    [deleteTransport],
  );

  const loadTransport = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(transportActions.fetchTransportRequest(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transport, tripId]);

  useEffect(() => {
    loadTransport();
  }, [loadTransport]);

  if (error) {
    return (
      <View>
        <Text>Something went wrong!</Text>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (isLoading || isRefreshing) {
    return <LoadingFrame />;
  }

  if (
    !Array.isArray(transport) ||
    (Array.isArray(transport) && transport.length < 1)
  ) {
    return <ItemlessFrame message="You have no saved transport tickets!" />;
  }

  let scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, cardWidth);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}>
      <View>
        <FlatList
          onRefresh={loadTransport}
          refreshing={isRefreshing}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
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
              handleDeleteTransport={() => handleDeleteTransport(data.item.id)}
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

            return <Animated.View key={i} style={{opacity, ...styles.dot}} />;
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
