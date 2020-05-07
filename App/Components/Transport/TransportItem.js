import React from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
/**
 * IMPORTS FROM WITHIN THE MODULE
 */
import Colors from '../../Constants/Colors';

const {height, width} = Dimensions.get('window');
export const cardHeight = height * 0.82;
export const cardWidth = width * 0.82;
export const spacingForCardInset = width * 0.1 - 13;

/**
 * Transport item component used in TransportScreen for tickets listing.
 * TODO:
 * refactor icons for better touchable response and clickability
 * refactor metrics for responsive design
 */
const TransportItem = (props) => {
  return (
    <View style={styles.card}>
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
    </View>
  );
};

/**
 * TODO:
 * refactor Colors
 * refactor Fonts
 * refactor Metrics
 */
const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardHeight,
    backgroundColor: Colors.cards,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 10,
    padding: 25,
    borderRadius: 15,
  },
  actions: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  // refactor the triple Colors.text
  header: {
    color: Colors.text,
    fontSize: 24,
  },
  subtitle: {
    color: Colors.text,
    fontSize: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
  },
  icon: {
    fontSize: 30,
    color: Colors.text,
    marginRight: 20,
  },
  columnDirection: {
    flexDirection: 'column',
  },
  rowDirection: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  rowCenter: {
    alignItems: 'center',
  },
});

export default TransportItem;
