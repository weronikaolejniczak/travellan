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

import Card from 'components/card/Card';
import * as accommodationActions from 'actions/accommodationActions';
import {styles} from './AddAccommodationContainerStyle';
import Colors from 'constants/Colors';

const AddAccommodationContainer = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const availableAmmenities = [
    'parking',
    'swimming pool',
    'pets allowed',
    'spa',
    'wifi in rooms',
    'bar',
  ];

  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(false);
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [address, setAddress] = useState('');
  const [addressIsValid, setAddressIsValid] = useState(false);
  const [addressSubmitted, setAddressSubmitted] = useState(false);
  const [amenities, setAmmenities] = useState([]);
  const [multiPickerVisible, setMultiPickerVisible] = useState(false);
  const [hotelHours, setHotelHours] = useState('');
  const [hotelHoursIsValid, setHotelHoursIsValid] = useState(false);
  const [hotelHoursSubmitted, setHotelHoursSubmitted] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const [descriptionSubmitted, setDescriptionSubmitted] = useState(false);
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const nameChangeHandler = (text) => {
    text.trim().length === 0 ? setNameIsValid(false) : setNameIsValid(true);
    setName(text);
  };

  const addressChangeHandler = (text) => {
    text.trim().length === 0
      ? setAddressIsValid(false)
      : setAddressIsValid(true);
    setAddress(text);
  };

  const descriptionChangeHandler = (text) => {
    text.trim().length === 0
      ? setDescriptionIsValid(false)
      : setDescriptionIsValid(true);
    setDescription(text);
  };

  const hotelHoursChangeHandler = (text) => {
    text.trim().length === 0
      ? setHotelHoursIsValid(false)
      : setHotelHoursIsValid(true);
    setHotelHours(text);
  };

  const submitHandler = useCallback(async () => {
    if (
      !nameIsValid ||
      !addressIsValid ||
      !descriptionIsValid ||
      !hotelHoursIsValid
    ) {
      setNameSubmitted(true);
      setAddressSubmitted(true);
      setDescriptionSubmitted(true);
      setHotelHoursSubmitted(true);
    } else {
      setIsLoading(true);
      await dispatch(
        accommodationActions.createAccommodationRequest(
          tripId,
          name,
          address,
          amenities,
          hotelHours,
          description,
          details,
        ),
      );
      props.navigation.navigate('Accommodation', {
        tripId: selectedTrip.id,
      });
      setIsLoading(false);
    }
  }, [
    nameIsValid,
    addressIsValid,
    descriptionIsValid,
    hotelHoursIsValid,
    dispatch,
    tripId,
    name,
    address,
    amenities,
    hotelHours,
    description,
    details,
    props.navigation,
    selectedTrip.id,
  ]);

  return (
    <ScrollView indicatorStyle={'white'} style={styles.container}>
      <View style={styles.metrics}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={nameChangeHandler}
        />
        {!nameIsValid && nameSubmitted && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Enter a housing name!</Text>
          </View>
        )}
      </View>

      <View style={styles.metrics}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={addressChangeHandler}
        />
        {!addressIsValid && addressSubmitted && (
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
          title={'Pick accommodation availableAmmenities'}
          colorAccent={Colors.primary}
          items={availableAmmenities.map((row, index) => {
            return {value: index, label: row};
          })}
          visible={multiPickerVisible}
          selectedItems={amenities}
          onCancel={() => setMultiPickerVisible(false)}
          onOk={(result) => {
            setMultiPickerVisible(false);
            setAmmenities(result.selectedItems);
          }}
        />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {amenities.map((item) => (
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
        <Text style={styles.label}> details</Text>
        <TextInput
          multiline
          style={styles.input}
          value={details}
          onChangeText={setDetails}
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

export default AddAccommodationContainer;
