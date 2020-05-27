/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { NotesScreenStyles as styles} from './NotesScreenStyle';
import HeaderButton from '../../Components/UI/HeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

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

export const notesScreenOptions = (navData) => {
  return {
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create new note"
          style={{marginRight: 3}}
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('Add Note', {
              tripId: navData.route.params.tripId,
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default NotesScreen;
