import React, { useCallback, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from 'constants/Colors';
import {
  Button,
  ScrollView as Container,
  DateTimePicker,
  TextInput,
} from 'utils';
import { addEventToCalendar } from 'services/handleCalendarEvent';
import { createTripRequest } from 'actions/tripsActions';
import { notificationManager } from 'services/manageNotifications';
import { styles } from './EditTripContainerStyle';

const EditTripContainer = ({ navigation }) => {
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
    if (!destinationIsValid) {
      setDestinationSubmitted(true);
    }
    if (destinationIsValid) {
      setIsLoading(true);
      await dispatch(
        createTripRequest(
          destination,
          startDate.toString(),
          endDate.toString(),
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
    destinationIsValid,
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

      <Button loading={isLoading} disabled={isLoading} onPress={submitHandler}>
        Submit
      </Button>
    </Container>
  );
};

export default EditTripContainer;
