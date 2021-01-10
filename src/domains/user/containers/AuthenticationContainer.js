import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
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
import { loginRequest } from 'actions/userActions';
import { styles } from './AuthenticationContainerStyle';

const AuthenticationContainer = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const ForgotMovement = ({ navigation, }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
      <Text style={styles.forgot}>Forgot Password?</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    SplashScreen.hide();
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async (values) => {
        setError(null);
        setIsLoading(true);
        let action;
        action = loginRequest(values.email, values.password);
        try {
          await dispatch(action);
          setIsLoading(false);
          props.navigation.navigate('My trips');
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .email('Invalid email address')
          .required('Cannot be left empty'),
        password: yup
          .string()
          .min(6)
          .max(20)
          .required('Cannot be left empty')
          .matches(
            /[a-zA-Z0-9_]/,
            'Password only contains Latin letters and numbers.',
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
                  style={styles.input}
                  onChange={handleChange('email')}
                  autoCapitalize="none"
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
                <ForgotMovement />
              </View>
              <View style={styles.actionsContainer}>
                <Button
                  loading={isLoading}
                  disabled={isLoading}
                  onPress={handleSubmit}
                >
                  Login
                </Button>
                <Button
                  onPress={() => props.navigation.navigate('Register')}
                  mode="outlined"
                >
                  Create new account
                </Button>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export const authOptions = {
  headerShown: false,
};

export default AuthenticationContainer;
