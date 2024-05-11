import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { createAccommodationRequest } from 'actions/accommodationActions';
import { HotelCard } from 'components';
import fetchHotelByName from 'services/fetchHotelByName';
import {
  Button,
  ScrollView as Container,
  ErrorFrame,
  Headline,
  ItemlessFrame,
  Subheading,
  Text,
  TextInput,
} from 'utils';
import { styles } from './AddAccommodationByNameStyleContainer';

const AddAccommodationByNameContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { tripId, startDate, endDate, latitude, longitude } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [isDateSame, setIsDateSame] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState();

  const formatDate = (date) => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  };

  const fetchHotel = useCallback(
    async (hotelName) => {
      try {
        const result = await fetchHotelByName(latitude, longitude, hotelName);
        setData(result);
      } catch {
        setError(error);
      }
    },
    [error, latitude, longitude],
  );

  const cancelAction = () => setData(null);

  const submitHandler = async () => {
    setError('');
    try {
      setIsLoading(true);
      await dispatch(
        createAccommodationRequest(
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
          '',
        ),
      );
      navigation.navigate('Accommodation', { tripId });
      setIsLoading(false);
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

  if (!latitude || !longitude) {
    return (
      <ItemlessFrame>
        Sorry, searching for hotels by name near your destination is impossible!
      </ItemlessFrame>
    );
  }

  if (isDateSame) {
    return (
      <ItemlessFrame>
        Sorry, searching for hotels by name is not possible if you are going on
        one day trip!
      </ItemlessFrame>
    );
  }

  if (data) {
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
  }

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
