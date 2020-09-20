import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
/* IMPORTS FROM WITHIN THE MODULE */
import Card from 'components/card/Card';
import ReadMore from 'components/readMore/ReadMore';
import * as noteActions from 'notes/state/Actions';
import {noteStyle as styles} from './NoteStyle';


/** Note item component */
const Note = (props) => {
  const dispatch = useDispatch();
  var convertedId = props.id.split(" ");
  var extractedDate = convertedId[2] + " " + convertedId[1] + " " + (convertedId[4].split(":"))[0] + ":" + (convertedId[4].split(":"))[1];
  /** HANDLERS */
  const submitHandler = useCallback(() => {
    Alert.alert(
      'Delete a note',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(noteActions.deleteNote(props.tripId, props.id));
          },
        },
      ],
      {cancelable: true},
    );
  }, [dispatch, props.tripId, props.id]);

  const EditHandler = useCallback(() => {
  
  }, [dispatch, props.tripId, props.id]);

  return (
    <Card style={styles.noteCard}>
      {/* ACTIONS BAR */}
      <View style={styles.actions}>
        <Text numberOfLines={1} style={styles.subtitle}>
          {props.category}
        </Text>

         {/* EDIT BUTTON 
         <TouchableOpacity>
          <Icon
            name={Platform.OS === 'android' ? 'md-brush' : 'ios-brush'}
            style={styles.icon}
          />
         </TouchableOpacity> */}

        {/* DELETE BUTTON */}
        <TouchableOpacity onPress={submitHandler}>
          <Icon
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* NOTE CONTENT */}
      <ScrollView style={styles.bodyMargin}>
      <Text style={styles.create}>{extractedDate}</Text>
      <Text style={styles.category}>{props.title}</Text>
        <View style={[styles.alignText]}>
          <ReadMore longText={props.description} />
        </View>
      </ScrollView>
    </Card>
  );
};

export default Note;
