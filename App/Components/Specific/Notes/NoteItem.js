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
import Card from '../UI/Card';
import ReadMore from '../../Atoms/ReadMore';
import * as noteActions from '../../../Stores/Actions/Note';
import {noteItemStyle as styles} from './NoteItemStyle';

/** NOTE ITEM COMPONENT */
const NoteItem = (props) => {
  const dispatch = useDispatch();

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

  return (
    <Card style={styles.noteCard}>
      {/* ACTIONS BAR */}
      <View style={styles.actions}>
        <Text numberOfLines={1} style={styles.subtitle}>
          {props.title}
        </Text>

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
        <View style={[styles.alignText]}>
          <ReadMore longText={props.description} />
        </View>
      </ScrollView>
    </Card>
  );
};

export default NoteItem;
