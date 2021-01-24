import React, { useCallback, useEffect, useState } from 'react';
import filter from 'lodash.filter';
import { Alert, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import {
  View as Container,
  ErrorFrame,
  HeaderButton,
  ItemlessFrame,
  LoadingFrame,
  Searchbar,
} from 'utils';
import { NoteItem } from '../components';
import { deleteNoteRequest, fetchNotesRequest } from 'actions/notesActions';
import { styles } from './NotesContainerStyle';

const NotesContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { tripId } = route.params;
  const notes = useSelector(
    (state) => state.trips.trips.find((item) => item.id === tripId).notes,
  );

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const handleEdit = (noteId, category, title, description) => {
    navigation.navigate('Edit note', {
      category,
      description,
      noteId,
      title,
      tripId: route.params.tripId,
    });
  };

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(notes, (note) =>
      contains(note, formattedQuery),
    );
    setFilteredNotes(filteredData);
    setSearch(text);
  };

  const contains = ({ category, description, title }, query) =>
    !!(
      category.toLowerCase().includes(query) ||
      description.toLowerCase().includes(query) ||
      title.toLowerCase().includes(query)
    );

  const persistDelete = useCallback(
    (id) => {
      setIsRefreshing(true);
      try {
        dispatch(deleteNoteRequest(tripId, id));
      } catch {
        setError('Something went wrong!');
      }
      setIsRefreshing(false);
    },
    [dispatch, tripId],
  );

  const handleDelete = useCallback(
    async (noteId) => {
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

  const loadNotes = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(fetchNotesRequest(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, tripId]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  useEffect(() => {
    setSearch('');
    setFilteredNotes(notes);
  }, [notes]);

  if (Array.isArray(notes) && notes.length < 1)
    return <ItemlessFrame>You have no notes saved!</ItemlessFrame>;

  if (!Array.isArray(notes) || isRefreshing || isLoading)
    return <LoadingFrame />;

  if (error) return <ErrorFrame error={error} />;

  return (
    <Container style={styles.container}>
      <Searchbar
        onChangeText={(text) => handleSearch(text)}
        value={search}
        placeholder="Search"
      />
      <FlatList
        data={filteredNotes}
        indicatorStyle="white"
        keyExtractor={(item) => item.id.toString()}
        renderItem={(params) => (
          <NoteItem
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            {...params.item}
          />
        )}
      />
    </Container>
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
