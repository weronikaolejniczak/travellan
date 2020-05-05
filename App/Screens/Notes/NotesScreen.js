/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Button,
} from 'react-native';
import {useSelector} from 'react-redux';
import { Icon, } from 'react-native-elements';

import NoteItem from '../../Components/MyTrips/NoteItem';




const NotesScreen = (props) => {
  
  const notes= useSelector(state => state.notes.availableNotes);

  return (
    <ScrollView style={{backgroundColor: '#222222', flex: 1}}>
      <View style={{alignItems: 'center', margin: 20}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Add Note');
          }}>
          <Text style={styles.buttonText}>Add New Note</Text>
        </TouchableOpacity>
      </View>
      <View>
        
        <FlatList
          data={notes}
          renderItem={(itemData) => (
            <NoteItem
            keyExtractor={(item) => item.title.toString()}
            title={itemData.item.title}
            description={itemData.item.description}
            >
            </NoteItem>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

export default NotesScreen;
