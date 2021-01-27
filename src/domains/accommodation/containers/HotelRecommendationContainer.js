import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import * as yup from 'yup';
import recommendHotel from 'services/recommendHotel';
import {
  Button,
  View as Container,
  ItemlessFrame,
  Paragraph,
  TextInput,
} from 'utils';
import { Formik } from 'formik';
import { Recommendation } from '../components';
import { styles } from './HotelRecommendationContainerStyle';

const HotelRecommendationContainer = ({ navigation, route }) => {
  const { latitude, longitude, startDate, endDate } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [isDateSame, setIsDateSame] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState('');

  const formatDate = (date) => {
    // format to YYYY-MM-DD
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const findHotels = useCallback(
    async (adults, roomQuantity) => {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      try {
        const result = await recommendHotel(
          latitude,
          longitude,
          formattedStartDate,
          formattedEndDate,
          adults,
          roomQuantity,
        );
        setData(result);
      } catch {
        setError(error);
      }
    },
    [startDate, endDate, latitude, longitude, error],
  );

  const handleSelectItem = (element) => {
    navigation.navigate('Recommended hotel details', {
      hotelDetails: element,
    });
  };

  useEffect(() => {
    if (formatDate(startDate) === formatDate(endDate)) {
      setIsDateSame(true);
    } else {
      setIsDateSame(false);
    }
  }, [data, endDate, startDate]);

  if (!latitude || !longitude)
    return (
      <ItemlessFrame>
        Sorry, recommendation for hotels near your destination is impossible!
      </ItemlessFrame>
    );

  if (isDateSame)
    return (
      <ItemlessFrame>
        Recommendation for hotels is not possible if you are going on a one day
        trip!
      </ItemlessFrame>
    );

  if (data && data.length === 0)
    return (
      <ItemlessFrame>
        Sorry, we couldn't find any hotel recommendations for your trip!
      </ItemlessFrame>
    );

  if (data && data.length > 0)
    return (
      <Container>
        <FlatList
          data={data}
          keyExtractor={(item) => item.dupeId}
          renderItem={(el) => (
            <Recommendation
              data={el.item}
              onSelect={() => handleSelectItem(el.item)}
            />
          )}
        />
      </Container>
    );

  return (
    <Formik
      initialValues={{
        adults: '',
        rooms: '',
      }}
      onSubmit={async (values) => {
        setError('');
        setIsLoading(true);
        try {
          await findHotels(values.adults, values.rooms);
          setIsLoading(false);
        } catch {
          setError(error);
          setIsLoading(false);
        }
      }}
      validationSchema={yup.object().shape({
        adults: yup
          .number()
          .min(1)
          .max(100)
          .required('Cannot be empty!')
          .integer('Value must be integer!')
          .typeError('Digits only!'),
        rooms: yup
          .number()
          .min(1)
          .max(50)
          .required('Cannot be empty!')
          .integer('Value must be integer!')
          .typeError('Digits only!'),
      })}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <Container>
          <Paragraph style={styles.paragraph}>
            We will find the most attractive accommodation offers for your
            destination
          </Paragraph>

          <TextInput
            label="Number of adults"
            onChange={handleChange('adults')}
            keyboardType="numeric"
            value={values.adults}
            error={errors.adults && touched.adults ? errors.adults : null}
          />

          <TextInput
            label="Number of rooms"
            onChange={handleChange('rooms')}
            keyboardType="numeric"
            value={values.rooms}
            error={errors.rooms && touched.rooms ? errors.rooms : null}
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

export default HotelRecommendationContainer;
