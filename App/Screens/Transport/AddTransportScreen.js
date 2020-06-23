import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  //Alert,
  Switch,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import * as transportActions from '../../Stores/Actions/Transport';
import {addTransportScreenStyle as styles} from './AddTransportScreenStyle';
import Colors from '../../Constants/Colors';

const AddTransportScreen = (props) => {
  const dispatch = useDispatch();

  const [to, setToDestination] = useState(false);
  const [from, setFromDestination] = useState(false);
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState('');
  const [fromPlace, setFromPlace] = useState('');
  const [toPlace, setToPlace] = useState('');
  const [means, setMeans] = useState('');
  const [details, setDetails] = useState('');

  //
  const toggleToDestinationSwitch = () =>
    setToDestination((previousState) => !previousState);

  //
  const toggleFromDestinationSwitch = () =>
    setFromDestination((previousState) => !previousState);

  const tripId = props.route.params.tripId;

  /**
   * {
      id: 1,
      to: true,
      from: false,
      date: '2021-02-13',
      hour: '6:45',
      fromPlace: 'Poznań Główny railway station, Dworcowa 2, 61-801 Poznań',
      toPlace: "Gare Saint-Lazare, 13 Rue d'Amsterdam, 75008 Paris, France",
      means: 'train',
      details: {
        carriage: '13',
        seat: '61',
      },
    },
  */
  const submitHandler = useCallback(() => {
    dispatch(
      transportActions.createTransport(
        tripId,
        to,
        from,
        date.toString().split(' ').slice(1, 4).join(' '),
        hour,
        fromPlace,
        toPlace,
        means,
        details,
      ),
    );
    props.navigation.goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    tripId,
    to,
    from,
    date,
    hour,
    fromPlace,
    toPlace,
    means,
    details,
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.metrics}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.label}>Ticket 'to'</Text>
          {/* SWITCH */}
          <Switch
            trackColor={{
              false: Colors.switchDisabledTrack,
              true: Colors.switchEnabledTrack,
            }}
            thumbColor={Colors.switchThumb}
            ios_backgroundColor={Colors.background}
            onValueChange={toggleToDestinationSwitch}
            value={to}
          />
        </View>
      </View>

      <View style={styles.metrics}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.label}>Ticket 'from'</Text>
          {/* SWITCH */}
          <Switch
            trackColor={{
              false: Colors.switchDisabledTrack,
              true: Colors.switchEnabledTrack,
            }}
            thumbColor={Colors.switchThumb}
            ios_backgroundColor={Colors.background}
            onValueChange={toggleFromDestinationSwitch}
            value={from}
          />
        </View>
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>Date of departure</Text>
        {/* DATEPICKER */}
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={{}} style={styles.picker}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Icon name="md-calendar" style={styles.icon} />
              <Text style={styles.pickerText}>
                {date.toString().split(' ').slice(1, 4).join(' ')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>Hour of departure</Text>
        {/* HOURPICKER */}
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={{}} style={styles.picker}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Icon name="md-calendar" style={styles.icon} />
              <Text style={styles.pickerText}>
                {date.toString().split(' ').slice(1, 4).join(' ')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>From place</Text>
        <TextInput
          style={styles.input}
          value={fromPlace}
          onChangeText={setFromPlace}
        />
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>To place</Text>
        <TextInput
          style={styles.input}
          value={toPlace}
          onChangeText={setToPlace}
        />
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>Means of transportation</Text>
        <TextInput style={styles.input} value={means} onChangeText={setMeans} />
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>Ticket details</Text>
        <TextInput
          style={styles.input}
          value={details}
          onChangeText={setDetails}
          multiline
        />
      </View>

      {/* SUBMIT BUTTON - refactor to a header button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddTransportScreen;
