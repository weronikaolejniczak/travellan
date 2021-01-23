import React, { useCallback, useEffect, useRef, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import Budget from 'models/Budget';
import {
  Autocomplete,
  Button,
  ScrollView as Container,
  DateTimePicker,
  Paragraph,
} from 'utils';
import { BudgetPicker } from 'components';
import { CURRENCIES } from 'data/Currencies';
import {
  addEventToCalendar,
  autocompleteCity,
  notificationManager,
} from 'services';
import { compareStrings } from 'helpers';
import { createTripRequest } from 'actions/tripsActions';
import { CURRENCIES as currencies } from 'data/Currencies';
import { styles } from './AddTripContainerStyle';

const budgetRegex = new RegExp('^\\d+(( \\d+)*|(,\\d+)*)(.\\d+)?$');

// $todo: refactor validation, fix up
const AddTripContainer = ({ navigation }) => {
  const dispatch = useDispatch();
  const handleCalendarEvent = addEventToCalendar;
  const localNotify = notificationManager;
  const scrollViewRef = useRef();

  const [destination, setDestination] = useState('');
  const [destinationError, setDestinationError] = useState('');
  const [isFromAutocomplete, setIsFromAutocomplete] = useState(false);
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);
  const [budget, setBudget] = useState('');
  const [budgetValueError, setBudgetValueError] = useState(false);
  const [budgetIsEnabled, setBudgetIsEnabled] = useState(true);
  const [budgetSubmitted, setBudgetSubmitted] = useState(false);
  const [currency, setCurrency] = useState('');
  const [currencyError, setCurrencyError] = useState('');
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

  // $todo: refactor filter function to utility
  const filterDestinations = (input, destinations) =>
    destination === ''
      ? []
      : destinations
          .filter(
            (dest) =>
              dest.display_name.search(new RegExp(`${input.trim()}`, 'i')) >= 0,
          )
          .splice(0, 6);

  const filteredDestinations = filterDestinations(
    destination,
    autocompleteData,
  );

  const destinationData =
    filteredDestinations.length >= 1 &&
    compareStrings(destination, filteredDestinations[0].display_name)
      ? []
      : filteredDestinations;
  // $end

  // $todo: refactor filter function to utility
  const filterCurrencies = (input, currs) => {
    const inputRegex = new RegExp(`${input.trim()}`, 'i');
    return currency === ''
      ? []
      : currs
          .filter(
            (curr) =>
              curr.name.search(inputRegex) >= 0 ||
              curr.iso.search(inputRegex) >= 0,
          )
          .splice(0, 6);
  };

  const filteredCurrencies = filterCurrencies(currency, CURRENCIES);

  const currencyData =
    filteredCurrencies.length >= 1 &&
    compareStrings(currency, filteredCurrencies[0].name)
      ? []
      : filteredCurrencies;
  // $end

  const adjustEndDateToStartDate = (currentDate) =>
    currentDate > endDate && setEndDate(currentDate);

  const clearBudget = () => {
    setBudget('');
    setBudgetValueError('');
    setCurrencyError('');
    setBudgetSubmitted(false);
  };

  const resetBudget = () => {
    setBudget('');
    setBudgetValueError('');
    setCurrencyError('');
  };

  const toggleBudgetSwitch = () => {
    setBudgetIsEnabled((previousState) => !previousState);
    budgetIsEnabled ? clearBudget() : resetBudget();
  };

  const createBudget = useCallback(() => {
    const fittingCurrencies = currencies.filter(
      (item) => item.name === currency,
    );
    const fittingCurrenciesNumber = fittingCurrencies.length;

    if (
      !destinationError &&
      budgetIsEnabled &&
      budgetValueError &&
      fittingCurrenciesNumber === 1
    ) {
      return [
        new Budget(
          0,
          budget ? parseFloat(budget) : 0,
          fittingCurrenciesNumber > 0
            ? fittingCurrencies[0].iso.toString()
            : undefined,
          [
            {
              account: account.toString(),
              category: '',
              date: new Date(),
              id: 0,
              title: 'Initial budget',
              value: parseFloat(budget),
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
    budgetValueError,
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

  const validate = useCallback(() => {
    const destinationIsValid =
      !(destinationData.length > 0) && destination.length >= 3;
    const fittingCurrenciesNumber = currencies.filter(
      (item) => item.name === currency,
    ).length;
    let budgetIsValid = false;
    let currencyIsValid = false;

    if (budgetIsEnabled) {
      setBudgetSubmitted(true);

      if (!(!budgetRegex.test(budget) || budget.trim().length === 0)) {
        setBudgetValueError('');
        budgetIsValid = true;
      } else {
        setBudgetValueError('Budget value has to be a number!');
        budgetIsValid = false;
      }

      if (fittingCurrenciesNumber > 0) {
        setCurrencyError('');
        currencyIsValid = true;
      } else {
        setCurrencyError('Choose a currency from the list!');
        currencyIsValid = false;
      }
    } else {
      budgetIsValid = true;
      currencyIsValid = true;
    }

    destinationIsValid
      ? setDestinationError('')
      : setDestinationError('Choose an existing destination!');

    return destinationIsValid && budgetIsValid && currencyIsValid;
  }, [
    budget,
    budgetIsEnabled,
    currency,
    destination.length,
    destinationData.length,
  ]);

  const submitHandler = useCallback(async () => {
    const budgetToSubmit = createBudget();
    const dataIsValid = validate();

    if (dataIsValid) {
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
    validate,
    dispatch,
    destination,
    startDate,
    endDate,
    navigation,
    callNotification,
    showSnackbar,
  ]);

  const handleDestinationChange = (text) => {
    setDestination(text);
    setIsFromAutocomplete(false);
  };

  const onAutocompleteDestinationPress = (item) => {
    setDestinationError('');
    setDestination(`${item.address.name}, ${item.address.country}`);
    setAutocompleteData([]);
    setIsFromAutocomplete(true);
  };

  const autocompleteDestination = useCallback(async () => {
    if (destination.length > 3) {
      const result = await autocompleteCity(destination);
      setAutocompleteData(result);
    }
  }, [destination]);

  useEffect(() => {
    !isFromAutocomplete && autocompleteDestination();
  }, [autocompleteDestination, destination, isFromAutocomplete]);

  useEffect(() => {
    const fittingCurrenciesNumber = currencies.filter(
      (item) => item.name === currency,
    ).length;
    !!currencyError && fittingCurrenciesNumber === 1 && setCurrencyError('');
  }, [currency, currencyError]);

  useEffect(() => {
    !!budgetValueError && budget.match(budgetRegex) && setBudgetValueError('');
  }, [budget, budgetValueError]);

  useEffect(() => {
    if (filteredCurrencies.length > 0) scrollViewRef.current?.scrollToEnd();
  }, [filteredCurrencies]);

  return (
    <Container ref={scrollViewRef} keyboardShouldPersistTaps="always">
      <View style={styles.noticeWrapper}>
        <Paragraph style={styles.notice}>
          Adding a trip may last up to a minute!
        </Paragraph>
      </View>

      <Autocomplete
        data={destinationData}
        textInputLabel="City and/or country"
        query={destination}
        keyExtractor={(item) => item.osm_id.toString()}
        itemLabel={(item) => `${item.address.name}, ${item.address.country}`}
        onChange={handleDestinationChange}
        onPress={onAutocompleteDestinationPress}
        error={destinationError}
      />

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
        data={currencyData}
        query={currency}
        label="Budget"
        showSwitch
        toggleBudgetSwitch={toggleBudgetSwitch}
        budget={budget}
        budgetIsEnabled={budgetIsEnabled}
        budgetValueError={budgetValueError}
        budgetSubmitted={budgetSubmitted}
        handleBudgetValueChange={setBudget}
        currency={currency}
        handleCurrencyChange={setCurrency}
        account={account}
        currencyError={currencyError}
        setAccount={setAccount}
      />

      <View style={styles.submitWrapper}>
        <Button
          loading={isLoading}
          disabled={isLoading}
          onPress={submitHandler}
        >
          Submit
        </Button>
      </View>
    </Container>
  );
};

export default AddTripContainer;
