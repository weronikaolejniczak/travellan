import React, {useCallback, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from 'components/card/Card';
import TransportStage from 'transport/components/stage/Transport';
import * as transportActions from 'transport/state/Actions';
import {transportItemStyle as styles, cardHeight} from './TransportStyle';

/** QR-related imports */
import {useNavigation} from '@react-navigation/native';

/** Transport item component used in Transport container for tickets listing */
const Transport = (props) => {
  const dispatch = useDispatch();

  const navigation = useNavigation(); // navigation hook
  //const [QR, setQR] = useState('');
  const tripId = props.tripId;
  const ticketId = props.id;
  const transportTransfers = props.stages.length - 1;
  const qr = props.qr;

  const deleteTicketHandler = useCallback(() => {
    dispatch(transportActions.deleteTransport(tripId, ticketId));
  }, [dispatch, tripId, ticketId]);

  const movetoQR = () => {
    navigation.navigate('Add QR', {
      tripId: tripId,
      ticketId: ticketId,
      transportTransfers: transportTransfers,
      qr: qr,
    });
  };

  return (
    <Card style={styles.transportCard}>
      <View style={styles.actions}>
        {/* DELETE TICKET */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Delete a ticket',
              'Are you sure?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: deleteTicketHandler,
                },
              ],
              {cancelable: true},
            );
          }}>
          <Icon
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* SHOW/ADD QR CODE */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Add QR code',
              'Are you sure?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: movetoQR,
                },
              ],
              {cancelable: true},
            );
          }}>
          <MaterialIcon name={'qrcode-scan'} style={styles.icon} />
        </TouchableOpacity>
        {/* ATTACH TICKET */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Attach document');
          }}>
          <MaterialIcon name={'file-pdf-box'} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* TO/FROM DESTINATION */}
      <ScrollView
        style={[{marginTop: cardHeight * 0.0465}]}
        indicatorStyle={'white'}>
        <View style={[styles.rowCenter, {paddingVertical: 15}]}>
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
        <View style={{flex: 1, alignItems: 'center', marginBottom: '5%'}}>
          {props.stages.map((i) => {
            return <TransportStage stage={i} index={props.stages.indexOf(i)} />;
          })}
        </View>
      </ScrollView>
    </Card>
  );
};

export default Transport;
