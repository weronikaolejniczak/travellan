import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import Input from '../../Components/UI/Input';
import Colors from '../../Constants/Colors';
import * as authActions from '../../Stores/Actions/Auth';
import {AuthScreenStyle as styles} from './AuthScreenStyle';
//import logo from '../../Assets/index';
//import {set} from 'react-native-reanimated';

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

const AuthScreen = (props) => {
  const dispatch = useDispatch();

  /** STATE VARIABLES AND STATE SETTING FUNCTIONS */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  /** HANDLERS */
  useEffect(() => {
    if (error) {
      Alert.alert('An error occured!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    }
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(action);
      if (!isSignup) {
        props.navigation.navigate('My trips');
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}>
      <View style={styles.authContainer}>
        <ScrollView>
          <View style={{marginBottom: 20, alignItems: 'center'}}>
            <Image
              style={{width: 200, height: 200, resizeMode: 'stretch'}}
              source={require('../../Assets/Images/logo.png')}
            />
          </View>
          <Input
            style={[styles.input]}
            id="email"
            label="E-Mail"
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
          <View style={styles.actionsContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <TouchableOpacity
                style={[styles.buttonContainer, {marginRight: 10}]}
                onPress={authHandler}>
                <Text style={styles.buttonText}>
                  {isSignup ? 'Sign Up' : 'Login'}
                </Text>
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                setIsSignup((prevState) => !prevState);
                // props.navigation.navigate("My trips");
              }}>
              <Text style={styles.buttonText}>
                {isSignup ? 'Login' : 'Sign up'}
              </Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export const authScreenOptions = {
  headerShown: false,
  //headerTitle: 'Authenticate',
};

/** export const authScreenOptions = (navData) => {
  return {
    headerRight: (props) => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create a trip"
          style={{marginRight: 3}}
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('Create a trip');
          }}
        />
      </HeaderButtons>
    ),
  };
};
*/
export default AuthScreen;
