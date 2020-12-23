import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as transportActions from 'actions/transportActions';
import { styles } from './AddTransportContainerStyle';
import Colors from 'constants/Colors';

const AddTransportContainer = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const initialMinutes =
    new Date().getMinutes() < 10
      ? '0' + new Date().getMinutes()
      : new Date().getMinutes();
  const initialHour = new Date().getHours() + ':' + initialMinutes;

  const [isTicketTo, setToDestination] = useState(true);
  const [isTicketFrom, setFromDestination] = useState(false);
  const [QR, setQR] = useState('');
  const [PDFUri, setPDFUri] = useState('');
  const [dateOfDeparture, setDateOfDeparture] = useState(new Date());
  const [showDateOfDeparture, setShowDateOfDeparture] = useState(false);
  const [hourOfDeparture, setHourOfDeparture] = useState(initialHour);
  const [showHourOfDeparture, setShowHourOfDeparture] = useState(false);
  const [placeOfDeparture, setPlaceOfDeparture] = useState('');
  const [placeOfDepartureIsValid, setFromPlaceIsValid] = useState(false);
  const [fromPlaceSubmitted, setFromPlaceSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const cutDate = (date) => date.toString().split(' ').slice(1, 4).join(' ');

  const cutHour = (hour) =>
    hour.toTimeString().split(' ')[0].split(':').slice(0, 2).join(':');

  /* gODZINA SIĘ NIE ZGADZA - O DWIE GODZINY ZA DUŻO */
  const prepareDate = (date, hour) => {
    let hours = hour.split(':')[0];
    let minutes = hour.split(':')[1];
    return new Date(
      `${date.getUTCFullYear()}-${
        date.getUTCMonth() + 1
      }-${date.getUTCDate()}T${hours}:${minutes}:00`,
    ).toString();
  };

  const toggleToDestinationSwitch = () => {
    setToDestination((previousState) => !previousState);
    setFromDestination((previousState) => !previousState);
  };

  const toggleFromDestinationSwitch = () => {
    setFromDestination((previousState) => !previousState);
    setToDestination((previousState) => !previousState);
  };

  let addressRegex = new RegExp('');
  const placeChangeHandler = (text) => {
    text.trim().length === 0 || !addressRegex.test(text)
      ? setFromPlaceIsValid(false)
      : setFromPlaceIsValid(true);
    setPlaceOfDeparture(text);
  };

  const dateOfDepartureChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfDeparture;
    setShowDateOfDeparture(Platform.OS === 'ios');
    setDateOfDeparture(currentDate);
  };

  const showDateOfDeparturePicker = () => {
    setShowDateOfDeparture(true);
  };

  const hourOfDepartureChangeHandler = (event, selectedHour) => {
    const currentHour = selectedHour || hourOfDeparture;
    setShowHourOfDeparture(Platform.OS === 'ios');
    setHourOfDeparture(cutHour(currentHour));
  };

  const showHourOfDeparturePicker = () => {
    setShowHourOfDeparture(true);
  };

  const submitHandler = useCallback(async () => {
    setIsLoading(true);
    await dispatch(
      transportActions.createTransportRequest(
        tripId,
        isTicketTo,
        isTicketFrom,
        prepareDate(dateOfDeparture, hourOfDeparture),
        placeOfDeparture,
        QR,
        PDFUri,
      ),
    );
    setIsLoading(false);
    props.navigation.navigate('Transport', {
      tripId: selectedTrip.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tripId,
    isTicketTo,
    isTicketFrom,
    dateOfDeparture,
    hourOfDeparture,
    placeOfDeparture,
    QR,
    PDFUri,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.metrics}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={[
                styles.label,
                isTicketTo ? styles.activeLabel : styles.disactiveLabel,
              ]}
            >
              to
            </Text>
            <TouchableOpacity onPress={toggleToDestinationSwitch}>
              <Icon
                name={isTicketTo ? 'radiobox-marked' : 'radiobox-blank'}
                style={[
                  isTicketTo
                    ? styles.activeRadioIcon
                    : styles.nonactiveRadioIcon,
                ]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: '5%', alignItems: 'center' }}>
            <Text
              style={[
                styles.label,
                isTicketFrom ? styles.activeLabel : styles.disactiveLabel,
              ]}
            >
              from
            </Text>
            <TouchableOpacity onPress={toggleFromDestinationSwitch}>
              <Icon
                name={isTicketFrom ? 'radiobox-marked' : 'radiobox-blank'}
                style={[
                  isTicketFrom
                    ? styles.activeRadioIcon
                    : styles.nonactiveRadioIcon,
                ]}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ marginLeft: '7%', marginTop: '5%', alignItems: 'center' }}
          >
            <Text style={[styles.label, styles.text]}>
              {selectedTrip.destination}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: '5%' }}>
        <View style={styles.metrics}>
          <Text style={styles.label}>Date of departure</Text>
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              onPress={showDateOfDeparturePicker}
              style={styles.picker}
            >
              <View style={styles.rowAndAlign}>
                <Icon
                  name="calendar"
                  style={[styles.icon, { marginRight: '10%' }]}
                />
                <Text style={styles.pickerText}>
                  {cutDate(dateOfDeparture)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {showDateOfDeparture && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={dateOfDeparture}
              minimumDate={Date.now()}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={dateOfDepartureChangeHandler}
            />
          )}
        </View>

        <View style={styles.metrics}>
          <Text style={styles.label}>Hour of departure</Text>
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              onPress={showHourOfDeparturePicker}
              style={styles.picker}
            >
              <View style={styles.rowAndAlign}>
                <Icon
                  name="clock"
                  style={[styles.icon, { marginRight: '10%' }]}
                />
                <Text style={styles.pickerText}>{hourOfDeparture}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {showHourOfDeparture && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={parseFloat(hourOfDeparture.replace(':', '.'))}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={hourOfDepartureChangeHandler}
            />
          )}
        </View>

        <View style={styles.metrics}>
          <Text style={styles.label}>From place</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor="grey"
            value={placeOfDeparture}
            onChangeText={(text) => placeChangeHandler(text)}
          />
          {!placeOfDepartureIsValid && fromPlaceSubmitted && (
            <View style={styles.errorContainer}>
              <Text style={styles.error}>Enter a valid address!</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={submitHandler}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AddTransportContainer;
