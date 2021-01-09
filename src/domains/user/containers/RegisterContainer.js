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
import { Formik } from 'formik';
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
        action = userActions.signUpRequest(values.email, values.password);
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
              <View style={styles.formControl}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  value={values.confirmPassword}
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={() => setFieldTouched('confirmPassword')}
                  secureTextEntry={true}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <View style={styles.errorContainer}>
                    <Text style={{ color: Colors.error }}>
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
