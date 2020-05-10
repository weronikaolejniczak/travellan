import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
/**
 * IMPORTS FROM WITHIN THE MODULE
 */
import Card from '../../Components/UI/Card';
import Colors from '../../Constants/Colors';

// constants for responsive design
const {height, width} = Dimensions.get('window');
const cardHeight = 0.4 * height;

/**
 * Trip item component used in TripsOverviewScreen for trips listing.
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

/**
 * TODO:
 * refactor Colors
 * refactor Fonts
 * refactor Metrics
 */
const styles = StyleSheet.create({
  tripCard: {
    height: cardHeight,
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.02,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: cardHeight * 0.65,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actions: {
    position: 'absolute',
    left: '80%',
    top: cardHeight * 0.715,
  },
  text: {
    color: Colors.text,
  },
  details: {
    alignItems: 'center',
    height: cardHeight * 0.35,
    padding: '4%',
  },
  destination: {
    fontSize: 22,
    marginVertical: 4,
  },
  date: {
    fontSize: 14,
  },
  alignRow: {
    marginHorizontal: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TripItem;
