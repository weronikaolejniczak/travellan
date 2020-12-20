import * as notesActions from 'actions/notesActions';

import { Alert, FlatList, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ItemlessFrame, LoadingFrame } from 'components/frames';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Colors from 'constants/Colors';
import HeaderButton from 'components/headerButton/HeaderButton';
import { NoteItem } from '../components';
import { styles } from './NotesContainerStyle';

const NotesContainer = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const notes = useSelector(
    (state) => state.trips.trips.find((item) => item.id === tripId).notes,
  );

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleEdit = (noteId, title, description) => {
      props.navigation.navigate('Edit note', {
        noteId,
        title,
        description
      });
  };

  const persistDelete = useCallback(
    (id) => {
      setIsRefreshing(true);
      try {
        dispatch(notesActions.deleteNoteRequest(tripId, id));
      } catch {
        setError('Something went wrong!');
      }
      setIsRefreshing(false);
    },
    [dispatch, tripId],
  );

  const handleDelete = useCallback(
    (noteId) => {
      setIsRefreshing(true);
      Alert.alert(
        'Delete note',
        'Are you sure?',
        [
          {
            style: 'cancel',
            text: 'Cancel',
          },
          {
            onPress: () => persistDelete(noteId),
            text: 'OK',
          },
        ],
        { cancelable: true },
      );
      setIsRefreshing(false);
    },
    [persistDelete],
  );

  const loadNotes = useCallback(() => {
    setError(null);
    setIsLoading(true);
    try {
      dispatch(notesActions.fetchNotesRequest(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, tripId]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  if (!Array.isArray(notes) || isLoading || isRefreshing) {
    return <LoadingFrame />;
  }

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: Colors.background }]}>
        <Text style={styles.text}>Something went wrong!</Text>
        <Text style={styles.text}>Error: {error}</Text>
      </View>
    );
  }

  if (Array.isArray(notes) && notes.length < 1) {
    return <ItemlessFrame message="You have no notes saved!" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={(data) => (
          <NoteItem handleDelete={handleDelete} {...data.item}
            handleEdit={handleEdit} {...data.item}/>
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
          iconName="plus"
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
