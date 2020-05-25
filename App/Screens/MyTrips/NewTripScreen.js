import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import HeaderButton from '../../Components/UI/HeaderButton';
import * as tripActions from '../../Stores/Actions/Trips';
import {newTripScreenStyle as styles} from './NewTripScreenStyle';

/** 'CREATE A NEW TRIP' SCREEN - here a user can input basic information to create a new trip
 * TODO:
 * refactor repeating elements into reusable components
 */
const NewTripScreen = (props) => {
  const dispatch = useDispatch();

  /** state variables and state setter functions */
  const [submitted, setSubmitted] = useState(false);

  const [destination, setDestination] = useState('');
  const [destinationIsValid, setDestinationIsValid] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);

  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);

  const [budget, setBudget] = useState('');
  const [budgetIsValid, setBudgetIsValid] = useState(false);

  /** handlers */
  const submitHandler = useCallback(() => {
    if (!destinationIsValid || !budgetIsValid) {
      setSubmitted(true);
    } else {
      dispatch(
        tripActions.createTrip(
          destination,
          startDate.toString(),
          endDate.toString(),
          budget,
        ),
      );
      props.navigation.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, destination, startDate, endDate, budget]);

  /** refactor handlers with condition and setters functions */
  let destinationRegex = new RegExp(
    "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$",
  );
  const destinationChangeHandler = (text) => {
    text.trim().length === 0 || !destinationRegex.test(text)
      ? setDestinationIsValid(false)
      : setDestinationIsValid(true);
    setDestination(text);
  };

  /** date picker handlers */
  const startDateChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDate(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const showStartDatepicker = () => {
    setShowStartDate(true);
  };

  const endDateChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowEndDate(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const showEndDatepicker = () => {
    setShowEndDate(true);
  };

  // let budgetRegex = new RegExp();
  const budgetChangeHandler = (text) => {
    text.trim().length === 0 ? setBudgetIsValid(false) : setBudgetIsValid(true);
    setBudget(text);
  };

  /** this could be refactored into a component to minimize repetition
   *
   * IMPORTANT NOTE!
   * for datepicker, if startDate is assigned a date, endDate cannot have for
   * a value an earlier date, BUT if we if we reassign a later than endDate
   * date to startDate and don't press the TouchableOpacity for triggering
   * endDatepicker, then endDate will have as its value a date earlier than
   * startDate will
   */
  return (
    <ScrollView style={styles.form}>
      <View style={styles.metrics}>
        <Text style={styles.label}>Where are you headed?</Text>
        <TextInput
          style={styles.input}
          placeholder="City and/or country"
          placeholderTextColor="grey"
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
        <Text style={styles.label}>From</Text>
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={showStartDatepicker} style={styles.picker}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Icon name="md-calendar" style={styles.icon} />
              <Text style={styles.pickerText}>
                {startDate.toString().split(' ').slice(1, 4).join(' ')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {showStartDate && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={startDate}
            minimumDate={Date.now()}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={startDateChangeHandler}
          />
        )}
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>until</Text>
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={showEndDatepicker} style={styles.picker}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Icon name="md-calendar" style={styles.icon} />
              <Text style={styles.pickerText}>
                {endDate.toString().split(' ').slice(1, 4).join(' ')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {showEndDate && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={endDate}
            minimumDate={startDate}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={endDateChangeHandler}
          />
        )}
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>What is your budget?</Text>
        <TextInput
          style={styles.input}
          placeholder="Number"
          placeholderTextColor="grey"
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

/** we export newTripScreenOptions to use in our Stack.Navigator */
export const newTripScreenOptions = () => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create a trip"
          style={{marginRight: 3}}
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={() => {}} // SUBMIT
        />
      </HeaderButtons>
    ),
  };
};

export default NewTripScreen;
