import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
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
      onSubmit={async (values, actions) => {
        setError(null);
        setIsLoading(true);
        let action;
        action = signUpRequest(values.email, values.password);
        try {
          await dispatch(action);
          setIsLoading(false);
          props.navigation.navigate('My trips');
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
        actions.resetForm();
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
      {({ values, handleChange, errors, isValid, handleSubmit, touched }) => (
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
                  error={errors.email && touched.email ? errors.email : null}
                />
              </View>
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
              <View style={styles.formControl}>
                <TextInput
                  value={values.confirmPassword}
                  autoCapitalize="none"
                  onChange={handleChange('confirmPassword')}
                  secureTextEntry={true}
                  label="Confirm Password"
                  error={
                    errors.confirmPassword && touched.confirmPassword
                      ? errors.confirmPassword
                      : null
                  }
                />
              </View>
              <View style={styles.actionsContainer}>
                <View style={styles.innerContainer}>
                <Button
                    onPress={() => {
                      props.navigation.navigate('Auth');
                    }}
                    mode="outlined"
                    style={styles.registerButton}
                  >
                    Sign in
                  </Button>
                  <Button
                    loading={isLoading}
                    disabled={isLoading}
                    onPress={handleSubmit}
                    style={styles.registerButton}
                  >
                    Sign up
                  </Button>
                </View>
                <View style={styles.textPrivate}>
                  <Text style={styles.color_textPrivate}>
                    By registering, you confirm that you accept our{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        'https://travellan.flycricket.io/terms.html',
                      )
                    }
                  >
                    <Text style={styles.linkText}>Terms of service</Text>
                  </TouchableOpacity>
                  <Text style={styles.color_textPrivate}> and </Text>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        'https://travellan.flycricket.io/privacy.html',
                      )
                    }
                  >
                    <Text style={styles.linkText}>Privacy Policy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default RegisterContainer;
