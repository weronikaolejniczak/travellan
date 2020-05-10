import React from 'react';
import {View, ScrollView, Text, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from '../../Components/UI/Card';
import ReadMore from '../../Components/UI/ReadMore';
import {accommodationItemStyle as styles} from './AccommodationItemStyle';

/** Accommodation item component used in AccommodationScreen for reservations listing
 * TODO:
 * refactor icons for better touchable response and clickability
 * refactor action bar
 * refactor inline styles
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

export default AccommodationItem;
