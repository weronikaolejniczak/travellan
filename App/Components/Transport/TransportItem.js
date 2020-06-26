import React, {useCallback} from 'react';
import {View, ScrollView, Text, Alert, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from '../../Components/UI/Card';
import TransportStage from '../../Components/Transport/TransportStage';
import * as transportActions from '../../Stores/Actions/Transport';
import {transportItemStyle as styles} from './TransportItemStyle';
// import Colors from '../../Constants/Colors';

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

        {/* EDIT TICKET INFO */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Edit ticket');
          }}>
          <Icon name="md-brush" style={styles.icon} />
        </TouchableOpacity>

        {/* SHOW QR CODE */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Show QR code');
          }}>
          <Icon name="md-qr-scanner" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* TO/FROM DESTINATION */}

      <ScrollView style={{marginTop: 26}}>
        <View style={[styles.rowCenter, {marginTop: 50, marginBottom: 20}]}>
          {props.to === true ? (
            <Text style={[styles.header]}>to {props.destination}</Text>
          ) : (
            <Text style={[styles.header]}>from {props.destination}</Text>
          )}
        </View>

        <View>
          {props.stages.map((i) => {
            return <TransportStage stage={i} index={props.stages.indexOf(i)} />;
          })}
        </View>
      </ScrollView>
    </Card>
  );
};

export default TransportItem;
