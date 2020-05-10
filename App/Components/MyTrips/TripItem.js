import React from 'react';
import {View, Text, Image, TouchableOpacity, Platform} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
/**
 * IMPORTS FROM WITHIN THE MODULE
 */
import Card from '../../Components/UI/Card';
import {tripItemStyle as styles} from './TripItemStyle';

/**
 * Trip item component used in TripsOverviewScreen for trips listing
 */
const TripItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.tripCard}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect}>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: props.image}} />
            </View>
            <View style={styles.alignRow}>
              <View style={styles.details}>
                <Text style={[styles.text, styles.destination]}>
                  {props.destination}
                </Text>
                <Text style={[styles.text, styles.date]}>
                  {props.startDate} - {props.endDate}
                </Text>
              </View>
            </View>
          </View>
        </TouchableCmp>
        <View style={styles.actions}>{props.children}</View>
      </View>
    </Card>
  );
};

export default TripItem;
