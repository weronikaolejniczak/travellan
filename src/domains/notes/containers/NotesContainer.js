import React, {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, FlatList, Platform, Alert, Button} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {ItemlessFrame, LoadingFrame} from 'components/frames';
import NoteItem from 'domains/notes/components/item/Note';
import HeaderButton from 'components/headerButton/HeaderButton';
import * as notesActions from 'actions/notesActions';
import {styles} from './NotesContainerStyle';
import Colors from 'constants/Colors';

const NotesContainer = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const notes = selectedTrip.notes;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const deleteAction = useCallback(
    async (id) => {
      setIsRefreshing(true);
      // delete notes
      try {
        await dispatch(notesActions.deleteNoteRequest(tripId, id));
      } catch {
        setError('Something went wrong!');
      }
      // fetch notes
      try {
        await dispatch(notesActions.fetchNotesRequest(tripId));
      } catch {
        setError('Something went wrong!');
      }
      setIsRefreshing(false);
    },
    [dispatch, tripId],
  );

  const deleteNoteHandler = useCallback(
    async (noteId) => {
      setIsRefreshing(true);
      Alert.alert(
        'Delete note',
        'Are you sure?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => deleteAction(noteId),
          },
        ],
        {cancelable: true},
      );
      setIsRefreshing(false);
    },
    [deleteAction],
  );

  const loadNotes = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(notesActions.fetchNotesRequest(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadNotes();
  }, [dispatch, loadNotes]);

  if (isLoading || isRefreshing) {
    return <LoadingFrame />;
  }

  if (error) {
    return (
      <View style={[styles.centered, {backgroundColor: Colors.background}]}>
        <Text style={styles.text}>{error}</Text>
        <Button title="Try again" onPress={loadNotes} color={Colors.primary} />
      </View>
    );
  }

  if (notes === undefined) {
    return <ItemlessFrame message={'You have no notes saved!'} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData) => (
          <NoteItem
            tripId={tripId}
            category={itemData.item.category}
            id={itemData.item.id}
            title={itemData.item.title}
            description={itemData.item.description}
            deleteNoteHandler={() => deleteNoteHandler(itemData.item.id)}
          />
        )}
      />
    </View>
  );
};

export const notesOptions = (navData) => {
  return {
    headerRight: () => (
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

export default NotesContainer;
