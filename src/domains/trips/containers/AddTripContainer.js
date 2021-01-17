import React, { useCallback, useEffect, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';

import Budget from 'models/Budget';
import {
  Autocomplete,
  Button,
  ScrollView as Container,
  DateTimePicker,
} from 'utils';
import { BudgetPicker } from 'components';
import { DUMMY_DESTINATIONS } from 'data/DummyDestinations';
import {
  addEventToCalendar,
  autocompleteCity,
  notificationManager,
} from 'services';
import { createTripRequest } from 'actions/tripsActions';
import { CURRENCIES as currencies } from 'data/Currencies';
import { styles } from './AddTripContainerStyle';

// $todo: refactor validation, fix up
const AddTripContainer = ({ navigation }) => {
  const dispatch = useDispatch();
  const handleCalendarEvent = addEventToCalendar;
  const localNotify = notificationManager;

  const [destination, setDestination] = useState('');
  const [destinationError, setDestinationError] = useState('');
  const [autocompleteData, setAutocompleteData] = useState([]);
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

  const callNotification = useCallback(
    (dest, date) => {
      localNotify.configure();
      const notificationDateTrigger = new Date();
      const currentDate = new Date(Date.now());
      notificationDateTrigger.setDate(date.getDate() - 1);

      if (date.getDate() <= currentDate.getDate()) {
        return localNotify.scheduleNotification(
          'DepartureAlert',
          5,
          'Journey to ' + dest + ' starts today!',
          'We wish you a great trip!',
          {},
          {},
          notificationDateTrigger,
        );
      } else {
        return localNotify.scheduleNotification(
          'DepartureAlert',
          5,
          'Journey to ' + destination + ' starts tomorrow!',
          'We wish you a great trip!',
          {},
          {},
          notificationDateTrigger,
        );
      }
    },
    [destination, localNotify],
  );

  const filterDestinations = (input, destinations) =>
    destination === ''
      ? []
      : destinations
          .filter(
            (dest) =>
              dest.display_name.search(new RegExp(`${input.trim()}`, 'i')) >= 0,
          )
          .splice(0, 6);

  const compare = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

  const filteredDestinations = filterDestinations(
    destination,
    autocompleteData,
  );

  const destinationData =
    filteredDestinations.length >= 1 &&
    compare(destination, filteredDestinations[0].display_name)
      ? []
      : filteredDestinations;

  const budgetRegex = new RegExp('^\\d+(( \\d+)*|(,\\d+)*)(.\\d+)?$');
  const handleBudgetChange = (text) => {
    if (budgetIsEnabled) {
      !(!budgetRegex.test(text) || text.trim().length === 0)
        ? setBudgetIsValid(true)
        : setBudgetIsValid(false);
      setBudget(text);
    }
  };

  const adjustEndDateToStartDate = (currentDate) =>
    currentDate > endDate && setEndDate(currentDate);

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

  const createBudget = useCallback(() => {
    if (
      !destinationError &&
      budgetIsEnabled &&
      budgetIsValid &&
      currencies.filter((item) => item.name === currency).length === 1
    ) {
      return [
        new Budget(
          0,
          parseInt(budget, 10),
          currencies.filter((item) => item.name === currency).length > 0
            ? currencies
                .filter((item) => item.name === currency)[0]
                .iso.toString()
            : undefined,
          [
            {
              account: account.toString(),
              category: '',
              date: new Date(),
              id: 0,
              title: 'Initial budget',
              value: parseInt(budget, 10),
            },
          ],
          account.toString(),
        ),
      ];
    } else if (!!destinationError && !budgetIsEnabled) {
      return undefined;
    }
  }, [
    account,
    budget,
    budgetIsEnabled,
    budgetIsValid,
    currency,
    destinationError,
  ]);

  const showSnackbar = useCallback(
    () =>
      Snackbar.show({
        action: {
          onPress: () => {
            handleCalendarEvent.addToCalendar(
              'Trip to ' + destination,
              startDate,
              endDate,
              destination,
              'Remember to pack everything and check weather forecast!',
            );
          },
          text: 'Add',
          textColor: 'orange',
        },
        duration: Snackbar.LENGTH_LONG,
        text: 'Add Trip to Google Calendar',
      }),
    [destination, endDate, handleCalendarEvent, startDate],
  );

  const submitHandler = useCallback(async () => {
    const budgetToSubmit = createBudget();
    const destinationIsValid = !(destinationData.length > 0);
    budgetIsEnabled && setBudgetSubmitted(true);

    destinationIsValid
      ? setDestinationError('')
      : setDestinationError('Choose a destination!');

    if (destinationIsValid && budgetIsValid) {
      setIsLoading(true);

      await dispatch(
        createTripRequest(
          destination,
          startDate.toString(),
          endDate.toString(),
          budgetToSubmit,
        ),
      );

      navigation.goBack();
      callNotification(destination, startDate);
      showSnackbar();

      setIsLoading(false);
    }
  }, [
    createBudget,
    budgetIsValid,
    destinationData.length,
    budgetIsEnabled,
    dispatch,
    destination,
    startDate,
    endDate,
    navigation,
    callNotification,
    showSnackbar,
  ]);

  const autocompleteDestination = useCallback(async () => {
    if (destination.length >= 3) {
      const result = await autocompleteCity(destination);
      setAutocompleteData(result);
    }
  }, [destination]);

  useEffect(() => {
    autocompleteDestination();
  }, [autocompleteDestination, destination]);

  return (
    <Container keyboardShouldPersistTaps="always">
      <Autocomplete
        data={destinationData}
        textInputLabel="City and/or country"
        query={destination}
        keyExtractor={(item) => item.osm_id.toString()}
        itemLabel={(item) => `${item.address.name}, ${item.address.country}`}
        onChange={setDestination}
        onPress={(item) => {
          setDestinationError('');
          setDestination(`${item.address.name}, ${item.address.country}`);
        }}
        error={destinationError} // $fix
      />
      {!!destinationError && (
        <Text style={styles.error}>{destinationError}</Text>
      )}

      <DateTimePicker
        label="Start date"
        setShowPicker={setShowStartDate}
        date={startDate}
        showPicker={showStartDate}
        minimumDate={Date.now()}
        setDate={setStartDate}
        adjustDate={adjustEndDateToStartDate}
      />

      <DateTimePicker
        label="End date"
        setShowPicker={setShowEndDate}
        date={endDate}
        showPicker={showEndDate}
        minimumDate={startDate}
        setDate={setEndDate}
      />

      <BudgetPicker
        label="Budget"
        showSwitch
        toggleBudgetSwitch={toggleBudgetSwitch}
        budget={budget}
        budgetIsEnabled={budgetIsEnabled}
        budgetIsValid={budgetIsValid}
        budgetSubmitted={budgetSubmitted}
        handleBudgetChange={handleBudgetChange}
        currency={currency}
        currencyChangeHandler={setCurrency}
        account={account}
        setAccount={setAccount}
      />

      <Button loading={isLoading} disabled={isLoading} onPress={submitHandler}>
        Submit
      </Button>
    </Container>
  );
};

export default AddTripContainer;
