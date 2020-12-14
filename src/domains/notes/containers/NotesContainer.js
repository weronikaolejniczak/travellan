import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {ItemlessFrame, LoadingFrame} from 'components/frames';
import HeaderButton from 'components/headerButton/HeaderButton';
import {NoteItem} from '../components';
import * as notesActions from 'actions/notesActions';
import {styles} from './NotesContainerStyle';
import Colors from 'constants/Colors';

const NotesContainer = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const notes = useSelector(
    (state) => state.trips.trips.find((item) => item.id === tripId).notes,
  );

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const deleteAction = useCallback(
    (id) => {
      setIsRefreshing(true);
      try {
        dispatch(notesActions.deleteNoteRequest(tripId, id));
      } catch {
        setError('Something went wrong!');
      }
      setIsRefreshing(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tripId],
  );

  const deleteNoteHandler = useCallback(
    async (noteId) => {
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
    },
    [deleteAction],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  if (isLoading || isRefreshing) {
    return <LoadingFrame />;
  }

  if (error) {
    return (
      <View style={[styles.centered, {backgroundColor: Colors.background}]}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }

  if (notes === []) {
    return <ItemlessFrame message="You have no notes saved!" />;
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
