import React, { useCallback, useState, useEffect } from 'react';
import Snackbar from 'react-native-snackbar';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Colors from 'constants/Colors';
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
import Budget from 'models/Budget';

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
  const [destination, setDestination] = useState(route.params.description);
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    if (budget === undefined) {
      await dispatch(
        tripsActions.editTripRequest(
          tripId,
          destination,
          startDate.toString(),
          endDate.toString(),
          undefined,
          transport,
          accommodation,
          notes,
          map,
        ),
      );
    } else {
      const budgetToSubmit = [
        new Budget(
          budget[0].id,
          budget[0].value,
          budget[0].currency,
          [
            {
              account: budget[0].history[0].account,
              category: budget[0].history[0].category,
              date: budget[0].history[0].date,
              id: budget[0].history[0].id,
              title: budget[0].history[0].title,
              value: budget[0].history[0].value,
            },
          ],
          budget[0].defaultAccount,
        ),
      ];
      await dispatch(
        tripsActions.editTripRequest(
          tripId,
          destination,
          startDate.toString(),
          endDate.toString(),
          budgetToSubmit,
          transport,
          accommodation,
          notes,
          map,
        ),
      );
    }
    navigation.goBack();
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
