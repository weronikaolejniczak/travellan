import React, {useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from '../../Components/UI/Card';
import {MultiPickerMaterialDialog} from 'react-native-material-dialog';
import * as accommodationActions from '../../Stores/Actions/Accommodation';
import {addAccommodationScreenStyle as styles} from './AddAccommodationScreenStyle';
import Colors from '../../Constants/Colors';

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

  // amenities
  const amenities = [
    'parking',
    'swimming pool',
    'pets allowed',
    'spa',
    'wifi in rooms',
    'bar',
  ];
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [multiPickerVisible, setMultiPickerVisible] = useState(false);

  // hotel hours
  const [hotelHours, setHotelHours] = useState('');
  const [hotelHoursIsValid, setHotelHoursIsValid] = useState(false);
  const [hotelHoursSubmitted, setHotelHoursSubmitted] = useState(false);

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

  // hotel hours validation handler
  const hotelHoursChangeHandler = (text) => {
    text.trim().length === 0
      ? setHotelHoursIsValid(false)
      : setHotelHoursIsValid(true);
    setHotelHours(text);
  };

  // submit handler
  const submitHandler = useCallback(() => {
    if (
      !housingNameIsValid ||
      !housingAddressIsValid ||
      !descriptionIsValid ||
      !hotelHoursIsValid
    ) {
      setHousingNameSubmitted(true);
      setHousingAddressSubmitted(true);
      setDescriptionSubmitted(true);
      setHotelHoursSubmitted(true);
    } else {
      dispatch(
        accommodationActions.createReservation(
          tripId,
          housingName,
          housingAddress,
          selectedAmenities,
          hotelHours,
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
    selectedAmenities,
    hotelHours,
    hotelHoursIsValid,
    description,
    descriptionIsValid,
    reservationDetails,
  ]);

  return (
    <ScrollView indicatorStyle={'white'} style={styles.container}>
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
        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
          <Text style={styles.label}>Amenities</Text>
          <TouchableOpacity
            onPress={() => {
              setMultiPickerVisible(true);
            }}
            style={styles.iconButton}>
            <Icon
              name={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <MultiPickerMaterialDialog
          title={'Pick accommodation amenities'}
          colorAccent={Colors.primary}
          items={amenities.map((row, index) => {
            return {value: index, label: row};
          })}
          visible={multiPickerVisible}
          selectedItems={selectedAmenities}
          onCancel={() => setMultiPickerVisible(false)}
          onOk={(result) => {
            setMultiPickerVisible(false);
            setSelectedAmenities(result.selectedItems);
          }}
        />
        <View style={{marginHorizontal: '10%'}}>
          {selectedAmenities.map((item) => (
            <Card style={{marginTop: 10, padding: 15}}>
              <Text style={styles.text}>{item.label}</Text>
            </Card>
          ))}
        </View>
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>Hotel hours</Text>
        <TextInput
          multiline
          style={styles.input}
          value={hotelHours}
          onChangeText={hotelHoursChangeHandler}
        />
        {!hotelHoursIsValid && hotelHoursSubmitted && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Enter hotel hours</Text>
          </View>
        )}
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          multiline
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
