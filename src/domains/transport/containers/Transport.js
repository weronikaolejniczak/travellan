import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import HeaderButton from 'components/headerButton/HeaderButton';
import TransportItem from 'transport/components/item/Transport';
import * as transportActions from 'transport/state/Actions';
import {cardWidth} from 'transport/components/item/TransportStyle';
import {transportStyle as styles} from './TransportStyle';
import Colors from 'constants/Colors';

/** Transport container displays stored transport tickets */
const Transport = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const qr = props.route.params.qr;
  const pdfUri = props.route.params.pdfUri;
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

  if (isLoading || isRefreshing) {
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
        </View>
      </ScrollView>
    );
  }

  let scrollX = new Animated.Value(0);
  // Position will be a value between 0 and data length - 1 assuming you don't scroll pass the ends of the ScrollView.
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
              qr={itemData.item.qr}
              pdfUri={itemData.item.pdfUri}
            />
          )}
        />
        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          {transport.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1], // Each dot will need to have an opacity of 1 when position is equal to their index (i).
              outputRange: [0.3, 1, 0.3], // When position is not i, the opacity of the dot will animate to 0.3.
              extrapolate: 'clamp', // This will prevent the opacity of the dots from going outside of the outputRange
              // (i.e. opacity will not be less than 0.3).
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

export default Transport;
