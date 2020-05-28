/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {NotesScreenStyles as styles} from './NotesScreenStyle';
import {useDispatch} from 'react-redux';
import * as noteActions from '../../Stores/Actions/Note';
import Colors from '../../Constants/Colors';
import NoteItem from '../../Components/MyTrips/NoteItem';
/* import HeaderButton from '../../Components/UI/HeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';*/

const NotesScreen = (props) => {
  const trip = props.route.params.trip;
  const notes = trip.notes;
  const tripId = trip.id;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      setIsLoading(true);
      await dispatch(noteActions.fetchNotes(tripId));
      setIsLoading(false);
    };
    loadNotes();
  }, [dispatch, tripId]);

  if (isLoading) {
    return (
      <View style={[styles.centered, {backgroundColor: Colors.background}]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={{backgroundColor: '#222222', flex: 1}}>
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
