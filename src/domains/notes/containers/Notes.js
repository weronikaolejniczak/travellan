import React, {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import HeaderButton from 'components/headerButton/HeaderButton';
import NoteItem from 'notes/components/item/Note';
import * as noteActions from 'notes/state/Actions';
import {NotesStyles as styles} from './NotesStyle';
import Colors from 'constants/Colors';

const Notes = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const notes = selectedTrip.notes;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  /* handlers */
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
    setIsRefreshing(true);
    try {
      await dispatch(noteActions.fetchNotes(tripId));
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, tripId]);

  useEffect(() => {
    setIsLoading(true);
    loadNotes().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadNotes]);

  /* activity indicator */
  if (isLoading || isRefreshing) {
    return (
      <View style={[styles.centered, {backgroundColor: Colors.background}]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {notes ? (
        <FlatList
          //onRefresh={loadNotes}
          //refreshing={isRefreshing}
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
      ) : (
        <View style={styles.itemlessContainer}>
          <Text style={[styles.text, styles.itemlessText]}>
            There are no notes!
          </Text>
          <Text style={[styles.text, styles.itemlessText]}>
            Add one with the
          </Text>
          <Icon
            name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            size={32}
            style={[styles.text, {margin: 10}]}
          />
          <Text style={[styles.text, styles.itemlessText]}>sign above!</Text>
        </View>
      )}
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

export default Notes;
