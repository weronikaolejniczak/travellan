/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, Platform, Alert} from 'react-native';
import {
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import Colors from '../../Constants/Colors';
import {noteItemStyle as styles} from './NoteItemStyle';
import Card from '../../Components/UI/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import * as noteActions from '../../Stores/Actions/Note'

// REFACTOR!

//TODO
// READMORE COMPONENT

const NoteItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version > 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const dispatch = useDispatch();
  const submitHandler = useCallback(() => {
    dispatch(noteActions.deleteNote(props.tripId, props.id));
  }, [dispatch, props.tripId, props.id]);

  return (
    <Card style={styles.noteCard}>
      <View style={styles.actions}>
        <Text numberOfLines={1} style={styles.subtitle}>
          {props.title}
        </Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Edit note');
          }}>
          <Icon name="md-brush" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={submitHandler}>
          <Icon name="md-trash" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginTop: 50}}>
        <View style={[styles.allignText]}>
          <Text style={styles.text}>{props.description}</Text>
        </View>
      </ScrollView>
    </Card>
  );
};

export default NoteItem;
