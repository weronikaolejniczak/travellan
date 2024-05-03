import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { View as Container } from 'utils';
import * as yup from 'yup';

import { sendResetEmail } from 'actions/userActions';
import { useDispatch } from 'react-redux';
import { Button, TextInput } from 'utils';
import { styles } from './ForgotPasswordContainerStyle';

const ForgotContainer = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    error && Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
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
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
        Alert.alert(
          'E-mail sent',
          'Please check your email for instructions on how to reset your password.',
          [
            {
              onPress: () => navigation.navigate('Auth'),
              text: 'OK',
            },
          ],
          { cancelable: false },
        );
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .email('Invalid email address')
          .required('Enter email address'),
      })}
    >
      {({ values, handleChange, errors, isValid, handleSubmit, touched }) => (
        <Container>
          <TextInput
            value={values.email}
            style={styles.input}
            onChange={handleChange('email')}
            autoCapitalize="none"
            label="Enter email"
            error={errors.email && touched.email ? errors.email : null}
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
