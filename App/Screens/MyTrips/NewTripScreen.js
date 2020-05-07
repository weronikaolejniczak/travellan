import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
/**
 * IMPORTS FROM WITHIN THE MODULE
 */
import * as tripActions from '../../Stores/Actions/Trips';

/**
 * 'CREATING A TRIP' SCREEN
 */
const NewTripScreen = (props) => {
  const dispatch = useDispatch();
  const fetchImage = (url) => {};

  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');

  const submitHandler = useCallback(() => {
    dispatch(tripActions.createTrip(destination, startDate, endDate, budget));
    props.navigation.goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, destination, startDate, endDate, budget]);

  /**
   * This could be refactored into a component to minimize repetition.
   */
  return (
    <ScrollView style={styles.form}>
      <View style={styles.metrics}>
        <Text style={styles.label}>Where are you headed?</Text>
        <TextInput
          style={styles.input}
          value={destination}
          onChangeText={(text) => setDestination(text)}
        />
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>When do you want to go?</Text>
        <TextInput
          style={styles.input}
          value={startDate}
          onChangeText={(text) => setStartDate(text)}
        />
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>Until...?</Text>
        <TextInput
          style={styles.input}
          value={endDate}
          onChangeText={(text) => setEndDate(text)}
        />
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>What is your budget?</Text>
        <TextInput
          style={styles.input}
          value={budget}
          onChangeText={(text) => setBudget(text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

/**
 * TODO:
 * refactor Colors
 * refactor Fonts
 * refactor Metrics
 */
const styles = StyleSheet.create({
  form: {
    backgroundColor: '#222222',
    flex: 1,
  },
  metrics: {
    paddingVertical: 15,
  },
  label: {
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
  buttonContainer: {
    alignItems: 'center',
    margin: 20,
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

export default NewTripScreen;
