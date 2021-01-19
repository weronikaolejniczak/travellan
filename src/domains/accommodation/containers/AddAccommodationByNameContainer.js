import React, { useCallback, useEffect, useState } from 'react';
import fetchHotelByName from 'services/fetchHotelByName';
import {
  Button,
  ScrollView as Container,
  Headline,
  ItemlessFrame,
  TextInput,
  Subheading,
} from 'utils';
import { View } from 'react-native';
import { HotelCard } from 'components';
import { styles } from './AddAccommodationByNameStyleContainer';
import * as accommodationActions from 'actions/accommodationActions';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

const AddAccommodationByNameContainer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDateSame, setIsDateSame] = useState(true);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState();
  const { tripId, startDate, endDate, cityCode } = props.route.params;
  const dispatch = useDispatch();
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const formatDate = (date) => {
    //format to YYYY-MM-DD
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const handleChange = (val) => setValue(val);

  const fetchHotel = useCallback(async () => {
    try {
      const result = await fetchHotelByName(cityCode, value);
      setData(result);
    } catch {
      setError(error);
    }
  }, [cityCode, error, value]);

  const handlePress = () => {
    setIsLoading(true);
    handleChange();
    fetchHotel(cityCode, value);
    setIsLoading(false);
  };

  const cancelAction = () => setData(null);

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(
        accommodationActions.createAccommodationRequest(
          tripId,
          data.amenities,
          '',
          '',
          '',
          '',
          data.creditCardPaymentPossible,
          data.description,
          '',
          data.image,
          data.location.address,
          data.name,
          data.phone,
          '',
        ),
      );
      setIsLoading(false);
      navigation.navigate('Accomodation', { tripId: selectedTrip.id });
    } catch {
      setError('Something went wrong!');
    }
  };

  useEffect(() => {
    if (formatDate(startDate) === formatDate(endDate)) {
      setIsDateSame(true);
    } else {
      setIsDateSame(false);
    }
  }, [data]);

  if (cityCode === undefined)
    return (
      <ItemlessFrame message="Sorry, searching for hotels by name near your destination is impossible!" />
    );

  if (isDateSame)
    return (
      <ItemlessFrame message="Sorry, searching for hotels by name is not possible if you are going on one day trip!" />
    );

  if (data)
    return (
      <Container contentContainerStyle={styles.container}>
        <View style={styles.paddingTop}>
          <Headline style={styles.headline}>1. Verify hotel data</Headline>
          <Subheading style={styles.caution}>
            Be sure to check it's valid!
          </Subheading>
          <View style={styles.hotelCardWrapper}>
            <HotelCard {...data} />
          </View>
          <View style={styles.smallPaddingTop}>
            <Headline style={styles.headline}>
              2. Is this the hotel thay you were looking for?
            </Headline>
            <View style={styles.buttonContainer}>
              <Button
                loading={isLoading}
                disabled={isLoading}
                onPress={submitHandler}
              >
                Yes, save hotel
              </Button>
              <Button
                loading={isLoading}
                disabled={isLoading}
                onPress={cancelAction}
              >
                No, try again
              </Button>
            </View>
          </View>
        </View>
      </Container>
    );

  return (
    <Formik
      initialValues={{
        hotelName: '',
      }}
      onSubmit={async (values) => {
        setError(null);
        setIsLoading(true);
        try {
          const result = await fetchHotelByName(cityCode, value);
          setData(result);
        } catch {
          setError(error);
        }
      }}
      validationSchema={yup.object().shape({
        hotelName: yup.string().max(40).required('Cannot be left empty'),
      })}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <Container>
          <View style={{ marginBottom: 10, marginTop: 10 }}>
            <Headline>
              Add your accomodation by typing name of your hotel
            </Headline>
          </View>
          <TextInput
            label="Hotel name"
            error={error}
            onChange={handleChange('hotelName')}
            value={values.hotelName}
            error={
              errors.hotelName && touched.hotelName ? errors.hotelName : null
            }
          />
          <Button
            loading={isLoading}
            disabled={isLoading}
            onPress={handleSubmit}
          >
            Submit
          </Button>
        </Container>
      )}
    </Formik>
  );
};

export default AddAccommodationByNameContainer;
