import React, {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import HeaderButton from '../../Components/UI/HeaderButton';
import NoteItem from '../../Components/Notes/NoteItem';
import * as noteActions from '../../Stores/Actions/Note';
import {NotesScreenStyles as styles} from './NotesScreenStyle';
import Colors from '../../Constants/Colors';

const NotesScreen = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const notes = selectedTrip.notes;

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /** HANDLERS */
  const loadNotes = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(noteActions.fetchNotes(tripId));
    } catch (err) {
      console.log(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, tripId]);

  useEffect(() => {
    setIsLoading(true);
    loadNotes().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadNotes]);

  if (isLoading) {
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
          onRefresh={loadNotes}
          refreshing={isRefreshing}
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => (
            <NoteItem
              tripId={tripId}
              id={itemData.item.id}
              title={itemData.item.title}
              description={itemData.item.description}
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
          <View style={{marginTop: '10%'}}>
            <TouchableOpacity style={styles.button} onPress={loadNotes}>
              <Text style={styles.buttonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export const notesScreenOptions = (navData) => {
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

export default NotesScreen;
