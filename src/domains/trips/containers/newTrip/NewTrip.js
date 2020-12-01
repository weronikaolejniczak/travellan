import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';

import Budget from 'budget/models/Budget';
import BudgetField from 'common/components/budgetField/BudgetField';
import DatePicker from 'trips/components/datePicker/DatePicker';
import {createTrip} from 'state/trip/tripActions';
import {newTripStyle as styles} from './NewTripStyle';
import {CURRENCIES} from 'data/Currencies';
import Colors from 'constants/Colors';
import {addEventToCalendar} from '../../../../CalendarEventChandler'
import moment from 'moment';


const time_now = moment.utc()

const NewTrip = (props) => {
  const dispatch = useDispatch();

  const [destination, setDestination] = useState('');
  const [destinationIsValid, setDestinationIsValid] = useState(false);
  const [destinationSubmitted, setDestinationSubmitted] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);
  const [budget, setBudget] = useState();
  const [budgetIsValid, setBudgetIsValid] = useState(false);
  const [budgetIsEnabled, setBudgetIsEnabled] = useState(true);
  const [budgetSubmitted, setBudgetSubmitted] = useState(false);
  const [currency, setCurrency] = useState('');
  const [account, setAccount] = useState('card');

  const [isLoading, setIsLoading] = useState(false);

  

  let destinationRegex = new RegExp(
    "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$",
  );
  const destinationChangeHandler = (text) => {
    text.trim().length === 0 || !destinationRegex.test(text)
      ? setDestinationIsValid(false)
      : setDestinationIsValid(true);
    setDestination(text);
  };

 

  let budgetRegex = new RegExp('^\\d+(( \\d+)*|(,\\d+)*)(.\\d+)?$');
  const budgetChangeHandler = (text) => {
    if (budgetIsEnabled) {
      !(!budgetRegex.test(text) || text.trim().length === 0)
        ? setBudgetIsValid(true)
        : setBudgetIsValid(false);
      setBudget(text);
    }
  };

  const startDateChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDate(Platform.OS === 'ios');
    setStartDate(currentDate);
    currentDate > endDate ? setEndDate(currentDate) : '';
  };

  const endDateChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowEndDate(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const showDatePicker = (type) => {
    type === 'start' ? setShowStartDate(true) : setShowEndDate(true);
  };

  const clearBudget = () => {
    setBudget('0');
    setBudgetIsValid(true);
    setBudgetSubmitted(false);
  };

  const resetBudget = () => {
    setBudget();
    setBudgetIsValid(false);
  };

  const toggleBudgetSwitch = () => {
    setBudgetIsEnabled((previousState) => !previousState);
    !budgetIsEnabled ? resetBudget() : clearBudget();
  };


  const submitHandler = useCallback(async () => {
    let budgetToSubmit = [
      new Budget(
        0,
        parseInt(budget, 10),
        CURRENCIES.filter((item) => item.name === currency).length > 0
          ? CURRENCIES.filter(
              (item) => item.name === currency,
            )[0].iso.toString()
          : undefined,
        [
          {
            id: 0,
            title: 'Initial budget',
            value: parseInt(budget, 10),
            category: '',
            account: account.toString(),
            date: new Date(),
          },
        ],
        account.toString(), // default account
      ),
    ];

    if (!destinationIsValid || !budgetIsValid) {
      setDestinationSubmitted(true);
      if (budgetIsEnabled) {
        setBudgetSubmitted(true);
      }
    } else if (
      destinationIsValid &&
      budgetIsEnabled &&
      budgetIsValid &&
      CURRENCIES.filter((item) => item.name === currency).length === 1
    ) {
      setIsLoading(true);
      await dispatch(
        createTrip(
          destination,
          startDate.toString(),
          endDate.toString(),
          budgetToSubmit,
        ),
      );
      props.navigation.goBack();
      setIsLoading(false);
    } else if (destinationIsValid && !budgetIsEnabled) {
      setIsLoading(true);
      await dispatch(
        createTrip(
          destination,
          startDate.toString(),
          endDate.toString(),
          undefined,
        ),
      );
      props.navigation.goBack();
      setIsLoading(false);
    }

    let CalendarEventChandler = addEventToCalendar;
    CalendarEventChandler.addToCalendar("Trip to " + destination, startDate, endDate, destination, "Remember to pack everything and check weather forecast!")
  }, [
    budget,
    account,
    destinationIsValid,
    budgetIsValid,
    budgetIsEnabled,
    currency,
    dispatch,
    destination,
    startDate,
    endDate,
    props.navigation,
  ]);

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
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

      <DatePicker
        label={'Start date'}
        styles={styles}
        showDatePicker={() => showDatePicker('start')}
        date={startDate}
        showDate={showStartDate}
        minimumDate={Date.now()}
        dateChangeHandler={startDateChangeHandler}
      />

      <DatePicker
        label={'End date'}
        styles={styles}
        showDatePicker={() => showDatePicker('end')}
        date={endDate}
        showDate={showEndDate}
        minimumDate={startDate}
        dateChangeHandler={endDateChangeHandler}
      />

      <BudgetField
        label={'Budget'}
        styles={styles}
        showSwitch={true}
        toggleBudgetSwitch={toggleBudgetSwitch}
        budget={budget}
        budgetIsEnabled={budgetIsEnabled}
        budgetIsValid={budgetIsValid}
        budgetSubmitted={budgetSubmitted}
        budgetChangeHandler={budgetChangeHandler}
        currency={currency}
        currencyChangeHandler={setCurrency}
        account={account}
        setAccount={setAccount}
      />

      {isLoading ? (
        <View style={styles.smallMarginTop}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={submitHandler}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default NewTrip;
