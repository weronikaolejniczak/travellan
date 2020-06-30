import React, {useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import * as accommodationActions from '../../Stores/Actions/Accommodation';
import {addAccommodationScreenStyle as styles} from './AddAccommodationScreenStyle';

const AddAccommodationScreen = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  // housing name
  const [housingName, setHousingName] = useState('');
  const [housingNameIsValid, setHousingNameIsValid] = useState(false);
  const [housingNameSubmitted, setHousingNameSubmitted] = useState(false);

  // address
  const [housingAddress, setHousingAddress] = useState('');
  const [housingAddressIsValid, setHousingAddressIsValid] = useState(false);
  const [housingAddressSubmitted, setHousingAddressSubmitted] = useState(false);

  // description
  const [description, setDescription] = useState('');
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const [descriptionSubmitted, setDescriptionSubmitted] = useState(false);

  // reservation details
  const [reservationDetails, setReservationDetails] = useState('');

  /** HANDLERS */
  // housing name validation handler
  const housingNameChangeHandler = (text) => {
    text.trim().length === 0
      ? setHousingNameIsValid(false)
      : setHousingNameIsValid(true);
    setHousingName(text);
  };

  // address validation handler
  const housingAddressChangeHandler = (text) => {
    text.trim().length === 0
      ? setHousingAddressIsValid(false)
      : setHousingAddressIsValid(true);
    setHousingAddress(text);
  };

  // description validation handler
  const descriptionChangeHandler = (text) => {
    text.trim().length === 0
      ? setDescriptionIsValid(false)
      : setDescriptionIsValid(true);
    setDescription(text);
  };

  // submit handler
  const submitHandler = useCallback(() => {
    if (!housingNameIsValid || !housingAddressIsValid || !descriptionIsValid) {
      setHousingNameSubmitted(true);
      setHousingAddressSubmitted(true);
      setDescriptionSubmitted(true);
    } else {
      dispatch(
        accommodationActions.createReservation(
          tripId,
          housingName,
          housingAddress,
          description,
          reservationDetails,
        ),
      );
      props.navigation.goBack();
    }
  }, [
    props.navigation,
    dispatch,
    tripId,
    housingName,
    housingNameIsValid,
    housingAddress,
    housingAddressIsValid,
    description,
    descriptionIsValid,
    reservationDetails,
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.metrics}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={housingName}
          onChangeText={housingNameChangeHandler}
        />
        {!housingNameIsValid && housingNameSubmitted && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Enter a housing name!</Text>
          </View>
        )}
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={housingAddress}
          onChangeText={housingAddressChangeHandler}
        />
        {!housingAddressIsValid && housingAddressSubmitted && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Enter a valid address!</Text>
          </View>
        )}
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={descriptionChangeHandler}
        />
        {!descriptionIsValid && descriptionSubmitted && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Enter a description!</Text>
          </View>
        )}
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>Reservation details</Text>
        <TextInput
          multiline
          style={styles.input}
          value={reservationDetails}
          onChangeText={setReservationDetails}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddAccommodationScreen;
