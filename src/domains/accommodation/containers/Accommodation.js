import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Platform,
  ActivityIndicator,
  Animated,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import HeaderButton from 'components/headerButton/HeaderButton';
import AccommodationItem from 'accommodation/components/item/Accommodation';
import * as accommodationActions from 'accommodation/state/Actions';
import {cardWidth} from 'accommodation/components/item/AccommodationStyle'; // REFACTOR
import {accommodationStyle as styles} from './AccommodationStyle'; //REFACTOR
import Colors from 'constants/Colors'; // REFACTOR

/** ACCOMMODATION SCREEN - displays stored reservations */
const Accommodation = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const accommodation = selectedTrip.accommodationInfo;

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /** HANDLERS */
  const deleteAction = useCallback(
    async (id) => {
      setIsRefreshing(true);
      await dispatch(accommodationActions.deleteReservation(tripId, id));
      setIsRefreshing(false);
    },
    [dispatch, tripId],
  );

  const deleteReservationHandler = useCallback(
    async (reservationId) => {
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
            onPress: () => deleteAction(reservationId),
          },
        ],
        {cancelable: true},
      );
      setIsRefreshing(false);
    },
    [deleteAction],
  );

  const loadReservations = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(accommodationActions.fetchReservations(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, tripId]);

  useEffect(() => {
    setIsLoading(true);
    loadReservations().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadReservations]);

  if (isLoading || isRefreshing) {
    return (
      <View style={[styles.centered, {backgroundColor: Colors.background}]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (accommodation === undefined) {
    return (
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.contentContainer}>
        <View style={[styles.itemlessContainer, styles.columnAndRowCenter]}>
          <Text style={[styles.text, styles.itemlessText]}>
            There are no reservations!
          </Text>
          <Text style={[styles.text, styles.itemlessText]}>
            Add one with the
          </Text>
          <Icon name="md-add" size={32} style={[styles.text, styles.icon]} />
          <Text style={[styles.text, styles.itemlessText]}>sign above!</Text>
        </View>
      </ScrollView>
    );
  }

  /** ANIMATE VARIABLES */
  let scrollX = new Animated.Value(0);
  // Position will be a value between 0 and data length - 1 assuming you don't scroll pass the ends of the ScrollView.
  let position = Animated.divide(scrollX, cardWidth);

  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={styles.contentContainer}>
      <View>
        <FlatList
          //onRefresh={loadReservations}
          //refreshing={isRefreshing}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          // The onScroll prop will pass a nativeEvent object to a function.
          onScroll={Animated.event(
            // Animated.event returns a function that takes an array where the first element...
            [{nativeEvent: {contentOffset: {x: scrollX}}}], // is an object that maps any nativeEvent prop to a variable.
            {useNativeDriver: false},
          )} // In this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX.
          scrollEventThrottle={16} // This will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call.
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
              deleteReservationHandler={() =>
                deleteReservationHandler(itemData.item.id)
              }
            />
          )}
        />
        <View style={styles.rowDirection}>
          {accommodation.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1], // Each dot will need to have an opacity of 1 when position is equal to their index (i).
              outputRange: [0.3, 1, 0.3], // When position is not i, the opacity of the dot will animate to 0.3.
              extrapolate: 'clamp', // This will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3).
            });

            return <Animated.View key={i} style={{opacity, ...styles.dot}} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
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
