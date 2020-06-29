import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  //Platform,
  //Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
/* IMPORTS FROM WITHIN THE MODULE */
import Card from '../UI/Card';
import ReadMore from '../../Components/UI/ReadMore';
import * as noteActions from '../../Stores/Actions/Note';
import {noteItemStyle as styles} from './NoteItemStyle';
//import Colors from '../../Constants/Colors';

// REFACTOR!
const NoteItem = (props) => {
  const dispatch = useDispatch();
  const submitHandler = useCallback(() => {
    dispatch(noteActions.deleteNote(props.tripId, props.id));
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
          <Icon name="md-trash" style={styles.icon} />
        </TouchableOpacity>
      </View>
      {/* NOTE CONTENT */}
      <ScrollView style={{marginTop: 50}}>
        <View style={[styles.alignText]}>
          <ReadMore longText={props.description} />
        </View>
      </ScrollView>
    </Card>
  );
};

export default NoteItem;
