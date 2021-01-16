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
import { QRModal, TransportItem } from '../components';
import { cardWidth } from '../components/TransportItem/TransportItemStyle';
import { styles } from './TransportContainerStyle';

const TransportContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const tripId = route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const transport = useSelector(
    (state) => state.trips.trips.find((item) => item.id === tripId).transport,
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedTransportId, setSelectedTransportId] = useState(' ');

  const handlePressQR = useCallback(
    (QR, id) => {
      console.log(QR);
      if (QR === undefined || QR === ' ' || QR === null) {
        console.log('I am undefined');
        addQR(id);
      } else {
        openQRModal(id);
      }
    },
    [addQR, openQRModal],
  );

  const openQRModal = useCallback(
    (id) => {
      setSelectedTransportId(id);
      setIsQRModalOpen(true);
      console.log('I have a value');
      console.log(id);
      console.log(isQRModalOpen);
    },
    [isQRModalOpen],
  );

  const findTransportQR = (id) => {
    if (id === ' ') {
      return transport[0].QR;
    } else {
      const index = transport.findIndex((item) => item.id === id);
      return transport[index].QR;
    }
  };

  const addQR = useCallback(
    async (id) => {
      setIsRefreshing(true);
      try {
        navigation.navigate('Add QR', {
          ticketId: id,
          tripId: tripId,
        });
      } catch {
        setError('Something went wrong!');
      }
      setIsRefreshing(false);
    },
    [navigation, tripId],
  );

  const handleQRDelete = useCallback(
    (items) => {
      setIsRefreshing(true);
      Alert.alert(
        'Delete QR code',
        'Are you sure?',
        [
          {
            style: 'cancel',
            text: 'Cancel',
          },
          {
            onPress: persistDeleteQR(items),
            text: 'OK',
          },
        ],
        { cancelable: true },
      );
      setIsRefreshing(false);
    },
    [persistDeleteQR],
  );

  const persistDeleteQR = useCallback(
    (id) => {
      setIsRefreshing(true);
      try {
        dispatch(transportActions.deleteQRRequest(tripId, id));
      } catch {
        setError('Something went wrong!');
      }
      setIsRefreshing(false);
      setIsQRModalOpen(false);
    },
    [dispatch, tripId],
  );

  const handleDelete = useCallback(
    (noteId) => {
      setIsRefreshing(true);
      Alert.alert(
        'Delete saved ticket',
        'Are you sure?',
        [
          {
            style: 'cancel',
            text: 'Cancel',
          },
          {
            onPress: () => persistDelete(noteId),
            text: 'OK',
          },
        ],
        { cancelable: true },
      );
      setIsRefreshing(false);
    },
    [persistDelete],
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
    [dispatch, tripId],
  );

  const loadTransport = useCallback(() => {
    setError(null);
    setIsLoading(true);
    try {
      dispatch(transportActions.fetchTransportRequest(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, tripId]);

  useEffect(() => {
    setIsLoading(true);
    loadTransport();
    setIsLoading(false);
  }, [loadTransport, isLoading]);

  if (!Array.isArray(transport) || isLoading || isRefreshing) {
    return <LoadingFrame />;
  }

  if (Array.isArray(transport) && transport.length < 1) {
    return <ItemlessFrame message="You have no transport saved!" />;
  }

  if (isQRModalOpen === true) {
    return (
      <QRModal
        QR={findTransportQR(selectedTransportId)}
        handleDeleteQR={() => handleQRDelete(selectedTransportId)}
        handleCloseQR={() => setIsQRModalOpen(false)}
        isQRModalOpen={isQRModalOpen}
        handleQRDelete={() => handleQRDelete(selectedTransportId)}
        handleError={() => setError(error)}
      />
    );
  }

  if (error) {
    return (
      <View>
        <Text>Something went wrong!</Text>
        <Text>Error: {error}</Text>
      </View>
    );
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
              handlePressQR={() => handlePressQR(data.item.QR, data.item.id)}
            />
          )}
        />
        <View style={styles.justifyRow}>
          {transport.map((_, i) => {
            let opacity = position.interpolate({
              extrapolate: 'clamp',
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
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
