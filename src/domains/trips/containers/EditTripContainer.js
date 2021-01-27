import React, { useCallback, useEffect, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import SplashScreen from 'react-native-splash-screen';
import {
  Button,
  ScrollView as Container,
  DateTimePicker,
  TextInput,
} from 'utils';
import { useDispatch } from 'react-redux';

import { addEventToCalendar, notificationManager } from 'services';
import { editTripRequest } from 'actions/tripsActions';

const EditTripContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const {
    accommodation,
    budget,
    currentDestination,
    currentEndDate,
    currentStartDate,
    map,
    notes,
    transport,
    tripId,
  } = route.params;

  const [destinationIsValid, setDestinationIsValid] = useState(true);
  const [destinationSubmitted, setDestinationSubmitted] = useState(false);
  const [destination, setDestination] = useState(currentDestination);
  const [startDate, setStartDate] = useState(new Date(currentStartDate));
  const [showStartDate, setShowStartDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date(currentEndDate));
  const [showEndDate, setShowEndDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const localNotify = notificationManager;
  const handleCalendarEvent = addEventToCalendar;

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

  const callNotification = useCallback(
    (dest, date) => {
      localNotify.configure();
      localNotify.cancelScheduledLocalNotification(5);
      const notificationDateTrigger = new Date(date);
      const currentDate = new Date();

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
    [localNotify],
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
  const adjustEndDateToStartDate = (currentDate) =>
    currentDate > endDate && setEndDate(currentDate);

  const submitHandler = useCallback(async () => {
    setIsLoading(true);

    if (!destinationIsValid) {
      setDestinationSubmitted(true);
    } else {
      await dispatch(
        editTripRequest(
          tripId,
          destination,
          startDate.toString(),
          endDate.toString(),
          budget,
          transport,
          accommodation,
          notes,
          map,
        ),
      );
      navigation.goBack();
      callNotification(destination, startDate);
      showSnackbar();
    }
    setIsLoading(false);
  }, [
    destinationIsValid,
    dispatch,
    tripId,
    destination,
    startDate,
    endDate,
    budget,
    transport,
    accommodation,
    notes,
    map,
    navigation,
    callNotification,
    showSnackbar,
  ]);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Container keyboardShouldPersistTaps="always">
      <TextInput
        label="City and country"
        value={destination}
        onChange={destinationChangeHandler}
        error={
          !destinationIsValid &&
          destinationSubmitted &&
          'Enter valid destination!'
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

      <Button loading={isLoading} disabled={isLoading} onPress={submitHandler}>
        Submit
      </Button>
    </Container>
  );
};

export default EditTripContainer;
