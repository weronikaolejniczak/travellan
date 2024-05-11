import React, { useEffect, useState } from 'react';
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
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  authenticate,
  loginRequest,
  onFacebookButtonPress,
  onGoogleButtonPress,
} from 'actions/userActions';
import { Formik } from 'formik';
import { Button, LoadingFrame, TextInput } from 'utils';
import * as yup from 'yup';
import { SocialButton } from '../components';
import { styles } from './AuthenticationContainerStyle';

const AuthenticationContainer = ({ navigation }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const tryLogin = async () => {
      setIsChecking(true);
      const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        SplashScreen.hide();
        if (error) {
          Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
        }
        setIsChecking(false);
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        SplashScreen.hide();
        if (error) {
          Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
        }
        setIsChecking(false);
        return;
      }

      navigation.navigate('My trips');
      dispatch(authenticate(userId, token));
      setIsChecking(false);
    };

    tryLogin();
  }, [dispatch, error, navigation]);

  const handleGoogle = async () => {
    setError(null);
    setIsLoading(true);
    const action = onGoogleButtonPress();
    try {
      setError(null);
      await dispatch(action);
      navigation.navigate('My trips');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  const handleFacebook = async () => {
    setError(null);
    setIsLoading(true);
    const action = onFacebookButtonPress();
    try {
      setError(null);
      await dispatch(action);
      navigation.navigate('My trips');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  /**
  useEffect(() => {
    SplashScreen.hide();
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  */

  if (isChecking) {
    return <LoadingFrame />;
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async (values, actions) => {
        setIsLoading(true);
        const action = loginRequest(values.email, values.password);
        try {
          await dispatch(action);
          setIsLoading(false);
          actions.resetForm();
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
      {({ values, handleChange, errors, handleSubmit, touched }) => (
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
                  label="Email"
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
              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                  <Text style={styles.forgot}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.innerContainer}>
                  <Button
                    loading={isLoading}
                    disabled={isLoading}
                    onPress={handleSubmit}
                    style={styles.authButton}
                  >
                    Sign in
                  </Button>
                </View>
                <View style={styles.socialsContainer}>
                  <SocialButton
                    buttonTitle="Sign In with Facebook"
                    btnType="facebook"
                    color="#4867aa"
                    backgroundColor="#e6eaf4"
                    onPress={() => handleFacebook()}
                  />
                  <SocialButton
                    buttonTitle="Sign In with Google"
                    btnType="google"
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                    onPress={() => handleGoogle()}
                  />
                </View>
                <Button
                  onPress={() => navigation.navigate('Register')}
                  mode="outlined"
                  style={styles.authButton}
                >
                  Sign up with email
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
