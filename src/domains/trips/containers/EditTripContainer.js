import React, { useCallback, useState, useEffect } from 'react';
import Snackbar from 'react-native-snackbar';
import { useDispatch } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  Button,
  ScrollView as Container,
  DateTimePicker,
  TextInput,
} from 'utils';
import { addEventToCalendar } from 'services/handleCalendarEvent';
import * as tripsActions from 'actions/tripsActions';
import { notificationManager } from 'services/manageNotifications';
import { styles } from '././EditTripContainerStyle';

const EditTripContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const tripId = route.params.tripId;
  const budget = route.params.budget;
  const notes = route.params.notes;
  const transport = route.params.transport;
  const accommodation = route.params.accommodation;
  const map = route.params.map;
  const [destinationIsValid, setDestinationIsValid] = useState(false);
  const [destinationSubmitted, setDestinationSubmitted] = useState(false);
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const localNotify = notificationManager;
  const handleCalendarEvent = addEventToCalendar;

  const callNotification = useCallback(
    (dest, date) => {
      localNotify.configure();
      localNotify.cancelScheduledLocalNotification(5);
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
    setIsLoading(true);
    if (!destinationIsValid) {
      setDestinationSubmitted(true);
    } else {
      await dispatch(
        tripsActions.editTripRequest(
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
    setIsLoading(false);
  }, [
    tripId,
    destination,
    startDate,
    endDate,
    budget,
    transport,
    accommodation,
    notes,
    map,
  ]);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Container keyboardShouldPersistTaps="always">
      <TextInput
        label={'City and/or country'}
        value={destination}
        onChange={destinationChangeHandler}
        error={
          !destinationIsValid &&
          destinationSubmitted &&
          'Enter valid city/country!'
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
