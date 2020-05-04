/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, Text} from 'react-native';

const AddNote = (props) => {
  return (
    <ScrollView style={{backgroundColor: '#222222', flex: 1}}>
      <Text>Add Note</Text>
    </ScrollView>
  );
};

export default AddNote;