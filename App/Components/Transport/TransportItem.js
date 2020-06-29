import React, {useCallback} from 'react';
import {View, ScrollView, Text, Alert, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from '../../Components/UI/Card';
import TransportStage from '../../Components/Transport/TransportStage';
import * as transportActions from '../../Stores/Actions/Transport';
import {transportItemStyle as styles} from './TransportItemStyle';

/** TRANSPORT ITEM COMPONENT used in TransportScreen for tickets listing
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
  const transportTransfers = props.stages.length - 1;

  const deleteTicketHandler = useCallback(() => {
    dispatch(transportActions.deleteTransport(tripId, ticketId));
  }, [dispatch, tripId, ticketId]);

  return (
    <Card style={styles.transportCard}>
      <View style={styles.actions}>
        {/* DELETE TICKET */}
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
      <ScrollView style={[{marginTop: 20}]}>
        <View style={[styles.rowCenter, {paddingVertical: 30}]}>
          {props.to === true ? (
            <Text style={[styles.header]}>to {props.destination}</Text>
          ) : (
            <Text style={[styles.header]}>from {props.destination}</Text>
          )}
          <Text style={[styles.text]}>
            {transportTransfers === 1
              ? `${transportTransfers} transport transfer`
              : `${transportTransfers} transport transfers`}
          </Text>
        </View>

        {/* RENDER TRANSPORT STAGE COMPONENT FOR EACH STAGE */}
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
