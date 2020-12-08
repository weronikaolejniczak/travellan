import React, {useEffect, useState} from 'react';

import {
  View,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {useDispatch} from 'react-redux';
import {StartupScreenStyle as styles} from './StartupScreenStyle';
import Colors from 'constants/Colors';

import * as authActions from 'state/user/userActions';


const StartupScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      const {token, userId, expiryDate} = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }

      props.navigation.navigate('My trips')
      dispatch(authActions.authenticate(userId, token));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.screen}>
      <View style={styles.authContainer}>
        <ScrollView>
          <View style={{marginBottom: 20, alignItems: 'center'}}>
            <Image
              style={{width: 150, height: 150, resizeMode: 'stretch'}}
              source={require('assets/images/logo.png')}
            />
          </View>
          <View style={styles.actionsContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <TouchableOpacity
                style={[styles.buttonContainer, {marginRight: 10}]}
                onPress={() => {
                  props.navigation.navigate('Register');
                }}>
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Auth');
              }
              }>
              <Text style={styles.buttonText}>
                Have an account? Login instead
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export const StartupScreenOptions = {
  headerShown: false,
};

export default StartupScreen;
