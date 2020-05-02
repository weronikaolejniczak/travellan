/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import HeaderButton from '../../Components/UI/HeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

/**
 * Dummy trips
 *  [int]               id, 
    [int]               ownerId, 
    [string]            destination, 
    [string]            imageUrl, 
    [date]              startDate,
    [date]              endDate
    [float]             budget,
    [list of strings]   notes,
    [dict]              transportInfo,
    [dict]              accommodationInfo,
    [dict of dict]      pointsOfInterest
 * 
 */

const NewTripScreen = (props) => {
  return (
    <ScrollView style={styles.form}>
      
        <View style={styles.label}>
          <Text style={{ color: '#FF8C00' }}>Id</Text>
          <TextInput style={styles.input}/>
        </View>
        <View style={styles.formControl}>
          <Text style={{ color: '#FF8C00' }}>OwnerId</Text>
          <TextInput style={styles.input}/>
        </View>
        <View style={{ backgroundColor: '#222222', flex: 1 }}>
          <Text style={{ color: '#FF8C00' }}>Destination</Text>
          <TextInput style={styles.input}/>
        </View>
        <View style={{ backgroundColor: '#222222', flex: 1 }}>
          <Text style={{ color: '#FF8C00' }}>image Url</Text>
          <TextInput style={styles.input}/>
        </View>
        <View style={{ backgroundColor: '#222222', flex: 1 }}>
          <Text style={{ color: '#FF8C00' }}>Start Date</Text>
          <TextInput style={styles.input}/>
        </View>
        <View style={{ backgroundColor: '#222222', flex: 1 }}>
          <Text style={{ color: '#FF8C00' }}>End Date</Text>
          <TextInput style={styles.input}/>
        </View>
        <View style={{ backgroundColor: '#222222', flex: 1 }}>
          <Text style={{ color: '#FF8C00' }}>Budget</Text>
          <TextInput style={styles.input}/>
        </View>
        <View style={{ backgroundColor: '#222222', flex: 1 }}>
          <Text style={{ color: '#FF8C00' }}>Notes</Text>
          <TextInput style={styles.input}/>
        </View>
        <View style={{ backgroundColor: '#222222', flex: 1 }}>
          <Text style={{ color: '#FF8C00' }}>Transpor Info</Text>
          <TextInput style={styles.input}/>
        </View>
        <View style={{ backgroundColor: '#222222', flex: 1 }}>
          <Text style={{ color: '#FF8C00' }}>Accommodation Info</Text>
          <TextInput style={styles.input}/>
        </View>
        <View style={{ backgroundColor: '#222222', flex: 1 }}>
          <Text style={{ color: '#FF8C00' }}>Points of Interest</Text>
          <TextInput style={styles.input}/>
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
    backgroundColor: '#222222', 
    flex: 1,
    fontFamily: 'open-sans-bold',
    marginVertical: 1,
    marginHorizontal: 1,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#FFA500",
    borderBottomWidth: 1,
    marginVertical: 2,
    marginHorizontal: 2,
    
  },

});

export default NewTripScreen;
