import React, {useState, useEffect, useCallback} from 'react';
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
import Itemless from 'components/frames/itemless/Itemless';
import Loading from 'components/frames/loading/Loading';
import AccommodationItem from 'accommodation/components/item/Accommodation';
import HeaderButton from 'components/headerButton/HeaderButton';
import * as accommodationActions from 'accommodation/state/Actions';
import {cardWidth} from 'accommodation/components/item/AccommodationStyle';
import {accommodationStyle as styles} from './AccommodationStyle';

/* accommodation presentational component - displays saved accommodation */
const Accommodation = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const accommodation = selectedTrip.accommodation;

  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* handlers */
  const deleteAction = useCallback(
    async (id) => {
      setIsRefreshing(true);
      await dispatch(accommodationActions.deleteAccommodation(tripId, id));
      setIsRefreshing(false);
    },
    [dispatch, tripId],
  );

  const deleteAccommodationHandler = useCallback(
    async (id) => {
      setIsRefreshing(true);
      Alert.alert(
        'Delete accommodation',
        'Are you sure?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => await deleteAction(id),
          },
        ],
        {cancelable: true},
      );
      setIsRefreshing(false);
    },
    [deleteAction],
  );

  /* handlers */
  useEffect(() => {
    const loadTrips = async () => {
      setIsLoading(true);
      try {
        await dispatch(accommodationActions.fetchAccommodation(tripId));
      } catch {
        setError('Something went wrong!');
      }
      setIsLoading(false);
    };
    loadTrips();
  }, [dispatch, tripId]);

  if (isLoading || isRefreshing) {
    return <Loading />;
  } else {
    if (accommodation === undefined) {
      console.log('itemless');
      return <Itemless message={'You have no saved accommodation!'} />;
    } else {
      console.log('itemful');
      let scrollX = new Animated.Value(0);
      // position will be a value between 0 and data length - 1 assuming you don't scroll pass the ends of the ScrollView
      let position = Animated.divide(scrollX, cardWidth);
      return (
        <ScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.contentContainer}>
          <View>
            <FlatList
              //onRefresh={loadAccommodation}
              //refreshing={isRefreshing}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              // the onScroll prop will pass a nativeEvent object to a function
              onScroll={Animated.event(
                // Animated.event returns a function that takes an array where the first element...
                [{nativeEvent: {contentOffset: {x: scrollX}}}], // is an object that maps any nativeEvent prop to a variable
                {useNativeDriver: false},
              )} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
              scrollEventThrottle={16} // This will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call
              decelerationRate={0}
              snapToInterval={cardWidth + 20}
              snapToAlignment="center"
              contentInset={styles.contentInsetIOS}
              data={accommodation}
              keyExtractor={(item) => item.id.toString()}
              renderItem={(itemData) => (
                <AccommodationItem
                  id={itemData.item.id}
                  tripId={tripId}
                  image={itemData.item.imageUrl}
                  name={itemData.item.name}
                  address={itemData.item.address}
                  facilities={itemData.item.facilities}
                  hotelHours={itemData.item.hotelHours}
                  description={itemData.item.description}
                  reservationDetails={itemData.item.reservationDetails}
                  deleteAccommodationHandler={() =>
                    deleteAccommodationHandler(itemData.item.id)
                  }
                />
              )}
            />
            <View style={styles.rowDirection}>
              {accommodation.map((_, i) => {
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
};

export const accommodationOptions = (navData) => {
  return {
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create a trip"
          style={{marginRight: 3}}
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('Add accommodation', {
              tripId: navData.route.params.tripId,
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default Accommodation;
