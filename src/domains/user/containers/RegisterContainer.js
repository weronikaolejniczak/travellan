import React, { useCallback, useEffect, useReducer, useState } from 'react';
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
import auth from '@react-native-firebase/auth';
import { Formik, useFormik } from 'formik';
import { Input } from '../components';
import { styles } from './RegisterContainerStyle';

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

const RegisterContainer = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    formIsValid: false,
    inputValidities: {
      confirmPassword: false,
      email: false,
      password: false,
    },
    inputValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
    }
  }, [error]);
  /**
  const handleSubmit = () => {
    if (
      formState.inputValues.password !== formState.inputValues.confirmPassword
    ) {
      alert("Passwords don't match");
    } else {
      authHandler();
    }
  };

  */

  const authHandler = async () => {
    let action;
    action = userActions.signUpRequest(
      formState.inputValues.email,
      formState.inputValues.password,
    );
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(action);
      props.navigation.navigate('Auth');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  /**
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        input: inputIdentifier,
        isValid: inputValidity,
        type: FORM_INPUT_UPDATE,
        value: inputValue,
      });
    },
    [dispatchFormState],
  );
  */

  return (
    <Formik
      initialValues={{
        confirmPassword: '',
        email: '',
        password: '',
      }}
      onSubmit={(values) => Alert.alert(JSON.stringify(values))}
      validationSchema={yup.object().shape({
        confirmPassword: yup
          .string()
          .required('Required')
          .oneOf([yup.ref('password'), null], 'Passwords must match'),
        email: yup.string().email('Invalid email address').required('Required'),
        password: yup
          .string()
          .required('Required')
          .matches(
            /[a-zA-Z0-9_]/,
            'Password can only contain Latin letters and numbers.',
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
                <Text style={styles.label}>Email</Text>
                <TextInput
                  value={values.email}
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                />
                {touched.email && errors.email && (
                  <View style={styles.errorContainer}>
                    <Text style={{ color: Colors.red }}>{errors.email}</Text>
                  </View>
                )}
              </View>
              <View style={styles.formControl}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  value={values.password}
                  style={styles.input}
                  label="Password"
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                />
                {touched.password && errors.password && (
                  <View style={styles.errorContainer}>
                    <Text style={{ color: Colors.red }}>
                      {errors.password}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.formControl}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  value={values.confirmPassword}
                  style={styles.input}
                  label="Confirm Password"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={() => setFieldTouched('confirmPassword')}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <View style={styles.errorContainer}>
                    <Text style={{ color: Colors.red }}>
                      {errors.confirmPassword}
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
                    <Text style={styles.buttonText}>Join</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Auth');
                  }}
                >
                  <Text style={styles.buttonText}>Or sign in instead</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default RegisterContainer;
