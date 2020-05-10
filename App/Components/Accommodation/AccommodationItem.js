import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
/**
 * IMPORTS FROM WITHIN THE MODULE
 */
import Card from '../../Components/UI/Card';
import ReadMore from '../../Components/UI/ReadMore';
import Colors from '../../Constants/Colors';

// refactor Metrics
const {height, width} = Dimensions.get('window');
export const cardHeight = height * 0.82;
export const cardWidth = width * 0.82;
export const spacingForCardInset = width * 0.1 - 13;

/**
 * Accommodation item component used in AccommodationScreen for reservations listing.
 * TODO:
 * refactor icons for better touchable response and clickability
 * refactor action bar
 */
const AccommodationItem = (props) => {
  return (
    <Card style={styles.accommodation}>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(`Delete ${props.id}. reservation`);
          }}>
          <Icon name="md-trash" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert('Edit reservation');
          }}>
          <Icon name="md-brush" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert('Show on map');
          }}>
          <Icon name="md-map" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={{marginTop: 10}}>
          <Text style={[styles.text, styles.header]}>{props.name}</Text>
          <Text style={[styles.text, styles.subtitle]}>{props.address}</Text>
          <Text>{'\n'}</Text>
          <Text style={[styles.text, styles.h2]}>Benefits</Text>
          <Text>{'\n'}</Text>
          <Text style={[styles.text, styles.h2]}>Description</Text>
          <View style={[styles.textAlign]}>
            <ReadMore longText={props.description} />
          </View>
        </View>
      </ScrollView>
    </Card>
  );
};

/**
 * TODO:
 * refactor Colors
 * refactor Fonts
 * refactor Metrics
 * refactor into seperate file AccommodationItemStyle
 */
const styles = StyleSheet.create({
  accommodation: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 15,
    marginHorizontal: width * 0.025,
    paddingTop: height * 0.101,
    paddingBottom: height * 0.02,
    paddingHorizontal: width * 0.03,
  },
  // refactor triple Colors.text
  header: {
    color: Colors.text,
    fontSize: 24,
  },
  h2: {
    color: Colors.text,
    fontSize: 18,
  },
  subtitle: {
    color: Colors.text,
    fontSize: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
  },
  textAlign: {
    textAlign: 'justify',
  },
  imageContainer: {
    width: '100%',
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
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
  icon: {
    fontSize: 30,
    color: Colors.text,
    marginRight: 30,
  },
});

export default AccommodationItem;
