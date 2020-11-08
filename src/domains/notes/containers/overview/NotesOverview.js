import React, {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, FlatList, Platform, Alert, Button} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import Itemless from 'components/frames/itemless/Itemless';
import Loading from 'components/frames/loading/Loading';
import NoteItem from 'notes/components/item/Note';
import HeaderButton from 'components/headerButton/HeaderButton';
import * as noteActions from 'state/note/noteActions';
import {NotesStyles as styles} from './NotesOverviewStyle';
import Colors from 'constants/Colors';

const NotesOverview = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
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
        await dispatch(noteActions.deleteNote(tripId, id));
      } catch {
        setError('Something went wrong!');
      }
      // fetch notes
      try {
        await dispatch(noteActions.fetchNotes(tripId));
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
      await dispatch(noteActions.fetchNotes(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadNotes();
  }, [dispatch, loadNotes]);

  // listen to navigation event to fetch trips no matter if the screen is already in stack
  useEffect(() => {
    const willFocusSubscription = props.navigation.addListener(
      'willFocus',
      loadNotes,
    );
    // clean up listener
    return () => {
      willFocusSubscription.remove();
    };
  }, []); // do not add props.navigation as a dependency, it may cause a loop

  if (isLoading || isRefreshing) {
    return <Loading />;
  } else if (error) {
    return (
      <View style={[styles.centered, {backgroundColor: Colors.background}]}>
        <Text style={styles.text}>{error}</Text>
        <Button title="Try again" onPress={loadNotes} color={Colors.primary} />
      </View>
    );
  } else {
    if (notes === undefined) {
      return <Itemless message={'You have no notes saved!'} />;
    } else {
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
    }
  }
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

export default NotesOverview;
