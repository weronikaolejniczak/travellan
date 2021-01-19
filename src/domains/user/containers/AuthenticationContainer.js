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
import { SocialButton } from '../components';
import {
  loginRequest,
  onFacebookButtonPress,
  onGoogleButtonPress,
} from 'actions/userActions';
import { styles } from './AuthenticationContainerStyle';

const AuthenticationContainer = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
        const action = loginRequest(values.email, values.password);
        try {
          await dispatch(action);
          setIsLoading(false);
          navigation.navigate('My trips');
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
                  style={styles.input}
                  onChange={handleChange('email')}
                  autoCapitalize="none"
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
                <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                  <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
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
                  onPress={() => navigation.navigate('Register')}
                  mode="outlined"
                >
                  Create new account
                </Button>
                <SocialButton
                  buttonTitle="Sign In with Facebook"
                  btnType="facebook"
                  color="#4867aa"
                  backgroundColor="#e6eaf4"
                  onPress={() => {
                    onFacebookButtonPress();
                  }}
                />
                <SocialButton
                  buttonTitle="Sign In with Google"
                  btnType="google"
                  color="#de4d41"
                  backgroundColor="#f5e7ea"
                  onPress={() => {
                    const action = onGoogleButtonPress();
                    try {
                      setError(null);
                      dispatch(action);
                      //navigation.navigate('My trips');
                    } catch (err) {
                      setError(err.message);
                    }
                  }}
                />
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
