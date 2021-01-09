import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import * as notesActions from 'actions/notesActions';
import {
  View as Container,
  HeaderButton,
  ItemlessFrame,
  LoadingFrame,
  Searchbar,
  Text,
} from 'utils';
import { NoteItem } from '../components';

const NotesContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const tripId = route.params.tripId;

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState(
    useSelector(
      (state) => state.trips.trips.find((item) => item.id === tripId).notes,
    ),
  );
  const [filteredDataSource, setFilteredDataSource] = useState(
    useSelector(
      (state) => state.trips.trips.find((item) => item.id === tripId).notes,
    ),
  );

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = notes.filter(function (item) {
        const itemData = item.category
          ? item.category.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setNotes(newData);
      setSearch(text);
    } else {
      setNotes(filteredDataSource);
      setSearch(text);
    }
  };

  const handleEdit = (noteId, category, title, description) => {
    navigation.navigate('Edit note', {
      category,
      description,
      noteId,
      title,
      tripId: route.params.tripId,
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
      await dispatch(notesActions.fetchNotesRequest(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, tripId]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  if (Array.isArray(filteredDataSource) && filteredDataSource.length < 1)
    return <ItemlessFrame message="You have no notes saved!" />;

  if (!Array.isArray(notes) || isRefreshing || isLoading)
    return <LoadingFrame />;

  if (error)
    return (
      <Container>
        <Text>Something went wrong!</Text>
        <Text>Error: {error}</Text>
      </Container>
    );

  return (
    <Container>
      <Searchbar
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        placeholder="Search by category"
      />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(data) => (
          <NoteItem
            handleDelete={handleDelete}
            {...data.item}
            handleEdit={handleEdit}
            {...data.item}
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
