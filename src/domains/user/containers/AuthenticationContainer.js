import React, { useCallback, useEffect, useReducer, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as userActions from 'actions/userActions';
import * as yup from 'yup';
import Colors from 'constants/Colors';
import Input from '../components/input/Input';
import { Formik } from 'formik';
import { styles } from './AuthenticationContainerStyle';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthenticationContainer = (props) => {
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
        let action;
        action = userActions.loginRequest(values.email, values.password);
        try {
          await dispatch(action);
          setIsLoading(false);
          props.navigation.navigate('My Trips');
        } catch (err) {
          setError(err.message);
        }
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
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.screen}
        >
          <View style={styles.authContainer}>
            <ScrollView>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Image
                  style={{ height: 150, resizeMode: 'stretch', width: 150 }}
                  source={require('assets/images/logo.png')}
                />
              </View>
              <View style={styles.formControl}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  value={values.email}
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                />
                {touched.email && errors.email && (
                  <View style={styles.errorContainer}>
                    <Text style={{ color: Colors.error }}>{errors.email}</Text>
                  </View>
                )}
              </View>
              <View style={styles.formControl}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  value={values.password}
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  secureTextEntry={true}
                />
                {touched.password && errors.password && (
                  <View style={styles.errorContainer}>
                    <Text style={{ color: Colors.error }}>
                      {errors.password}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.actionsContainer}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.white} />
                ) : (
                  <TouchableOpacity
                    style={[styles.buttonContainer, { marginRight: 10 }]}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Register');
                  }}
                >
                  <Text style={styles.buttonText}>Switch to Sign up</Text>
                </TouchableOpacity>
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
