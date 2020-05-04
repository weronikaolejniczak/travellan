/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import { ScrollView, Text, TouchableOpacity,View, StyleSheet, FlatList } from 'react-native';
import {useDispatch} from 'react-redux';
import NOTES from '../../Data/DummyNote';

const NotesScreen = (props) => {
  const notes= NOTES;
  const dispatch = useDispatch();
  const submitHandler = useCallback(() => {
    
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#222222', flex: 1 }}>
      <View style={{ alignItems: 'center', margin: 20 }}>
        <TouchableOpacity style={styles.button} onPress={() => {props.navigation.navigate('Add Note');}}>
          <Text style={styles.buttonText}>Add New Note</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList data={notes} 
          renderItem={ ({item}) => (
            <Text style={styles.button}>{item.title}{item.description}</Text>
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
