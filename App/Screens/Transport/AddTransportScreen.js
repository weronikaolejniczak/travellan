import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  Alert,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SinglePickerMaterialDialog} from 'react-native-material-dialog';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
/** IMPORTS FROM WITHIN THE MODULE */
import TransportStage from '../../Models/TransportStage';
import * as transportActions from '../../Stores/Actions/Transport';
import Card from '../../Components/Atoms/Card';
import {addTransportScreenStyle as styles} from './AddTransportScreenStyle';
import Colors from '../../Constants/Colors';

/** ADD TRANSPORT SCREEN */
const AddTransportScreen = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );

  /** TYPE OF TICKET BOOLEAN VARIABLES */
  const [to, setToDestination] = useState(true);
  const [from, setFromDestination] = useState(false);

  /** INITIAL VALUES */
  const initialMinutes =
    new Date().getMinutes() < 10
      ? '0' + new Date().getMinutes()
      : new Date().getMinutes();
  const initialHour = new Date().getHours() + ':' + initialMinutes;
  const initialMeans = ['train', 'bus', 'airplane', 'boat', 'bicycle'];

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

  // loading check
  const [isLoading, setIsLoading] = useState(false);

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
    currentDate < dateOfDeparture
      ? setDateOfArrival(dateOfDeparture)
      : setDateOfArrival(currentDate);
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

  const submitHandler = useCallback(async () => {
    setIsLoading(true);
    if (stages.length > 0) {
      await dispatch(
        transportActions.createTransport(tripId, to, from, stages),
      );
      props.navigation.navigate('Transport', {
        tripId: selectedTrip.id,
      });
    } else {
    }
    setIsLoading(false);
  }, [stages, dispatch, tripId, to, from, props.navigation, selectedTrip.id]);

  return (
    <View style={styles.container}>
      {/* ADD A TRANSPORT STAGE MODAL */}
      <Modal visible={showModal}>
        <ScrollView style={[styles.modal]}>
          {/* RETURN ICON */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={toggleModal} style={{marginLeft: '5%'}}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Icon
                  name={Platform.OS === 'android' ? 'md-close' : 'ios-close'}
                  style={styles.returnIcon}
                />
                <Text style={[styles.text, styles.modalHeaderText]}>
                  Return from adding a stage
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* DEPARTURE */}
          <View style={styles.modalContent}>
            <View style={{marginTop: '5%'}}>
              <Text style={[styles.label, styles.text]}>Departure</Text>
              {/* DATEPICKER FOR DEPARTURE */}
              <View style={styles.metrics}>
                <Text style={styles.label}>Date of departure</Text>
                <View style={styles.pickerContainer}>
                  <TouchableOpacity
                    onPress={showDateOfDeparturePicker}
                    style={styles.picker}>
                    <View style={styles.rowAndAlign}>
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
                    <View style={styles.rowAndAlign}>
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
              <Text style={[styles.label, styles.text]}>Arrival</Text>
              <View style={styles.metrics}>
                {/* DATEPICKER FOR ARRIVAL */}
                <Text style={styles.label}>Date of arrival</Text>
                <View style={styles.pickerContainer}>
                  <TouchableOpacity
                    onPress={showDateOfArrivalPicker}
                    style={styles.picker}>
                    <View style={styles.rowAndAlign}>
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
                    minimumDate={dateOfDeparture}
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
                    <View style={styles.rowAndAlign}>
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
              <Text style={[styles.label, styles.text]}>
                Additional information
              </Text>

              <View style={styles.metrics}>
                <Text style={styles.label}>Means of transport</Text>
                <View style={styles.pickerContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setSinglePickerVisible(true);
                    }}
                    style={styles.picker}>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.pickerText}>{means}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <SinglePickerMaterialDialog
                  title={'Means of transport'}
                  items={initialMeans.map((row, index) => ({
                    value: index,
                    label: row,
                  }))}
                  colorAccent={Colors.primary}
                  visible={singlePickerVisible}
                  selectedItem={{label: means, value: 0}}
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
          </View>
        </ScrollView>
      </Modal>

      {/* 'TO' OR 'FROM' */}
      <View style={styles.metrics}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {/* TO */}
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
          {/* FROM */}
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
        </View>
        {/* DESTINATION NAME */}
        <View style={{marginTop: '5%', alignItems: 'center'}}>
          <Text style={[styles.label, styles.text]}>
            {selectedTrip.destination}
          </Text>
        </View>
      </View>

      {/* STAGES OF TRANSPORT LABEL */}
      <View style={[styles.metrics, {marginTop: '10%'}]}>
        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
          <Text style={styles.label}>Stages of transport</Text>
          <TouchableOpacity onPress={toggleModal} style={styles.iconButton}>
            <Icon
              name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
              style={[styles.icon, {marginLeft: '5%', color: Colors.primary}]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* STAGES OF TRANSPORT */}
      {!!stages.length ? (
        /** LIST OF STAGES */
        <FlatList
          style={{}}
          data={stages}
          extraData={refresh}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            /** REFACTOR INTO ADDIBLESTAGEITEM */
            <Card style={styles.card}>
              <View style={[styles.stageItemBody]}>
                <View style={styles.stageIcons}>
                  {/* MEANS ICON */}
                  <Icon
                    name={
                      Platform.OS === 'android'
                        ? `md-${item.means}`
                        : `ios-${item.means}`
                    }
                    style={[styles.icon]}
                  />
                  {/* DELETE BUTTON */}
                  <TouchableOpacity
                    onPress={() => deleteHandler(item)}
                    style={{marginTop: '25%', padding: '2%'}}>
                    <Icon
                      name={
                        Platform.OS === 'android' ? 'md-trash' : 'ios-trash'
                      }
                      style={[styles.icon, {color: Colors.primary}]}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.stageItemBody,
                    {justifyContent: 'space-around'},
                  ]}>
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
              </View>
            </Card>
          )}
        />
      ) : (
        <View>
          {noStages && (
            <View style={styles.errorContainer}>
              <Text style={styles.error}>Add a stage!</Text>
            </View>
          )}
        </View>
      )}

      {/* SUBMIT BUTTON */}
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

export default AddTransportScreen;
