import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import * as tripActions from '../../Stores/Actions/Trips';
import {newTripScreenStyle as styles} from './NewTripScreenStyle';

/** 'CREATE A NEW TRIP' SCREEN - here a user can input basic information to create a new trip
 * TODO:
 * refactor repeating elements into reusable components
 */
const NewTripScreen = (props) => {
  const dispatch = useDispatch();

  /**
   * state variables and state setter functions
   */
  const [submitted, setSubmitted] = useState(false);

  const [destination, setDestination] = useState('');
  const [destinationIsValid, setDestinationIsValid] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [startDateIsValid, setStartDateIsValid] = useState(false);

  const [endDate, setEndDate] = useState('');
  const [endDateIsValid, setEndDateIsValid] = useState(false);

  const [budget, setBudget] = useState('');
  const [budgetIsValid, setBudgetIsValid] = useState(false);

  /**
   * handlers
   */
  const submitHandler = useCallback(() => {
    if (
      !destinationIsValid ||
      !startDateIsValid ||
      !endDateIsValid ||
      !budgetIsValid
    ) {
      setSubmitted(true);
    } else {
      dispatch(tripActions.createTrip(destination, startDate, endDate, budget));
      props.navigation.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, destination, startDate, endDate, budget]);

  /**
   * refactor handlers with condition and setters functions
   */
  let destinationRegex = new RegExp(
    "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$",
  );
  const destinationChangeHandler = (text) => {
    text.trim().length === 0 || !destinationRegex.test(text)
      ? setDestinationIsValid(false)
      : setDestinationIsValid(true);
    setDestination(text);
  };

  // from ->
  const startDateChangeHandler = (text) => {
    text.trim().length === 0
      ? setStartDateIsValid(false)
      : setStartDateIsValid(true);
    setStartDate(text);
  };
  // until <-
  const endDateChangeHandler = (text) => {
    text.trim().length === 0
      ? setEndDateIsValid(false)
      : setEndDateIsValid(true);
    setEndDate(text);
  };

  // let budgetRegex = new RegExp();
  const budgetChangeHandler = (text) => {
    text.trim().length === 0 ? setBudgetIsValid(false) : setBudgetIsValid(true);
    setBudget(text);
  };

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
          onChangeText={destinationChangeHandler}
        />
        {!destinationIsValid && submitted && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Enter a valid city and/or country!</Text>
          </View>
        )}
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>When?</Text>
        <TextInput
          style={styles.input}
          value={startDate}
          onChangeText={startDateChangeHandler}
        />
        {!startDateIsValid && submitted && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Enter a valid date! (yyyy-mm-dd)</Text>
          </View>
        )}
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>Until...?</Text>
        <TextInput
          style={styles.input}
          value={endDate}
          onChangeText={endDateChangeHandler}
        />
        {!endDateIsValid && submitted && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Enter a valid date! (yyyy-mm-dd)</Text>
          </View>
        )}
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>What is your budget?</Text>
        <TextInput
          style={styles.input}
          value={budget}
          onChangeText={budgetChangeHandler}
        />
        {!budgetIsValid && submitted && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Enter a valid budget!</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewTripScreen;
