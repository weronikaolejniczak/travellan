import React, {useCallback} from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from '../../Components/UI/Card';
import ReadMore from '../../Components/UI/ReadMore';
import * as accommodationActions from '../../Stores/Actions/Accommodation';
import {accommodationItemStyle as styles} from './AccommodationItemStyle';

/** Accommodation item component used in AccommodationScreen for reservations listing
 * TODO:
 * refactor icons for better touchable response and clickability
 * refactor action bar
 * refactor inline styles
 */
const AccommodationItem = (props) => {
  const dispatch = useDispatch();

  const tripId = props.tripId;
  const reservationId = props.id;

  const deleteReservationHandler = useCallback(() => {
    dispatch(accommodationActions.deleteReservation(tripId, reservationId));
  }, [dispatch, tripId, reservationId]);

  return (
    <Card style={styles.accommodation}>
      <View style={styles.actions}>
        <TouchableOpacity onPress={deleteReservationHandler}>
          <Icon name="md-trash" style={styles.icon} />
        </TouchableOpacity>

        {/* EDIT RESERVATION INFO
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Edit reservation');
          }}>
          <Icon name="md-brush" style={styles.icon} />
        </TouchableOpacity>

        SHOW ON MAP
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Show on map');
          }}>
          <Icon name="md-map" style={styles.icon} />
        </TouchableOpacity> */}
      </View>

      <ScrollView>
        <View style={{marginTop: 10}}>
          <Text style={[styles.text, styles.header]}>{props.name}</Text>
          <Text style={[styles.text, styles.subtitle]}>{props.address}</Text>
          <Text>{'\n'}</Text>
          {/* <Text style={[styles.text, styles.h2]}>Benefits</Text>
          <Text>{'\n'}</Text> */}
          <Text style={[styles.text, styles.h2]}>Description</Text>
          <View style={[styles.textAlign]}>
            <ReadMore longText={props.description} />
          </View>
        </View>
      </ScrollView>
    </Card>
  );
};

export default AccommodationItem;
