import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Platform,
  ActivityIndicator,
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
  const [isLoading, setIsLoading] = useState(false);

  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );

  const transportInfo = selectedTrip.transportInfo;

  useEffect(() => {
    const loadTransport = async () => {
      setIsLoading(true);
      await dispatch(transportActions.fetchTransport(tripId));
      setIsLoading(false);
    };
    loadTransport();
  }, [dispatch, tripId]);

  if (isLoading) {
    return (
      <View style={[styles.centered, {backgroundColor: Colors.background}]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollview}
      contentContainerStyle={styles.contentContainer}>
      <View>
        {transportInfo !== undefined ? (
          <FlatList
            horizontal
            pagingEnabled
            decelerationRate={0}
            snapToInterval={cardWidth + 20}
            snapToAlignment="center"
            contentInset={styles.contentInsetIOS}
            data={transportInfo}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(itemData) => (
              <TransportItem
                tripId={tripId}
                id={itemData.item.id}
                means={itemData.item.means}
                to={itemData.item.to}
                destination={selectedTrip.destination}
                date={itemData.item.date}
                hour={itemData.item.hour}
                fromPlace={itemData.item.fromPlace}
                toPlace={itemData.item.toPlace}
              />
            )}
          />
        ) : (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={[styles.text, styles.itemlessText]}>
              There are no tickets!
            </Text>

            <Text style={[styles.text, styles.itemlessText]}>
              Add one with the
            </Text>

            <Icon name="md-add" size={32} style={[styles.text, {margin: 10}]} />

            <Text style={[styles.text, styles.itemlessText]}>sign above!</Text>
          </View>
        )}
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
