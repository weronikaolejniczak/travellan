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
/* imports from within the module */
import Budget from 'budget/models/Budget';
import BudgetField from 'common/components/budgetField/BudgetField';
import DatePicker from 'myTrips/components/datePicker/DatePicker';
import {createTrip} from 'myTrips/state/Actions';
import {newTripStyle as styles} from './NewTripStyle';
import {CURRENCIES} from 'data/Currencies';
import Colors from 'constants/Colors';

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
  const [currency, setCurrency] = useState('');
  const [account, setAccount] = useState('card');

  const [isLoading, setIsLoading] = useState(false);

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
  const submitHandler = useCallback(async () => {
    // if budget is enabled we define an array with given currency, else it's undefined
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

    // and if destination and budget are not valid
    if (!destinationIsValid || !budgetIsValid) {
      setDestinationSubmitted(true);
      // and if budget is enabled
      if (budgetIsEnabled) {
        setBudgetSubmitted(true);
      }
      // and if destination and budget are valid, budget is enabled and currency exists
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
      // else if destination is valid but budget is disabled
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

      {/* SUBMIT BUTTON */}
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
