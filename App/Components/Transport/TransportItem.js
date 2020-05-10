import React from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from '../../Components/UI/Card';
import {transportItemStyle as styles} from './TransportItemStyle';

/**
 * Transport item component used in TransportScreen for tickets listing.
 * TODO:
 * refactor icons for better touchable response and clickability
 * refactor metrics for responsive design
 * refactor action bar
 * refactor inline styles
 */
const TransportItem = (props) => {
  return (
    <Card style={styles.transport}>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(`Delete ${props.id}. ticket`);
          }}>
          <Icon name="md-trash" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert('Edit ticket');
          }}>
          <Icon name="md-brush" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert('Show QR code');
          }}>
          <Icon name="md-qr-scanner" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={[styles.rowCenter, {marginTop: 50, marginBottom: 20}]}>
        <Text style={[styles.header]}>{props.means} ticket</Text>
        {props.to === true ? (
          <Text style={[styles.subtitle]}>to {props.destination}</Text>
        ) : (
          <Text style={[styles.subtitle]}>from {props.destination}</Text>
        )}
      </View>

      <View style={styles.columnDirection}>
        <View style={styles.rowDirection}>
          <Icon name="md-calendar" style={styles.icon} />

          <Text style={[styles.text]}>
            Leave on {props.date} {'\n'}
            at {props.hour}
          </Text>
        </View>

        <View style={[styles.rowDirection, styles.spaceBetween, {margin: 20}]}>
          <Icon name="md-more" style={styles.icon} />

          <Text style={[styles.text]}>
            from {props.fromPlace} {'\n'}
            {'\n'}
            to {props.toPlace}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default TransportItem;
