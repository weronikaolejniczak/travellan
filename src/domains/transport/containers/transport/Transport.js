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
/* imports from within the module */
import HeaderButton from 'components/headerButton/HeaderButton';
import Itemless from 'components/frames/itemless/Itemless';
import Loading from 'components/frames/loading/Loading';
import TransportItem from 'transport/components/item/Transport';
import * as transportActions from 'transport/state/Actions';
import {cardWidth} from 'transport/components/item/TransportStyle';
import {transportStyle as styles} from './TransportStyle';

/* transport container displays stored transport tickets */
const Transport = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const transport = selectedTrip.transportInfo;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  /* handlers */
  // add QR code
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

  // delete transport ticket
  const deleteAction = useCallback(
    async (id) => {
      setIsRefreshing(true);
      try {
        await dispatch(transportActions.deleteTransport(tripId, id));
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

  // load transport
  const loadTransport = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(transportActions.fetchTransport(tripId));
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
    return <Loading />;
  } else {
    if (transport === undefined) {
      <Itemless message={'You have no saved transport tickets!'} />;
    } else {
      let scrollX = new Animated.Value(0);
      // position will be a value between 0 and data length - 1 assuming you don't scroll pass the ends of the ScrollView
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
              // the onScroll prop will pass a nativeEvent object to a function.
              onScroll={Animated.event(
                // Animated.event returns a function that takes an array where the first element...
                [{nativeEvent: {contentOffset: {x: scrollX}}}], // is an object that maps any nativeEvent prop to a variable
                {useNativeDriver: false},
              )} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
              scrollEventThrottle={16} // this will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call
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
                  inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                  outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
                  extrapolate: 'clamp', // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
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
}

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

export default Transport;
