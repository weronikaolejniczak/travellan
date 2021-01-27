import * as yup from 'yup';
import React, { useCallback, useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Button, ScrollView as Container, TextInput } from 'utils';
import { Formik } from 'formik';
import { editAccommodationRequest } from 'actions/accommodationActions';
import { useDispatch } from 'react-redux';

const EditAccommodation = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const {
    tripId,
    amenities,
    breakfast,
    checkInExtra,
    checkInHours,
    checkOutHours,
    creditCardPaymentPossible,
    description,
    frontDesk24H,
    image,
    location,
    name,
    phone,
    reservationDetails,
    PDF,
  } = route.params;

  return (
    <Formik
      initialValues={{
        phone: phone,
        reservationDetails: reservationDetails,
      }}
      onSubmit={async (values, actions) => {
        setIsLoading(true);
        const action = editAccommodationRequest(
          tripId,
          amenities,
          breakfast,
          checkInExtra,
          checkInHours,
          checkOutHours,
          creditCardPaymentPossible,
          description,
          frontDesk24H,
          image,
          location,
          name,
          values.phone,
          values.reservationDetails,
          PDF,
        );
        try {
          await dispatch(action);
          setIsLoading(false);
          actions.resetForm();
          navigation.navigate('Accommodation');
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      }}
      validationSchema={yup.object().shape({
        phone: yup
          .string()
          .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          ),

        reservationDetails: yup.string().max(100),
      })}
    >
      {({ values, handleChange, errors, isValid, handleSubmit, touched }) => (
        <Container keyboardShouldPersistTaps="always">
          <TextInput
            value={values.phone}
            onChange={handleChange('email')}
            autoCapitalize="none"
            label="Email"
            error={errors.phone && touched.phone ? errors.phone : null}
          />
          <TextInput
            value={values.password}
            autoCapitalize="none"
            onChange={handleChange('password')}
            secureTextEntry={true}
            label="Password"
            error={
              errors.reservationDetails && touched.reservationDetails
                ? errors.reservationDetails
                : null
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

export default EditAccommodation;
