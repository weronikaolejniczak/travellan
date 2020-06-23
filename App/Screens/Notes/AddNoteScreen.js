import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import * as noteActions from '../../Stores/Actions/Note';
import {newNoteScreenStyle as styles} from './AddNoteScreenStyle';

const AddNote = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = useCallback(() => {
    dispatch(noteActions.createNote(tripId, title, description));
    props.navigation.goBack();
  }, [props.navigation, dispatch, tripId, title, description]);

  return (
    <ScrollView style={styles.form}>
      {/* TITLE INPUT */}
      <View style={{paddingVertical: 15}}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      {/* DESCRIPTION INPUT */}
      <View style={{paddingVertical: 15}}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
        />
      </View>
      {/* SUBMIT BUTTON */}
      <View style={{alignItems: 'center', margin: 20}}>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddNote;
