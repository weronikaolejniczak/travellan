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
import Colors from '../../Constants/Colors';

const {height, width} = Dimensions.get('window');

/**
 * Trip item component used in TripsOverviewScreen for trips listing.
 */
const TripItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
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
              <View style={styles.actions}>{props.children}</View>
            </View>
          </View>
        </TouchableCmp>
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
  product: {
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.background,
    height: 0.4 * height,
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.015,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '65%',
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
    height: '20%',
    padding: 15,
  },
  text: {
    color: Colors.text,
  },
  destination: {
    fontSize: 22,
    marginVertical: 4,
  },
  date: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  alignRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TripItem;
