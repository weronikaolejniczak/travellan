/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  //TouchableOpacity,
  View,
  FlatList,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import HeaderButton from '../../Components/UI/HeaderButton';
import {NotesScreenStyles as styles} from './NotesScreenStyle';
import * as noteActions from '../../Stores/Actions/Note';
import Colors from '../../Constants/Colors';
import NoteItem from '../../Components/Notes/NoteItem';

const NotesScreen = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );

  const notes = selectedTrip.notes;

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
      {notes ? (
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
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={[styles.text, styles.itemlessText]}>
            There are no notes!
          </Text>
          <Text style={[styles.text, styles.itemlessText]}>
            Add one with the
          </Text>
          <Icon name="md-add" size={32} style={[styles.text, {margin: 10}]} />
          <Text style={[styles.text, styles.itemlessText]}>sign above!</Text>
        </View>
      )}
    </View>
  );
};

export const notesScreenOptions = (navData) => {
  return {
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create a note"
          style={{marginRight: 3}}
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('Add note', {
              tripId: navData.route.params.tripId,
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default NotesScreen;
