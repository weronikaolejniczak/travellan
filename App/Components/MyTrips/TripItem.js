import React from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

const TripItem = (props) => {
  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: props.image}} />
      </View>
      <View style={styles.details}>
        <Text style={styles.destination}>{props.destination}</Text>
        <Text style={styles.date}>
          {props.startDate} - {props.endDate}
        </Text>
      </View>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={props.onViewDetail} // no function link yet!
        />
        <Button
          color={Colors.primary}
          title="Delete Trip"
          onPress={props.deleTrip} // no function link yet!
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: '#000000',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.background,
    height: 320,
    margin: 20,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden', // ensures that any child can't overlap what we set up
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  destination: {
    fontSize: 22,
    color: '#ffffff',
    marginVertical: 4,
  },
  date: {
    fontSize: 14,
    color: '#ffffff',
  },
  actions: {
    margin: 10,
    paddingHorizontal: 60,
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default TripItem;
