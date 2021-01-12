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
import { styles } from '././EditTripContainerStyle';

const EditTripContainer = ({ route, navigation }) => {
  const tripId = route.params.tripId;
  const destination = route.params.destination;
  const budget = route.params.budget;
  console.log(tripId);
  console.log(destination);
  console.log(budget);
  return <Container keyboardShouldPersistTaps="always"></Container>;
};

export default EditTripContainer;
