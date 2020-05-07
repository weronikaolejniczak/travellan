/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Alert, Image, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const CARD_WIDTH = Dimensions.get('window').width * 0.82;
export const CARD_HEIGHT = Dimensions.get('window').height * 0.82;
export const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 13;

const TransportItem = (props) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          padding: 15,
          backgroundColor: '#FF8C00',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
        <Icon
          name="md-trash"
          size={30}
          color="#FFFFFF"
          style={{marginRight: 30}}
          onPress={() => {
            Alert.alert(`Delete ${props.id}. ticket`);
          }}
        />
        <Icon
          name="md-brush"
          size={30}
          color="#FFFFFF"
          style={{marginRight: 30}}
          onPress={() => {
            Alert.alert('Edit ticket');
          }}
        />
        <Icon
          name="md-qr-scanner"
          size={30}
          color="#FFFFFF"
          style={{marginRight: 30}}
          onPress={() => {
            Alert.alert('Show QR code');
          }}
        />
      </View>
      <View style={{marginTop: 50, marginBottom: 20, alignItems: 'center'}}>
        <Text style={[styles.header]}>{props.means} ticket</Text>
        {props.to === true ? (
          <Text style={[styles.subtitle]}>to {props.destination}</Text>
        ) : (
          <Text style={[styles.subtitle]}>from {props.destination}</Text>
        )}
      </View>
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="md-calendar"
            size={42}
            color="#FFFFFF"
            style={{marginRight: 20}}
          />
          <Text style={[styles.text]}>
            Leave on {props.date} {'\n'}
            at {props.hour}
          </Text>
        </View>
        <View
          style={{
            margin: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Icon
            name="md-more"
            size={42}
            color="#FFFFFF"
            style={{marginRight: 20}}
          />
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

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#111111',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 10,
    padding: 25,
    borderRadius: 15,
  },
  header: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default TransportItem;
