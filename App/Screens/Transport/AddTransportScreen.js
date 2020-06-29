import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  //Alert,
  FlatList,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import TransportStage from '../../Models/TransportStage';
import * as transportActions from '../../Stores/Actions/Transport';
import Card from '../../Components/UI/Card';
import {addTransportScreenStyle as styles} from './AddTransportScreenStyle';
import Colors from '../../Constants/Colors';

/** ADD TRANSPORT SCREEN */
const AddTransportScreen = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;

  /** TYPE OF TICKET BOOLEAN VARIABLES */
  const [to, setToDestination] = useState(true);
  const [from, setFromDestination] = useState(false);

  /** MODAL CONTROLLER */
  const [showModal, setShowModal] = useState(false);

  /** STAGE VARIABLES  */
  const [dateOfDeparture, setDateOfDeparture] = useState(new Date());
  const [hourOfDeparture, setHourOfDeparture] = useState(new Date().getHours());
  const [fromPlace, setFromPlace] = useState('');
  const [dateOfArrival, setDateOfArrival] = useState(new Date());
  const [hourOfArrival, setHourOfArrival] = useState(new Date().getHours());
  const [toPlace, setToPlace] = useState('');
  const [means, setMeans] = useState('');
  const [details, setDetails] = useState('');

  /** ARRAY OF STAGES */
  const [stages, setStages] = useState([]);

  /** HANDLERS */
  // cut date into displayable form
  const cutDate = (string) =>
    string.toString().split(' ').slice(1, 4).join(' ');

  // toggle switch for 'to' attribute of the ticket
  const toggleToDestinationSwitch = () => {
    setToDestination((previousState) => !previousState);
    setFromDestination((previousState) => !previousState);
  };

  // toggle switch for 'from' attribute of the ticket
  const toggleFromDestinationSwitch = () => {
    setFromDestination((previousState) => !previousState);
    setToDestination((previousState) => !previousState);
  };

  // toggle modal
  const toggleModal = () => {
    setShowModal((previousState) => !previousState);
  };

  // clear values for transport stages values holders
  const clear = () => {
    setDateOfDeparture(new Date());
    setHourOfDeparture('');
    setFromPlace('');
    setDateOfArrival(new Date());
    setHourOfArrival('');
    setToPlace('');
    setMeans('');
    setDetails('');
  };

  // add stage of transport handler
  const addHandler = () => {
    let stage = new TransportStage(
      new Date().toString(),
      dateOfDeparture,
      hourOfDeparture,
      fromPlace,
      dateOfArrival,
      hourOfArrival,
      toPlace,
      means,
      details,
    );

    setStages((previousStages) => {
      return [...previousStages, stage];
    });

    toggleModal();
    clear();
  };

  const submitHandler = useCallback(() => {
    dispatch(transportActions.createTransport(tripId, to, from, stages));
    props.navigation.goBack();
  }, [props.navigation, dispatch, tripId, to, from, stages]);

  return (
    <ScrollView style={styles.container}>
      <Modal visible={showModal}>
        <ScrollView style={[styles.container, {paddingVertical: 20}]}>
          {/* RETURN ICON */}
          <TouchableOpacity
            onPress={toggleModal}
            style={{width: 100, marginLeft: '7%'}}>
            <Icon name="md-close" style={styles.returnIcon} />
          </TouchableOpacity>

          {/* DEPARTURE */}
          <View style={{marginTop: 20}}>
            <Text style={[styles.label, {color: '#FFFFFF'}]}>Departure</Text>
            <View style={styles.metrics}>
              {/* DATEPICKER FOR DEPARTURE */}
              <Text style={styles.label}>Date of departure</Text>
              <View style={styles.pickerContainer}>
                <TouchableOpacity onPress={{}} style={styles.picker}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Icon name="md-calendar" style={styles.icon} />
                    <Text style={styles.pickerText}>
                      {cutDate(dateOfDeparture)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* HOURPICKER FOR DEPARTURE */}
            <View style={styles.metrics}>
              <Text style={styles.label}>Hour of departure</Text>
              <View style={styles.pickerContainer}>
                <TouchableOpacity onPress={{}} style={styles.picker}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Icon name="md-clock" style={styles.icon} />
                    <Text style={styles.pickerText}>{hourOfDeparture}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* PLACE OF DEPARTURE */}
            <View style={styles.metrics}>
              <Text style={styles.label}>From place</Text>
              <TextInput
                style={styles.input}
                value={fromPlace}
                onChangeText={setFromPlace}
              />
            </View>
          </View>

          {/* ARRIVAL */}
          <View style={[{marginTop: 30}]}>
            <Text style={[styles.label, {color: '#FFFFFF'}]}>Arrival</Text>
            <View style={styles.metrics}>
              {/* DATEPICKER FOR ARRIVAL */}
              <Text style={styles.label}>Date of arrival</Text>
              <View style={styles.pickerContainer}>
                <TouchableOpacity onPress={{}} style={styles.picker}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Icon name="md-calendar" style={styles.icon} />
                    <Text style={styles.pickerText}>
                      {cutDate(dateOfArrival)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* HOURPICKER FOR ARRIVAL */}
            <View style={styles.metrics}>
              <Text style={styles.label}>Hour of arrival</Text>
              <View style={styles.pickerContainer}>
                <TouchableOpacity onPress={{}} style={styles.picker}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Icon name="md-clock" style={styles.icon} />
                    <Text style={styles.pickerText}>{hourOfArrival}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* PLACE OF ARRIVAL */}
            <View style={styles.metrics}>
              <Text style={styles.label}>To place</Text>
              <TextInput
                style={styles.input}
                value={toPlace}
                onChangeText={setToPlace}
              />
            </View>
          </View>

          {/* ADDITIONAL INFORMATION */}
          <View style={[{marginTop: 30}]}>
            <Text style={[styles.label, {color: '#FFFFFF'}]}>
              Additional information
            </Text>
            <View style={styles.metrics}>
              <Text style={styles.label}>Means of transport</Text>
              <TextInput
                style={styles.input}
                value={means}
                onChangeText={setMeans}
              />
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
          </View>

          {/* ADD BUTTON */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={addHandler}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>

      {/* 'TO' SWITCH */}
      <View style={styles.metrics}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.label}>Ticket 'to'</Text>
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

      {/* 'FROM' SWITCH */}
      <View style={styles.metrics}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.label}>Ticket 'from'</Text>
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

      {/* STAGES OF TRANSPORT */}
      <View style={styles.metrics}>
        <View style={[{flex: 1, flexDirection: 'row', alignItems: 'center'}]}>
          <Text style={styles.label}>Stages of transport</Text>
          <TouchableOpacity onPress={toggleModal} style={styles.iconButton}>
            <Icon name="md-add" style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/** LIST OF STAGES */}
        <FlatList
          data={stages}
          keyExtractor={(item) => item.id}
          renderItem={({stage}) => (
            <Card style={styles.card}>
              <Text style={styles.text}>Date of departure: {stage}</Text>
            </Card>
          )}
        />
      </View>

      {/* SUBMIT BUTTON */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddTransportScreen;
