import { editAccommodationRequest } from 'actions/accommodationActions';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ScrollView as Container, TextInput } from 'utils';
import * as yup from 'yup';

const EditAccommodationContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const {
    tripId,
    accommodationId,
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
          accommodationId,
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
          // setError(err.message);
          console.error(err);
        }
        setIsLoading(false);
      }}
      validationSchema={yup.object().shape({
        phone: yup.string().max(15),

        reservationDetails: yup.string().max(100),
      })}
    >
      {({ values, handleChange, errors, handleSubmit, touched }) => (
        <Container keyboardShouldPersistTaps="always">
          <TextInput
            value={values.phone}
            onChange={handleChange('phone')}
            autoCapitalize="none"
            label="Phone"
            error={errors.phone && touched.phone ? errors.phone : null}
          />
          <TextInput
            value={values.reservationDetails}
            autoCapitalize="none"
            onChange={handleChange('reservationDetails')}
            label="Reservation Details"
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

export default EditAccommodationContainer;
