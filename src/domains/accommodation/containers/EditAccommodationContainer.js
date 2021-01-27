import * as yup from 'yup';
import React, { useCallback, useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  Button,
  ScrollView as Container,
  DateTimePicker,
  TextInput,
} from 'utils';
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
          navigation.navigate('My trips');
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      }}
      validationSchema={yup.object().shape({
        phone: yup.string().email('Invalid email address'),

        reservationDetails: yup
          .string()
          .min(6)
          .max(20)
          .matches(
            /[a-zA-Z0-9_]/,
            'Password only contains Latin letters and numbers.',
          ),
      })}
    >
      {({ values, handleChange, errors, isValid, handleSubmit, touched }) => (
        <Container keyboardShouldPersistTaps="always">
          <TextInput
            label="City and country"
            value={destination}
            onChange={destinationChangeHandler}
            error={
              !destinationIsValid &&
              destinationSubmitted &&
              'Enter valid destination!'
            }
          />
          <TextInput
            value={values.email}
            style={styles.input}
            onChange={handleChange('email')}
            autoCapitalize="none"
            label="Email"
            error={errors.email && touched.email ? errors.email : null}
          />
          <View style={styles.formControl}>
            <TextInput
              value={values.password}
              autoCapitalize="none"
              onChange={handleChange('password')}
              secureTextEntry={true}
              label="Password"
              error={
                errors.password && touched.password ? errors.password : null
              }
            />
          </View>
          <Button
            loading={isLoading}
            disabled={isLoading}
            onPress={handleSubmit}
          >
            Sign in
          </Button>
        </Container>
      )}
    </Formik>
  );
};

export default EditAccommodation;
