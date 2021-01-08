import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
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

import * as userActions from 'actions/userActions';
import Colors from 'constants/Colors';
import auth from '@react-native-firebase/auth';
import { Input } from '../components';
import { styles } from './RegisterContainerStyle';
import { useFormik } from 'formik';

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
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
      errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.confirmPassword) {
      errors.lastName = 'Required';
    } else if (values.lastName.length > 20) {
      errors.lastName = 'Must be 20 characters or less';
    }

    return errors;
  };

  const handleSubmit = () => {
    if (
      formState.inputValues.password !== formState.inputValues.confirmPassword
    ) {
      alert("Passwords don't match");
    } else {
      authHandler();
    }
  };

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

  return (
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
          <Input
            style={[styles.input]}
            id="email"
            label="E-mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            styles={styles.input}
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password (at least 5 characters)"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            styles={styles.input}
            id="confirmPassword"
            label="Confirm Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="The passwords must match"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
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
  );
};

export default RegisterContainer;
