import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import * as transportActions from 'state/transport/transportActions';
import {addTransportStyle as styles} from './AddTransportStyle';
import Colors from 'constants/Colors';

const AddTransport = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );

  const [to, setToDestination] = useState(true);
  const [from, setFromDestination] = useState(false);
  const [qr, setQR] = useState('');
  const [pdfUri, setpdfUri] = useState('');

  const initialMinutes =
    new Date().getMinutes() < 10
      ? '0' + new Date().getMinutes()
      : new Date().getMinutes();
  const initialHour = new Date().getHours() + ':' + initialMinutes;

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

  /* GODZINA SIĘ NIE ZGADZA - O DWIE GODZINY ZA DUŻO */
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
      transportActions.createTransport(
        tripId,
        to,
        from,
        prepareDate(dateOfDeparture, hourOfDeparture),
        placeOfDeparture,
        qr,
        pdfUri,
      ),
    );
    setIsLoading(false);
    props.navigation.navigate('Transport', {
      tripId: selectedTrip.id,
    });
  }, [
    dispatch,
    tripId,
    to,
    from,
    dateOfDeparture,
    hourOfDeparture,
    placeOfDeparture,
    qr,
    pdfUri,
    props.navigation,
    selectedTrip.id,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.metrics}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={[
                styles.label,
                to ? styles.activeLabel : styles.disactiveLabel,
              ]}>
              to
            </Text>
            <TouchableOpacity onPress={toggleToDestinationSwitch}>
              <MaterialIcon
                name={to ? 'radio-button-checked' : 'radio-button-unchecked'}
                style={[
                  to ? styles.activeRadioIcon : styles.nonactiveRadioIcon,
                ]}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginLeft: '5%', alignItems: 'center'}}>
            <Text
              style={[
                styles.label,
                from ? styles.activeLabel : styles.disactiveLabel,
              ]}>
              from
            </Text>
            <TouchableOpacity onPress={toggleFromDestinationSwitch}>
              <MaterialIcon
                name={from ? 'radio-button-checked' : 'radio-button-unchecked'}
                style={[
                  from ? styles.activeRadioIcon : styles.nonactiveRadioIcon,
                ]}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{marginLeft: '7%', marginTop: '5%', alignItems: 'center'}}>
            <Text style={[styles.label, styles.text]}>
              {selectedTrip.destination}
            </Text>
          </View>
        </View>
      </View>

      <View style={{marginTop: '5%'}}>
        <View style={styles.metrics}>
          <Text style={styles.label}>Date of departure</Text>
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              onPress={showDateOfDeparturePicker}
              style={styles.picker}>
              <View style={styles.rowAndAlign}>
                <Icon
                  name={
                    Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar'
                  }
                  style={[styles.icon, {marginRight: '10%'}]}
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
              mode={'date'}
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
              style={styles.picker}>
              <View style={styles.rowAndAlign}>
                <Icon
                  name={Platform.OS === 'android' ? 'md-clock' : 'ios-clock'}
                  style={[styles.icon, {marginRight: '10%'}]}
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
              mode={'time'}
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

export default AddTransport;
