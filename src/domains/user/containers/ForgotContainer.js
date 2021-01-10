import * as yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { View as Container } from 'utils';
import { Formik } from 'formik';

import { Button, TextInput } from 'utils';
import { sendResetEmail } from 'actions/userActions';
import { styles } from './ForgotContainerStyle';
import { useDispatch } from 'react-redux';

const ForgotContainer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

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
      onSubmit={async (values) => {
        setError(null);
        setIsLoading(true);
        let action;
        action = sendResetEmail(values.email);
        try {
          dispatch(action);
          setIsLoading(false);
          //navigation to screen placeholder
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .email('Invalid email address')
          .required('Enter email address'),
      })}
    >
      {({ values, handleChange, errors, isValid, handleSubmit }) => (
        <Container>
          <TextInput
            value={values.email}
            style={styles.input}
            onChange={handleChange('email')}
            autoCapitalize="none"
            label="Enter email"
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
  headerTitle: 'Forgot Password?',
};

export default ForgotContainer;
