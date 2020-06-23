import React, {useCallback} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from '../../Components/UI/Card';
import {transportItemStyle as styles} from './TransportItemStyle';
import * as transportActions from '../../Stores/Actions/Transport';

/**
 * Transport item component used in TransportScreen for tickets listing.
 * TODO:
 * refactor icons for better touchable response and clickability
 * refactor metrics for responsive design
 * refactor action bar
 * refactor inline styles
 */
const TransportItem = (props) => {
  const dispatch = useDispatch();

  const tripId = props.tripId;
  const ticketId = props.id;

  const deleteTicketHandler = useCallback(() => {
    dispatch(transportActions.deleteTransport(tripId, ticketId));
  }, [dispatch, tripId, ticketId]);

  return (
    <Card style={styles.transportCard}>
      <View style={styles.actions}>
        <TouchableOpacity onPress={deleteTicketHandler}>
          <Icon name="md-trash" style={styles.icon} />
        </TouchableOpacity>

        {/* EDIT TICKET INFO
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Edit ticket');
          }}>
          <Icon name="md-brush" style={styles.icon} />
        </TouchableOpacity>

        SHOW QR CODE
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Show QR code');
          }}>
          <Icon name="md-qr-scanner" style={styles.icon} />
        </TouchableOpacity> */}
      </View>

      <View style={[styles.rowCenter, {marginTop: 50, marginBottom: 20}]}>
        <Text style={[styles.header]}>{props.means} ticket</Text>
        {props.to === true ? (
          <Text style={[styles.subtitle]}>to {props.destination}</Text>
        ) : (
          <Text style={[styles.subtitle]}>from {props.destination}</Text>
        )}
      </View>

      {/* DEPARTURE */}
      <View>
        <Text style={[styles.subtitle]}>Departure</Text>
        <View style={[styles.rowDirection, {margin: 10}]}>
          <View style={styles.item}>
            <Icon name="md-calendar" style={styles.icon} />
          </View>
          <View style={styles.item}>
            <Text style={[styles.text]}>
              Leave on {props.date} {'\n'}
              at {props.hour}
            </Text>
          </View>
        </View>

        <View style={[styles.rowDirection, {margin: 10}]}>
          <View style={styles.item}>
            <Icon name="md-arrow-round-down" style={styles.icon} />
          </View>
          <View style={styles.item}>
            <Text style={[styles.text]}>from {props.fromPlace}</Text>
          </View>
        </View>
      </View>

      {/* ARRIVAL */}
      <View style={{marginTop: 10}}>
        <Text style={[styles.subtitle]}>Arrival</Text>
        <View style={[styles.rowDirection, {margin: 10}]}>
          <View style={styles.item}>
            <Icon name="md-calendar" style={styles.icon} />
          </View>
          <View style={styles.item}>
            <Text style={[styles.text]}>
              Leave on {props.date} {'\n'}
              at {props.hour}
            </Text>
          </View>
        </View>

        <View style={[styles.rowDirection, {margin: 10}]}>
          <View style={styles.item}>
            <Icon name="md-arrow-round-forward" style={styles.icon} />
          </View>
          <View style={styles.item}>
            <Text style={[styles.text]}>to {props.toPlace}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default TransportItem;
