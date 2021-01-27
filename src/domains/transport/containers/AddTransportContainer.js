import * as yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { memo, useState } from 'react';
import { Formik } from 'formik';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  ScrollView as Container,
  DateTimePicker,
  Text,
  TextInput,
  Title,
} from 'utils';
import { createTransportRequest } from 'actions/transportActions';
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

  const [isTicketTo, setToDestination] = useState(true);
  const [isTicketFrom, setFromDestination] = useState(false);
  // const [QR, setQR] = useState('');
  // const [PDFUri, setPDFUri] = useState('');
  const [dateOfDeparture, setDateOfDeparture] = useState(
    new Date(departureDate),
  );
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleToDestinationSwitch = () => {
    setToDestination((previousState) => !previousState);
    setFromDestination((previousState) => !previousState);
  };

  const toggleFromDestinationSwitch = () => {
    setFromDestination((previousState) => !previousState);
    setToDestination((previousState) => !previousState);
  };

  return (
    <Formik
      initialValues={{
        address: '',
      }}
      onSubmit={async (values) => {
        setError('');
        setIsLoading(true);
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
              <Text
                style={isTicketTo ? styles.activeLabel : styles.disactiveLabel}
              >
                to
              </Text>
              <TouchableOpacity onPress={toggleToDestinationSwitch}>
                <Icon
                  name={isTicketTo ? 'radiobox-marked' : 'radiobox-blank'}
                  style={[
                    isTicketTo
                      ? styles.activeRadioIcon
                      : styles.nonActiveRadioIcon,
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.radio}>
              <Text
                style={
                  isTicketFrom ? styles.activeLabel : styles.disactiveLabel
                }
              >
                from
              </Text>
              <TouchableOpacity onPress={toggleFromDestinationSwitch}>
                <Icon
                  name={isTicketFrom ? 'radiobox-marked' : 'radiobox-blank'}
                  style={[
                    isTicketFrom
                      ? styles.activeRadioIcon
                      : styles.nonActiveRadioIcon,
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.destination}>
              <Title>{selectedTrip.destination}</Title>
            </View>
          </View>

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
