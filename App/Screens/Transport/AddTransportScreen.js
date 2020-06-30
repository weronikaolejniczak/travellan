import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  Alert,
  FlatList,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SinglePickerMaterialDialog} from 'react-native-material-dialog';
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
  const initialMeans = ['train', 'bus', 'airplane', 'bike', 'boat'];

  /** MODAL CONTROLLER */
  const [showModal, setShowModal] = useState(false);

  /** STAGE VARIABLES  */
  const [dateOfDeparture, setDateOfDeparture] = useState(new Date());
  const [showDateOfDeparture, setShowDateOfDeparture] = useState(false);
  const [hourOfDeparture, setHourOfDeparture] = useState(initialHour);
  const [showHourOfDeparture, setShowHourOfDeparture] = useState(false);
  const [fromPlace, setFromPlace] = useState('');
  const [fromPlaceIsValid, setFromPlaceIsValid] = useState(false);
  const [fromPlaceSubmitted, setFromPlaceSubmitted] = useState(false);
  const [dateOfArrival, setDateOfArrival] = useState(new Date());
  const [showDateOfArrival, setShowDateOfArrival] = useState(false);
  const [hourOfArrival, setHourOfArrival] = useState(initialHour);
  const [showHourOfArrival, setShowHourOfArrival] = useState(false);
  const [toPlace, setToPlace] = useState('');
  const [toPlaceIsValid, setToPlaceIsValid] = useState(false);
  const [toPlaceSubmitted, setToPlaceSubmitted] = useState(false);
  const [means, setMeans] = useState('train');
  const [details, setDetails] = useState('');

  /** ARRAY OF STAGES */
  const [stages, setStages] = useState([]);
  const [noStages, setNoStages] = useState(true);
  const [refresh, setRefresh] = useState(false);

  /** MEANS */
  const [singlePickerVisible, setSinglePickerVisible] = useState(false);

  /** HANDLERS */
  // cut date into displayable form
  const cutDate = (date) => date.toString().split(' ').slice(1, 4).join(' ');
  const cutHour = (hour) =>
    hour.toTimeString().split(' ')[0].split(':').slice(0, 2).join(':');

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

  /** VALIDATION HANDLERS */
  let addressRegex = new RegExp('');

  // fromPlace change handler
  const fromPlaceChangeHandler = (text) => {
    text.trim().length === 0 || !addressRegex.test(text)
      ? setFromPlaceIsValid(false)
      : setFromPlaceIsValid(true);
    setFromPlace(text);
  };

  // toPlace change handler
  const toPlaceChangeHandler = (text) => {
    text.trim().length === 0 || !addressRegex.test(text)
      ? setToPlaceIsValid(false)
      : setToPlaceIsValid(true);
    setToPlace(text);
  };

  /** DATE AND HOUR PICKER HANDLERS
   * refactor along with pickers to avoid repeating
   */

  /** DEPARTURE */
  /** DATE OF DEPARTURE */
  const dateOfDepartureChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfDeparture;
    setShowDateOfDeparture(Platform.OS === 'ios');
    setDateOfDeparture(currentDate);

    // set endDate to currentDate if it is earlier than the day selected for startDate
    currentDate > dateOfArrival ? setDateOfArrival(currentDate) : '';
  };

  const showDateOfDeparturePicker = () => {
    setShowDateOfDeparture(true);
  };

  /** HOUR OF DEPARTURE */
  const hourOfDepartureChangeHandler = (event, selectedHour) => {
    const currentHour = selectedHour || hourOfDeparture;
    setShowHourOfDeparture(Platform.OS === 'ios');
    setHourOfDeparture(cutHour(currentHour));
  };

  const showHourOfDeparturePicker = () => {
    setShowHourOfDeparture(true);
  };

  /** ARRIVAL */
  /** DATE OF ARRIVAL */
  const dateOfArrivalChangeHandler = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfArrival;
    setShowDateOfArrival(Platform.OS === 'ios');
    setDateOfArrival(currentDate);
  };

  const showDateOfArrivalPicker = () => {
    setShowDateOfArrival(true);
  };

  /** HOUR OF ARRIVAL */
  const hourOfArrivalChangeHandler = (event, selectedHour) => {
    const currentHour = selectedHour || hourOfArrival;
    setShowHourOfArrival(Platform.OS === 'ios');
    setHourOfArrival(cutHour(currentHour));
  };

  const showHourOfArrivalPicker = () => {
    setShowHourOfArrival(true);
  };

  /** OTHER HANDLERS */
  // clear values for transport stages values holders
  const clear = () => {
    setDateOfDeparture(new Date());
    setHourOfDeparture(initialHour);
    setFromPlace('');
    setFromPlaceIsValid(false);
    setFromPlaceSubmitted(false);
    setDateOfArrival(new Date());
    setHourOfArrival(initialHour);
    setToPlace('');
    setToPlaceIsValid(false);
    setToPlaceSubmitted(false);
    setMeans('train');
    setDetails('');
  };

  // add stage of transport handler
  const addHandler = () => {
    if (!fromPlaceIsValid || !toPlaceIsValid) {
      setFromPlaceSubmitted(true);
      setToPlaceSubmitted(true);
    } else {
      let stage = new TransportStage(
        new Date().toString(),
        dateOfDeparture.toString(),
        hourOfDeparture.toString(),
        fromPlace,
        dateOfArrival.toString(),
        hourOfArrival.toString(),
        toPlace,
        means,
        details,
      );

      setStages((previousState) => [...previousState, stage]);

      toggleModal();
      clear();
    }
  };

  const deleteHandler = (item) => {
    Alert.alert(
      'Delete a stage',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            stages.splice(stages.indexOf(item), 1);
            setRefresh(true);
            setRefresh(false);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const submitHandler = useCallback(() => {
    if (stages.length > 0) {
      dispatch(transportActions.createTransport(tripId, to, from, stages));
      props.navigation.goBack();
    } else {
    }
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
                <TouchableOpacity
                  onPress={showDateOfDeparturePicker}
                  style={styles.picker}>
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

            {/* HOURPICKER FOR DEPARTURE */}
            <View style={styles.metrics}>
              <Text style={styles.label}>Hour of departure</Text>
              <View style={styles.pickerContainer}>
                <TouchableOpacity
                  onPress={showHourOfDeparturePicker}
                  style={styles.picker}>
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
              {showHourOfDeparture && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={parseFloat(hourOfDeparture.replace(':', '.'))}
                  //minimumDate={Date.now()}
                  mode={'time'}
                  is24Hour={true}
                  display="default"
                  onChange={hourOfDepartureChangeHandler}
                />
              )}
            </View>

            {/* PLACE OF DEPARTURE */}
            <View style={styles.metrics}>
              <Text style={styles.label}>From place</Text>
              <TextInput
                style={styles.input}
                placeholder="Address"
                placeholderTextColor="grey"
                value={fromPlace}
                onChangeText={fromPlaceChangeHandler}
              />
              {!fromPlaceIsValid && fromPlaceSubmitted && (
                <View style={styles.errorContainer}>
                  <Text style={styles.error}>Enter a valid address!</Text>
                </View>
              )}
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
                <TouchableOpacity
                  onPress={showDateOfArrivalPicker}
                  style={styles.picker}>
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
              {showDateOfArrival && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={dateOfArrival}
                  minimumDate={Date.now()}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={dateOfArrivalChangeHandler}
                />
              )}
            </View>

            {/* HOURPICKER FOR ARRIVAL */}
            <View style={styles.metrics}>
              <Text style={styles.label}>Hour of arrival</Text>
              <View style={styles.pickerContainer}>
                <TouchableOpacity
                  onPress={showHourOfArrivalPicker}
                  style={styles.picker}>
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
              {showHourOfArrival && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={parseFloat(hourOfArrival.replace(':', '.'))}
                  //minimumDate={Date.now()}
                  mode={'time'}
                  is24Hour={true}
                  display="default"
                  onChange={hourOfArrivalChangeHandler}
                />
              )}
            </View>

            {/* PLACE OF ARRIVAL */}
            <View style={styles.metrics}>
              <Text style={styles.label}>To place</Text>
              <TextInput
                style={styles.input}
                placeholder="Address"
                placeholderTextColor="grey"
                value={toPlace}
                onChangeText={toPlaceChangeHandler}
              />
              {!toPlaceIsValid && toPlaceSubmitted && (
                <View style={styles.errorContainer}>
                  <Text style={styles.error}>Enter a valid address!</Text>
                </View>
              )}
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
              <View style={styles.pickerContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setSinglePickerVisible(true);
                  }}
                  style={styles.picker}>
                  <View style={styles.rowAndCenter}>
                    <Text style={styles.pickerText}>{means}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <SinglePickerMaterialDialog
                title={'Means of transport:'}
                items={initialMeans.map((row, index) => ({
                  value: index,
                  label: row,
                }))}
                colorAccent={Colors.primary}
                visible={singlePickerVisible}
                selectedItem={{label: 'means', value: means}}
                onCancel={() => setSinglePickerVisible(false)}
                onOk={(result) => {
                  setSinglePickerVisible(false);
                  setMeans(initialMeans[result.selectedItem.value]);
                }}
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
          extraData={refresh}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            /** REFACTOR INTO ADDIBLESTAGEITEM */
            <Card style={styles.card}>
              <View style={[styles.stageItemHeader]}>
                <Text style={[styles.title, styles.text, {fontWeight: 'bold'}]}>
                  {item.means}
                </Text>
                <TouchableOpacity
                  onPress={() => deleteHandler(item)}
                  style={{padding: '1%', marginRight: '10%'}}>
                  <Icon
                    name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    style={[styles.icon, {color: Colors.primary}]}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.stageItemBody]}>
                <View>
                  <Text style={[{color: Colors.primary, fontWeight: 'bold'}]}>
                    DEPARTURE
                  </Text>
                  <Text style={styles.text}>
                    {cutDate(item.dateOfDeparture)} {'\n'}
                    {item.hourOfDeparture} {'\n'}
                    {item.fromPlace}
                  </Text>
                </View>
                <View style={{marginLeft: '5%'}}>
                  <Text style={[{color: Colors.primary, fontWeight: 'bold'}]}>
                    ARRIVAL
                  </Text>
                  <Text style={styles.text}>
                    {cutDate(item.dateOfArrival)} {'\n'}
                    {item.hourOfArrival} {'\n'}
                    {item.toPlace}
                  </Text>
                </View>
              </View>
            </Card>
          )}
        />
      ) : (
        <View style={{marginLeft: '10%'}}>
          <Text style={styles.text}>No stages</Text>
          {noStages && (
            <View style={styles.errorContainer}>
              <Text style={styles.error}>Add a stage!</Text>
            </View>
          )}
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
