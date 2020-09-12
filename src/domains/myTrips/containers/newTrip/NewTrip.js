import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
/* imports from within the module */
import Budget from 'budget/models/Budget';
import BudgetField from 'myTrips/components/budgetField/BudgetField';
import DatePicker from 'myTrips/components/datePicker/DatePicker';
import {createTrip} from 'myTrips/state/Actions';
import {newTripStyle as styles} from './NewTripStyle';

/** new trip presentation component */
const NewTrip = (props) => {
  const dispatch = useDispatch();

  // destination
  const [destination, setDestination] = useState('');
  const [destinationIsValid, setDestinationIsValid] = useState(false);
  const [destinationSubmitted, setDestinationSubmitted] = useState(false);
  // dates
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);
  // budget
  const [budget, setBudget] = useState();
  const [budgetIsValid, setBudgetIsValid] = useState(false);
  const [budgetIsEnabled, setBudgetIsEnabled] = useState(true);
  const [budgetSubmitted, setBudgetSubmitted] = useState(false);
  const [currency, setCurrency] = useState('PLN');

  /** HANDLERS */
  // handle validity of destination
  let destinationRegex = new RegExp(
    "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$",
  );
  const destinationChangeHandler = (text) => {
    text.trim().length === 0 || !destinationRegex.test(text)
      ? setDestinationIsValid(false)
      : setDestinationIsValid(true);
    setDestination(text);
  };

  // handle validity of budget
  let budgetRegex = new RegExp('^\\d+(( \\d+)*|(,\\d+)*)(.\\d+)?$');
  const budgetChangeHandler = (text) => {
    if (budgetIsEnabled) {
      !(!budgetRegex.test(text) || text.trim().length === 0)
        ? setBudgetIsValid(true)
        : setBudgetIsValid(false);
      setBudget(text);
    }
  };

  /* date picker handlers */
  // handle start date change
  const startDateChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDate(Platform.OS === 'ios');
    setStartDate(currentDate);
    // set endDate to currentDate if it is earlier than the day selected for startDate
    currentDate > endDate ? setEndDate(currentDate) : '';
  };
  // handle end date change
  const endDateChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowEndDate(Platform.OS === 'ios');
    setEndDate(currentDate);
  };
  // show date picker
  const showDatePicker = (type) => {
    type === 'start' ? setShowStartDate(true) : setShowEndDate(true);
  };

  /* budget handlers */
  // clear budget
  const clearBudget = () => {
    setBudget('0');
    setBudgetIsValid(true);
    setBudgetSubmitted(false);
  };
  // reset the budget
  const resetBudget = () => {
    setBudget();
    setBudgetIsValid(false);
  };
  // toggle switch to enable/disable budget
  const toggleBudgetSwitch = () => {
    setBudgetIsEnabled((previousState) => !previousState);
    !budgetIsEnabled ? resetBudget() : clearBudget();
  };

  /* submit handler */
  const submitHandler = useCallback(() => {
    let budgetToSubmit = [
      new Budget(0, parseInt(budget, 10), currency, [
        {
          id: 0,
          title: 'Initial budget',
          value: parseInt(budget, 10),
          category: '',
          account: 'card',
          date: new Date(),
        },
      ]),
    ];

    if (!destinationIsValid || !budgetIsValid) {
      setDestinationSubmitted(true);
      if (budgetIsEnabled) {
        setBudgetSubmitted(true);
      }
    } else {
      dispatch(
        createTrip(
          destination,
          startDate.toString(),
          endDate.toString(),
          budgetToSubmit,
          undefined,
        ),
      );
      props.navigation.goBack();
    }
  }, [
    props.navigation,
    dispatch,
    destinationIsValid,
    budget,
    budgetIsValid,
    budgetIsEnabled,
    currency,
    destination,
    startDate,
    endDate,
  ]);

  return (
    <ScrollView style={styles.container}>
      {/* pick destination */}
      <View style={styles.smallMarginTop}>
        <Text style={styles.label}>Trip destination</Text>
        <TextInput
          style={styles.input}
          placeholder="City and/or country"
          placeholderTextColor="grey"
          value={destination}
          onChangeText={destinationChangeHandler}
        />
        {!destinationIsValid && destinationSubmitted && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Enter a valid city and/or country!</Text>
          </View>
        )}
      </View>

      {/* pick start date */}
      <DatePicker
        label={'Start date'}
        styles={styles}
        showDatePicker={() => showDatePicker('start')}
        date={startDate}
        showDate={showStartDate}
        minimumDate={Date.now()}
        dateChangeHandler={startDateChangeHandler}
      />

      {/* pick end date */}
      <DatePicker
        label={'End date'}
        styles={styles}
        showDatePicker={() => showDatePicker('end')}
        date={endDate}
        showDate={showEndDate}
        minimumDate={startDate}
        dateChangeHandler={endDateChangeHandler}
      />

      {/* BUDGET */}
      <BudgetField
        label={'Budget'}
        styles={styles}
        showSwitch={true}
        toggleBudgetSwitch={toggleBudgetSwitch}
        budgetIsEnabled={budgetIsEnabled}
        budget={budget}
        budgetChangeHandler={budgetChangeHandler}
        currency={currency}
        currencyChangeHandler={(text) => setCurrency(text)}
        budgetIsValid={budgetIsValid}
        budgetSubmitted={budgetSubmitted}
      />

      {/* SUBMIT BUTTON */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewTrip;
