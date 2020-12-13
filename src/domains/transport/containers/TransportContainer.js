import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Platform,
  Animated,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from 'components/headerButton/HeaderButton';
import {ItemlessFrame, LoadingFrame} from 'components/frames';
import {TransportItem} from 'domains/transport/components';
import * as transportActions from 'actions/transportActions';
import {cardWidth} from 'transport/components/TransportItem/TransportItemStyle';
import {styles} from './TransportContainerStyle';

const TransportContainer = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const transport = selectedTrip.transportInfo;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    [props.navigation, tripId],
  );

  const deleteAction = useCallback(
    async (id) => {
      setIsRefreshing(true);
      try {
        await dispatch(transportActions.deleteTransportRequest(tripId, id));
      } catch {
        setError('Something went wrong!');
      }
      setIsRefreshing(false);
    },
    [dispatch, tripId],
  );

  const deleteTransport = useCallback(
    async (ticketId) => {
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
            onPress: () => deleteAction(ticketId),
          },
        ],
        {cancelable: true},
      );
      setIsRefreshing(false);
    },
    [deleteAction],
  );

  const loadTransport = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(transportActions.fetchTransportRequest(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, tripId]);

  useEffect(() => {
    setIsLoading(true);
    loadTransport().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadTransport]);

  if (isLoading || isRefreshing) {
    return <LoadingFrame />;
  } else {
    if (transport === undefined) {
      return <ItemlessFrame message={'You have no saved transport tickets!'} />;
    } else {
      let scrollX = new Animated.Value(0);
      let position = Animated.divide(scrollX, cardWidth);

      return (
        <ScrollView
          style={styles.scrollview}
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
              renderItem={(itemData) => (
                <TransportItem
                  tripId={tripId}
                  destination={selectedTrip.destination}
                  id={itemData.item.id}
                  to={itemData.item.to}
                  from={itemData.item.from}
                  dateOfDeparture={itemData.item.dateOfDeparture}
                  placeOfDeparture={itemData.item.placeOfDeparture}
                  QR={itemData.item.QR}
                  PDF={itemData.item.PDF}
                  deleteTransportHandler={() =>
                    deleteTransport(itemData.item.id)
                  }
                  addQRHandler={() => addQR(itemData.item.id)}
                />
              )}
            />
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              {transport.map((_, i) => {
                let opacity = position.interpolate({
                  inputRange: [i - 1, i, i + 1],
                  outputRange: [0.3, 1, 0.3],
                  extrapolate: 'clamp',
                });

                return (
                  <Animated.View key={i} style={{opacity, ...styles.dot}} />
                );
              })}
            </View>
          </View>
        </ScrollView>
      );
    }
  }
};

export const transportOptions = (navData) => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create a trip"
          style={{marginRight: 3}}
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
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
