import { Formik } from 'formik';
import React, { memo, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { createTransportRequest } from 'actions/transportActions';
import {
  Button,
  Checkbox,
  ScrollView as Container,
  DateTimePicker,
  Text,
  TextInput,
  Title,
} from 'utils';
import { styles } from './AddTransportContainerStyle';

const AddTransportContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { tripId } = route.params;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const departureDate = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  ).startDate;

  const [isTicketTo, setToDestination] = useState(false);
  const [isTicketFrom, setFromDestination] = useState(false);
  // const [QR, setQR] = useState('');
  // const [PDFUri, setPDFUri] = useState('');
  const [dateOfDeparture, setDateOfDeparture] = useState(
    new Date(departureDate),
  );
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [error, setError] = useState('');

  const toggleToDestination = () => {
    setToDestination((previousState) => !previousState);
    setValidationError('');
  };

  const toggleFromDestination = () => {
    setFromDestination((previousState) => !previousState);
    setValidationError('');
  };

  return (
    <Formik
      initialValues={{
        address: '',
      }}
      onSubmit={async (values) => {
        setError('');
        setIsLoading(true);
        if (isTicketFrom || isTicketTo) {
          try {
            await dispatch(
              createTransportRequest(
                tripId,
                isTicketTo,
                isTicketFrom,
                dateOfDeparture.toString(),
                values.address,
              ),
            );
            navigation.navigate('Transport', {
              tripId,
            });
          } catch {
            setError(error);
          }
        } else {
          setValidationError('Choose type of ticket!');
        }
        setIsLoading(false);
      }}
      validationSchema={yup.object().shape({
        address: yup.string().min(1).max(100).required('Cannot be empty!'),
      })}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <Container>
          <View style={styles.header}>
            <View style={styles.radio}>
              <Checkbox
                checked={isTicketTo}
                onPress={toggleToDestination}
                textStyle={
                  isTicketTo ? styles.activeLabel : styles.disactiveLabel
                }
              />
              <Text>to</Text>
            </View>
            <View style={styles.radio}>
              <Checkbox
                checked={isTicketFrom}
                onPress={toggleFromDestination}
                textStyle={
                  isTicketFrom ? styles.activeLabel : styles.disactiveLabel
                }
              />
              <Text>from</Text>
            </View>
            <View style={styles.destination}>
              <Title>{selectedTrip.destination}</Title>
            </View>
          </View>
          {!!validationError && (
            <View style={styles.validationErrorWrapper}>
              <Text style={styles.validationError}>{validationError}</Text>
            </View>
          )}

          <View style={styles.picker}>
            <DateTimePicker
              date={dateOfDeparture}
              label="Date of departure"
              minimumDate={dateOfDeparture}
              setShowPicker={setShowDateTimePicker}
              showPicker={showDateTimePicker}
              setDate={setDateOfDeparture}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              label="Departure address"
              onChange={handleChange('address')}
              value={values.address}
              error={errors.address && touched.address ? errors.address : null}
            />
          </View>

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

export default memo(AddTransportContainer);
