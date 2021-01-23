import React, { useCallback, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { useDispatch } from 'react-redux';

import Budget from 'models/Budget';

import { BudgetPicker } from 'components';
import {
  Button,
  ScrollView as Container,
  DateTimePicker,
  TextInput,
} from 'utils';
import { CURRENCIES } from 'data/Currencies';
import { addEventToCalendar } from 'services/handleCalendarEvent';
import { createTripRequest } from 'actions/tripsActions';
import { notificationManager } from 'services/manageNotifications';

const AddTripContainer = ({ navigation }) => {
  const dispatch = useDispatch();
  const handleCalendarEvent = addEventToCalendar;
  const localNotify = notificationManager;

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

  const callNotification = useCallback(
    (dest, date) => {
      localNotify.configure();
      const notificationDateTrigger = new Date(date);
      const currentDate = new Date();
      console.log(currentDate);

      if (
        notificationDateTrigger.toDateString() === currentDate.toDateString()
      ) {
        return localNotify.scheduleNotification(
          'DepartureAlert',
          5,
          'Journey to ' + dest + ' starts today!',
          'We wish you a great trip!',
          {},
          {},
          notificationDateTrigger,
        );
      } else if (
        notificationDateTrigger.getDay() - 1 === currentDate.getDay() &&
        notificationDateTrigger.getMonth() === currentDate.getMonth() &&
        notificationDateTrigger.getFullYear() === currentDate.getFullYear()
      ) {
        const notificationDate = new Date(notificationDateTrigger);
        notificationDate.setDate(notificationDate.getDate() - 1);
        return localNotify.scheduleNotification(
          'DepartureAlert',
          5,
          'Journey to ' + dest + ' starts tomorrow!',
          'We wish you a great trip!',
          {},
          {},
          notificationDate,
        );
      } else if (
        notificationDateTrigger.getDay() - 1 > currentDate.getDay() &&
        notificationDateTrigger.getTime() > currentDate.getTime()
      ) {
        return localNotify.scheduleNotification(
          'DepartureAlert',
          5,
          'Journey to ' + dest + ' starts today!',
          'We wish you a great trip!',
          {},
          {},
          notificationDateTrigger,
        );
      }
    },
    [destination, localNotify],
  );

  const destinationRegex = new RegExp(
    `^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$`,
  );
  const destinationChangeHandler = (text) => {
    text.trim().length === 0 || !destinationRegex.test(text)
      ? setDestinationIsValid(false)
      : setDestinationIsValid(true);
    setDestination(text);
  };

  const budgetRegex = new RegExp('^\\d+(( \\d+)*|(,\\d+)*)(.\\d+)?$');
  const budgetChangeHandler = (text) => {
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

  const submitHandler = useCallback(async () => {
    const budgetToSubmit = [
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
        createTripRequest(
          destination,
          startDate.toString(),
          endDate.toString(),
          budgetToSubmit,
        ),
      );
      navigation.goBack();
      setIsLoading(false);
      callNotification(destination, startDate);
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
      });
    } else if (destinationIsValid && !budgetIsEnabled) {
      setIsLoading(true);
      await dispatch(
        createTripRequest(
          destination,
          startDate.toString(),
          endDate.toString(),
          undefined,
        ),
      );
      navigation.goBack();
      setIsLoading(false);
      callNotification(destination, startDate);
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
      });
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
    navigation,
    callNotification,
    handleCalendarEvent,
  ]);

  return (
    <Container keyboardShouldPersistTaps="always">
      <TextInput
        label="City and/or country"
        value={destination}
        onChange={destinationChangeHandler}
        error={
          !destinationIsValid &&
          destinationSubmitted &&
          'Enter a valid city and/or country!'
        }
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
        label="Budget"
        showSwitch
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

      <Button loading={isLoading} disabled={isLoading} onPress={submitHandler}>
        Submit
      </Button>
    </Container>
  );
};

export default AddTripContainer;
