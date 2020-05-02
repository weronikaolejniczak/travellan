/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import HeaderButton from '../../Components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


const NewTripScreen = (props) => {
  const [id, setId] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [destination, setDestination] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');
  const [transportInfo, setTransportInfo] = useState('');
  const [accommodationInfo, setAccommodationInfo] = useState('');
  const [pointsOfInterest, setPointsOfInterest] = useState('');

  const submitHandler = useCallback(() => {
    console.log("Submitting");
  }, [])


  return (
    <ScrollView style={styles.form}>

      <View>
        <Text style={styles.label}>Id</Text>
        <TextInput style={styles.input} value={id} onChangeText={text => setId(text)} />
      </View>
      <View>
        <Text style={styles.label}>OwnerId</Text>
        <TextInput style={styles.input} value={ownerId} onChangeText={text => setOwnerId(text)} />
      </View>
      <View>
        <Text style={styles.label}>Destination</Text>
        <TextInput style={styles.input} value={destination} onChangeText={text => setDestination(text)} />
      </View>
      <View>
        <Text style={styles.label}>image Url</Text>
        <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)} />
      </View>
      <View>
        <Text style={styles.label}>Start Date</Text>
        <TextInput style={styles.input} value={startDate} onChangeText={text => setStartDate(text)} />
      </View>
      <View>
        <Text style={styles.label}>End Date</Text>
        <TextInput style={styles.input} value={endDate} onChangeText={text => setEndDate(text)} />
      </View>
      <View>
        <Text style={styles.label}>Budget</Text>
        <TextInput style={styles.input} value={budget} onChangeText={text => setBudget(text)} />
      </View>
      <View>
        <Text style={styles.label}>Notes</Text>
        <TextInput style={styles.input} value={notes} onChangeText={text => setNotes(text)} />
      </View>
      <View>
        <Text style={styles.label}>Transport Info</Text>
        <TextInput style={styles.input} value={transportInfo} onChangeText={text => setTransportInfo(text)} />
      </View>
      <View>
        <Text style={styles.label}>Accommodation Info</Text>
        <TextInput style={styles.input} value={accommodationInfo} onChangeText={text => setAccommodationInfo(text)} />
      </View>
      <View>
        <Text style={styles.label}>Points of Interest</Text>
        <TextInput style={styles.input} value={pointsOfInterest} onChangeText={text => setPointsOfInterest(text)} />
      </View>
      <View style={styles.justifyRow}>
        <TouchableOpacity style={styles.button} onPress={() => { }}>
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
    backgroundColor: '#222222',
    flex: 1,
    fontFamily: 'open-sans-bold',
    marginRight: '10%',
    marginLeft: '10%',
    marginTop: "5%",
    color: '#FF8C00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#FFA500",
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
  justifyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

});




export default NewTripScreen;
