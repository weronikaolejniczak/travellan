import * as yup from 'yup';
import React, { useCallback, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as accommodationActions from 'actions/accommodationActions';
import fetchHotelByName from 'services/fetchHotelByName';
import {
  Button,
  ScrollView as Container,
  ErrorFrame,
  Headline,
  ItemlessFrame,
  Subheading,
  TextInput,
  Text,
  Paragraph,
} from 'utils';
import { HotelCard } from 'components';
import { styles } from './AddAccommodationByNameStyleContainer';

const AddAccommodationByNameContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { tripId, startDate, endDate, cityCode } = route.params;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isDateSame, setIsDateSame] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState();

  const formatDate = (date) => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const fetchHotel = useCallback(
    async (hotelName) => {
      try {
        const result = await fetchHotelByName(cityCode, hotelName);
        setData(result);
      } catch {
        setError(error);
      }
    },
    [cityCode, error],
  );

  const cancelAction = () => setData(null);

  const submitHandler = async () => {
    setError('');
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
          data.location,
          data.name,
          data.phone,
          '',
        ),
      );
      setIsLoading(false);
      navigation.navigate('Accommodation', { tripId: selectedTrip.id });
    } catch {
      setError('Something went wrong!');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (formatDate(startDate) === formatDate(endDate)) {
      setIsDateSame(true);
    } else {
      setIsDateSame(false);
    }
  }, [data, endDate, startDate]);

  if (error) {
    return <ErrorFrame error={error} />;
  }

  if (cityCode === undefined)
    return (
      <ItemlessFrame>
        Sorry, searching for hotels by name near your destination is impossible!
      </ItemlessFrame>
    );

  if (isDateSame)
    return (
      <ItemlessFrame>
        Sorry, searching for hotels by name is not possible if you are going on
        one day trip!
      </ItemlessFrame>
    );

  if (data)
    return (
      <Container contentContainerStyle={styles.container}>
        <Headline style={styles.headline}>Verify hotel data</Headline>
        <Subheading style={styles.caution}>
          Be sure to check it's valid!
        </Subheading>
        <View style={styles.hotelCardWrapper}>
          <HotelCard {...data} />
        </View>
        <View style={styles.actionsWrapper}>
          <View style={styles.buttonContainer}>
            <Button
              loading={isLoading}
              disabled={isLoading}
              onPress={submitHandler}
            >
              Save hotel
            </Button>
            <Button
              loading={isLoading}
              disabled={isLoading}
              onPress={cancelAction}
              mode="outlined"
            >
              Try again
            </Button>
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
        setError('');
        setIsLoading(true);
        try {
          await fetchHotel(values.hotelName);
          setIsLoading(false);
        } catch {
          setError(error);
          setIsLoading(false);
        }
      }}
      validationSchema={yup.object().shape({
        hotelName: yup.string().max(40).required('Cannot be left empty'),
      })}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <Container>
          <Subheading style={styles.paragraph}>
            Add your accomodation by typing name of your hotel:
          </Subheading>
          <TextInput
            label="Hotel name"
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
          <Text style={styles.text}>
            Searching for hotel may take up to one minute!
          </Text>
        </Container>
      )}
    </Formik>
  );
};

export default AddAccommodationByNameContainer;
