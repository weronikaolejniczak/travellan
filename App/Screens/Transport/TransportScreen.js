import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import HeaderButton from '../../Components/UI/HeaderButton';
import TransportItem from '../../Components/Transport/TransportItem';
import * as transportActions from '../../Stores/Actions/Transport';
import {cardWidth} from '../../Components/Transport/TransportItemStyle';
import {transportScreenStyle as styles} from './TransportScreenStyle';
import Colors from '../../Constants/Colors';

/** TRANSPORT SCREEN - displays stored transport tickets
 * TODO:
 * refactor inline styles
 * refactor values to be responsive
 * refactor repeated itemless screen
 */
const TransportScreen = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const transport = selectedTrip.transportInfo;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadTransport = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(transportActions.fetchTransport(tripId));
    } catch (err) {
      console.log(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, tripId]);

  useEffect(() => {
    setIsLoading(true);
    loadTransport().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadTransport]);

  if (isLoading) {
    return (
      <View style={[styles.centered, {backgroundColor: Colors.background}]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && transport === undefined) {
    return (
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.contentContainer}>
        <View style={[styles.itemlessContainer, styles.columnAndRowCenter]}>
          <Text style={[styles.text, styles.itemlessText]}>
            There are no tickets!
          </Text>
          <Text style={[styles.text, styles.itemlessText]}>
            Add one with the
          </Text>
          <Icon name="md-add" size={32} style={[styles.text, styles.icon]} />
          <Text style={[styles.text, styles.itemlessText]}>sign above!</Text>
          <View style={{marginTop: '10%'}}>
            <TouchableOpacity style={styles.button} onPress={loadTransport}>
              <Text style={styles.buttonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  let scrollX = new Animated.Value(0);
  // position will be a value between 0 and photos.length - 1 assuming you don't scroll pass the ends of the ScrollView
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
          // the onScroll prop will pass a nativeEvent object to a function
          onScroll={Animated.event(
            // Animated.event returns a function that takes an array where the first element...
            [{nativeEvent: {contentOffset: {x: scrollX}}}], // ... is an object that maps any nativeEvent prop to a variable
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
              stages={itemData.item.stages}
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

            return <Animated.View key={i} style={{opacity, ...styles.dot}} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export const transportScreenOptions = (navData) => {
  return {
    headerRight: (props) => (
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

export default TransportScreen;
