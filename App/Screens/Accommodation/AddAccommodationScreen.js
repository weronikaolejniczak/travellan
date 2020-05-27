import React, {useState, useCallback} from 'react';
import {
  Text,
  View,
  //Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import * as accommodationActions from '../../Stores/Actions/Accommodation';
import {addAccommodationScreenStyle as styles} from './AddAccommodationScreenStyle';

const AddAccommodationScreen = (props) => {
  const dispatch = useDispatch();

  const [housingName, setHousingName] = useState('');
  const [housingAddress, setHousingAddress] = useState('');
  const [reservationDetails, setReservationDetails] = useState('');

  const tripId = props.route.params.tripId;

  const submitHandler = useCallback(() => {
    dispatch(
      accommodationActions.createReservation(
        tripId,
        housingName,
        housingAddress,
        reservationDetails,
      ),
    );
    props.navigation.goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, tripId, housingName, housingAddress, reservationDetails]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.metrics}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={housingName}
          onChangeText={setHousingName}
        />
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={housingAddress}
          onChangeText={setHousingAddress}
        />
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>Reservation details</Text>
        <TextInput
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
