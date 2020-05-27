/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { NotesScreenStyles as styles} from './NotesScreenStyle';


import NoteItem from '../../Components/MyTrips/NoteItem'

const NotesScreen = (props) => {
  const trip = props.route.params.trip;
  const notes = trip.notes;
  const tripId = trip.id;

  return (
    <View style={{backgroundColor: '#222222', flex: 1}}>
      <View style={{alignItems: 'center', margin: 10, }}>
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
      
  );
};


export default NotesScreen;
