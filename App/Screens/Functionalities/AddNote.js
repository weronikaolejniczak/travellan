/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback } from 'react';
import {ScrollView, Text, StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import * as noteActions from '../../Stores/Actions/Note';


const AddNote = (props) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const submitHandler = useCallback(() => {
        dispatch(noteActions.createNote(title,description));
      },  [dispatch, title,description]);

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

const styles = StyleSheet.create({
    form: {
      backgroundColor: '#222222',
      flex: 1,
    },
    label: {
      fontFamily: 'open-sans-bold',
      marginRight: '10%',
      marginLeft: '10%',
      marginTop: '5%',
      color: '#FF8C00',
      fontSize: 20,
      fontWeight: 'bold',
    },
    input: {
      color: '#FFFFFF',
      fontSize: 20,
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: '#FFA500',
      borderBottomWidth: 1,
      marginVertical: 2,
      marginHorizontal: 2,
      marginLeft: '10%',
      marginRight: '10%',
    },
    button: {
      borderRadius: 10,
      backgroundColor: '#FF8C00',
      alignItems: 'center',
      width: '40%',
      padding: 15,
      margin: 10,
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#FFFFFF',
    },
  });
  

export default AddNote;