/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Icon} from 'react-native-elements';

import NoteItem from '../../Components/MyTrips/NoteItem';

const NotesScreen = (props) => {
  const trip = props.route.params.trip;
  const notes = trip.notes;
  const tripId = trip.id;

  return (
    <ScrollView style={{backgroundColor: '#222222', flex: 1}}>
      <View style={{alignItems: 'center', margin: 10}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Add Note', {
              tripId: tripId,
            });
          }}>
          <Text style={styles.buttonText}>Add new note</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={notes}
          renderItem={(itemData) => (
            <NoteItem
              keyExtractor={(item) => item.id.toString()}
              tripId={tripId}
              id={itemData.item.id}
              title={itemData.item.title}
              description={itemData.item.description}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    width: '40%',
    padding: 15,
    margin: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default NotesScreen;
