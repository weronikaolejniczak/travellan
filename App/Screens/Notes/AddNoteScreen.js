/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import * as noteActions from '../../Stores/Actions/Note';
import {newNoteScreenStyle as styles} from './AddNoteScreenStyle';

const AddNote = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = useCallback(() => {
    dispatch(noteActions.createNote(title, description));
  }, [dispatch, title, description]);

  return (
    <ScrollView style={styles.form}>
      <View style={{paddingVertical: 15}}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View style={{paddingVertical: 15}}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
      <View style={{alignItems: 'center', margin: 20}}>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddNote;
