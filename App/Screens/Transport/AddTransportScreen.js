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
  Platform,
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

  /** INITIAL VALUES */
  const initialMinutes =
    new Date().getMinutes() < 10
      ? '0' + new Date().getMinutes()
      : new Date().getMinutes();
  const initialHour = new Date().getHours() + ':' + initialMinutes;

  /** MODAL CONTROLLER */
  const [showModal, setShowModal] = useState(false);

  /** STAGE VARIABLES  */
  const [dateOfDeparture, setDateOfDeparture] = useState(new Date());
  const [hourOfDeparture, setHourOfDeparture] = useState(initialHour);
  const [fromPlace, setFromPlace] = useState('');
  const [dateOfArrival, setDateOfArrival] = useState(new Date());
  const [hourOfArrival, setHourOfArrival] = useState(initialHour);
  const [toPlace, setToPlace] = useState('');
  const [means, setMeans] = useState('');
  const [details, setDetails] = useState('');

  /** ARRAY OF STAGES */
  const [stages, setStages] = useState([]);

  /** HANDLERS */
  // cut date into displayable form
  const cutDate = (date) => date.toString().split(' ').slice(1, 4).join(' ');

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
    setHourOfDeparture(initialHour);
    setFromPlace('');
    setDateOfArrival(new Date());
    setHourOfArrival(initialHour);
    setToPlace('');
    setMeans('');
    setDetails('');
  };

  // add stage of transport handler
  const addHandler = () => {
    let stage = new TransportStage(
      new Date().toString(),
      dateOfDeparture.toString(),
      hourOfDeparture,
      fromPlace,
      dateOfArrival.toString(),
      hourOfArrival,
      toPlace,
      means,
      details,
    );

    setStages((previousState) => [...previousState, stage]);

    toggleModal();
    clear();
    console.log(stages);
  };

  const submitHandler = useCallback(() => {
    dispatch(transportActions.createTransport(tripId, to, from, stages));
    props.navigation.goBack();
  }, [props.navigation, dispatch, tripId, to, from, stages]);

  return (
    <View style={styles.container}>
      {/* ADD A TRANSPORT STAGE MODAL */}
      <Modal visible={showModal}>
        <ScrollView style={[styles.container, {paddingVertical: 20}]}>
          {/* RETURN ICON */}
          <TouchableOpacity
            onPress={toggleModal}
            style={{width: '100%', marginLeft: '7%'}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Icon
                name={Platform.OS === 'android' ? 'md-close' : 'ios-close'}
                style={styles.returnIcon}
              />
              <Text style={[styles.text]}>Return from adding a stage</Text>
            </View>
          </TouchableOpacity>

          {/* DEPARTURE */}
          <View style={{marginTop: 20}}>
            <View style={[{marginLeft: '10%'}]}>
              <Text style={[styles.label, {color: '#FFFFFF'}]}>Departure</Text>
            </View>

            <View style={styles.metrics}>
              {/* DATEPICKER FOR DEPARTURE */}
              <Text style={styles.label}>Date of departure</Text>
              <View style={styles.pickerContainer}>
                <TouchableOpacity onPress={{}} style={styles.picker}>
                  <View style={styles.rowAndCenter}>
                    <Icon
                      name={
                        Platform.OS === 'android'
                          ? 'md-calendar'
                          : 'ios-calendar'
                      }
                      style={[styles.icon, {marginRight: '10%'}]}
                    />
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
                  <View style={styles.rowAndCenter}>
                    <Icon
                      name={
                        Platform.OS === 'android' ? 'md-clock' : 'ios-clock'
                      }
                      style={[styles.icon, {marginRight: '10%'}]}
                    />
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
                placeholder="Address"
                placeholderTextColor="grey"
                value={fromPlace}
                onChangeText={setFromPlace}
              />
            </View>
          </View>

          {/* ARRIVAL */}
          <View style={[{marginTop: 30}]}>
            <View style={[{marginLeft: '10%'}]}>
              <Text style={[styles.label, styles.text]}>Arrival</Text>
            </View>

            <View style={styles.metrics}>
              {/* DATEPICKER FOR ARRIVAL */}
              <Text style={styles.label}>Date of arrival</Text>
              <View style={styles.pickerContainer}>
                <TouchableOpacity onPress={{}} style={styles.picker}>
                  <View style={styles.rowAndCenter}>
                    <Icon
                      name={
                        Platform.OS === 'android'
                          ? 'md-calendar'
                          : 'ios-calendar'
                      }
                      style={[styles.icon, {marginRight: '10%'}]}
                    />
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
                  <View style={styles.rowAndCenter}>
                    <Icon
                      name={
                        Platform.OS === 'android' ? 'md-clock' : 'ios-clock'
                      }
                      style={[styles.icon, {marginRight: '10%'}]}
                    />
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
                placeholder="Address"
                placeholderTextColor="grey"
                value={toPlace}
                onChangeText={setToPlace}
              />
            </View>
          </View>

          {/* ADDITIONAL INFORMATION */}
          <View style={[{marginTop: 30}]}>
            <View style={[{marginLeft: '10%'}]}>
              <Text style={[styles.label, {color: '#FFFFFF'}]}>
                Additional information
              </Text>
            </View>

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
        <View style={{flexDirection: 'row'}}>
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
        <View style={{flexDirection: 'row'}}>
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

      {/* STAGES OF TRANSPORT LABEL */}
      <View style={styles.metrics}>
        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
          <Text style={styles.label}>Stages of transport</Text>
          <TouchableOpacity onPress={toggleModal} style={styles.iconButton}>
            <Icon
              name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
              style={[styles.icon, {color: Colors.primary}]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* STAGES OF TRANSPORT */}
      {stages.length !== 0 ? (
        /** LIST OF STAGES */
        <FlatList
          style={{marginHorizontal: '10%'}}
          data={stages}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Card style={styles.card}>
              <Text style={[styles.title, styles.text, {fontWeight: 'bold'}]}>
                {item.means} ticket
              </Text>
              <View style={{flexDirection: 'row', marginTop: '5%'}}>
                <View>
                  <Text style={[{color: Colors.primary, fontWeight: 'bold'}]}>
                    DEPARTURE
                  </Text>
                  <Text style={styles.text}>
                    Date: {cutDate(item.dateOfDeparture)} {'\n'}
                    Hour: {item.hourOfDeparture} {'\n'}
                    Address: {item.fromPlace}
                  </Text>
                </View>
                <View style={{marginLeft: '10%'}}>
                  <Text style={[{color: Colors.primary, fontWeight: 'bold'}]}>
                    ARRIVAL
                  </Text>
                  <Text style={styles.text}>
                    Date: {cutDate(item.dateOfArrival)} {'\n'}
                    Hour: {item.hourOfArrival} {'\n'}
                    Address: {item.toPlace}
                  </Text>
                </View>
              </View>
            </Card>
          )}
        />
      ) : (
        <View style={{marginLeft: '10%'}}>
          <Text style={styles.text}>No stages</Text>
        </View>
      )}

      {/* SUBMIT BUTTON */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTransportScreen;
