import React, {useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MultiPickerMaterialDialog} from 'react-native-material-dialog';
import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
import Card from 'components/card/Card';
import * as accommodationActions from 'accommodation/state/Actions';
import {addAccommodationStyle as styles} from './AddAccommodationStyle';
import Colors from 'constants/Colors';

const AddAccommodation = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const amenities = [
    'parking',
    'swimming pool',
    'pets allowed',
    'spa',
    'wifi in rooms',
    'bar',
  ];

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  const [housingName, setHousingName] = useState('');
  const [housingNameIsValid, setHousingNameIsValid] = useState(false);
  const [housingNameSubmitted, setHousingNameSubmitted] = useState(false);
  const [housingAddress, setHousingAddress] = useState('');
  const [housingAddressIsValid, setHousingAddressIsValid] = useState(false);
  const [housingAddressSubmitted, setHousingAddressSubmitted] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [multiPickerVisible, setMultiPickerVisible] = useState(false);
  const [hotelHours, setHotelHours] = useState('');
  const [hotelHoursIsValid, setHotelHoursIsValid] = useState(false);
  const [hotelHoursSubmitted, setHotelHoursSubmitted] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const [descriptionSubmitted, setDescriptionSubmitted] = useState(false);
  const [reservationDetails, setReservationDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /** HANDLERS - REFACTOR*/
  // Validates housing name.
  const housingNameChangeHandler = (text) => {
    text.trim().length === 0
      ? setHousingNameIsValid(false)
      : setHousingNameIsValid(true);
    setHousingName(text);
  };
  // Validates housing address.
  const housingAddressChangeHandler = (text) => {
    text.trim().length === 0
      ? setHousingAddressIsValid(false)
      : setHousingAddressIsValid(true);
    setHousingAddress(text);
  };
  // Validates housing description.
  const descriptionChangeHandler = (text) => {
    text.trim().length === 0
      ? setDescriptionIsValid(false)
      : setDescriptionIsValid(true);
    setDescription(text);
  };
  // Validates hotel hours.
  const hotelHoursChangeHandler = (text) => {
    text.trim().length === 0
      ? setHotelHoursIsValid(false)
      : setHotelHoursIsValid(true);
    setHotelHours(text);
  };
  // Submits.
  const submitHandler = useCallback(async () => {
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
      setIsLoading(true);
      await dispatch(
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
      props.navigation.navigate('Accommodation', {
        tripId: selectedTrip.id,
      });
      setIsLoading(false);
    }
  }, [
    housingNameIsValid,
    housingAddressIsValid,
    descriptionIsValid,
    hotelHoursIsValid,
    dispatch,
    tripId,
    housingName,
    housingAddress,
    selectedAmenities,
    hotelHours,
    description,
    reservationDetails,
    props.navigation,
    selectedTrip.id,
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
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {selectedAmenities.map((item) => (
            <Card style={styles.amenityCard}>
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
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={submitHandler}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default AddAccommodation;
