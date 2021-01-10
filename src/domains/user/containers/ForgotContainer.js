import * as yup from 'yup';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { View as Container } from 'utils';
import { Formik } from 'formik';

import { Button, TextInput } from 'utils';
import { styles } from './ForgotContainerStyle';
import { useDispatch } from 'react-redux';

const ForgotContainer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={(values) => {
        //placeholder
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .email('Invalid email address')
          .required('Cannot be left empty'),
      })}
    >
      {({ values, handleChange, errors, isValid, handleSubmit }) => (
        <Container>
          <TextInput
            value={values.email}
            style={styles.input}
            onChange={handleChange('email')}
            autoCapitalize="none"
            label="E-mail"
            error={errors.email}
          />
          <Button
            loading={isLoading}
            disabled={isLoading}
            onPress={handleSubmit}
          >
            Send email
          </Button>
        </Container>
      )}
    </Formik>
  );
};

export const forgotOptions = {
  headerShown: false,
};

export default ForgotContainer;
