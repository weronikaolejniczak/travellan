import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';
import { Button, TextInput } from 'utils';
import { Formik } from 'formik';
import { signUpRequest } from 'actions/userActions';
import { styles } from './RegisterContainerStyle';

const RegisterContainer = (props) => {
  const dispatch = useDispatch();
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
        confirmPassword: '',
        email: '',
        password: '',
      }}
      onSubmit={async (values) => {
        setError(null);
        setIsLoading(true);
        let action;
        action = signUpRequest(values.email, values.password);
        try {
          await dispatch(action);
          setIsLoading(false);
          props.navigation.navigate('Auth');
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      }}
      validationSchema={yup.object().shape({
        confirmPassword: yup
          .string()
          .required('Cannot be left empty')
          .oneOf([yup.ref('password'), null], 'Passwords must match'),
        email: yup
          .string()
          .email('Invalid email address')
          .required('Cannot be left empty'),
        password: yup
          .string()
          .min(6, 'Password must be at least 6 characters long')
          .max(20, 'Password cannot exceed 20 characters')
          .required('Cannot be left empty')
          .matches(
            /[a-zA-Z0-9_]/,
            'Password can only contain Latin letters and numbers.',
          ),
      })}
    >
      {({ values, handleChange, errors, isValid, handleSubmit }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.screen}
        >
          <View style={styles.authContainer}>
            <ScrollView>
              <View style={styles.imageView}>
                <Image
                  style={styles.image}
                  source={require('assets/images/logo.png')}
                />
              </View>
              <View style={styles.formControl}>
                <TextInput
                  value={values.email}
                  autoCapitalize="none"
                  onChange={handleChange('email')}
                  label="E-mail"
                  error={errors.email}
                />
              </View>
              <View style={styles.formControl}>
                <TextInput
                  value={values.password}
                  autoCapitalize="none"
                  onChange={handleChange('password')}
                  secureTextEntry={true}
                  label="Password"
                  error={errors.password}
                />
              </View>
              <View style={styles.formControl}>
                <TextInput
                  value={values.confirmPassword}
                  autoCapitalize="none"
                  onChange={handleChange('confirmPassword')}
                  secureTextEntry={true}
                  label="Confirm Password"
                  error={errors.confirmPassword}
                />
              </View>
              <View style={styles.actionsContainer}>
                <Button
                  loading={isLoading}
                  disabled={isLoading}
                  onPress={handleSubmit}
                >
                  Sign up
                </Button>
                <Button
                  onPress={() => {
                    props.navigation.navigate('Auth');
                  }}
                  mode="outlined"
                >
                  Or Sign In instead
                </Button>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default RegisterContainer;
