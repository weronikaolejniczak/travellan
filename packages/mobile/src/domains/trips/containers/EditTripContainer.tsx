import React, { useCallback, useEffect, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';
import {
  Autocomplete,
  Button,
  ScrollView as Container,
  DateTimePicker,
} from 'utils';

import { editTripRequest } from 'actions/tripsActions';
import { compareStrings } from 'helpers';
import {
  addEventToCalendar,
  autocompleteCity,
  notificationManager,
} from 'services';

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

  const [destination, setDestination] = useState(currentDestination);
  const [destinationError, setDestinationError] = useState('');
  const [isFromAutocomplete, setIsFromAutocomplete] = useState(false);
  const [autocompleteData, setAutocompleteData] = useState([]);
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

  const adjustEndDateToStartDate = (currentDate) =>
    currentDate > endDate && setEndDate(currentDate);

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

  const validate = useCallback(() => {
    const destinationIsValid =
      !(destinationData.length > 0) && destination.length >= 3;

    destinationIsValid
      ? setDestinationError('')
      : setDestinationError('Choose an existing destination!');

    return destinationIsValid;
  }, [destination.length, destinationData.length]);

  const submitHandler = useCallback(async () => {
    const dataIsValid = validate();

    if (dataIsValid) {
      setIsLoading(true);

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

      setIsLoading(false);
    }
  }, [
    validate,
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
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    !isFromAutocomplete && autocompleteDestination();
  }, [autocompleteDestination, destination, isFromAutocomplete]);

  return (
    <Container keyboardShouldPersistTaps="always">
      <Autocomplete
        data={destinationData}
        textInputLabel="City and country"
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

      <Button loading={isLoading} disabled={isLoading} onPress={submitHandler}>
        Submit
      </Button>
    </Container>
  );
};

export default EditTripContainer;
