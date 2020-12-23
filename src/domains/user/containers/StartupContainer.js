import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as userActions from 'actions/userActions';
import { styles } from './StartupContainerStyle';
import Colors from 'constants/Colors';

const StartupContainer = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        return props.navigation.navigate('Auth');
      }

      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        return props.navigation.navigate('Auth');
      }

      props.navigation.navigate('My trips');
      dispatch(userActions.authenticate(userId, token));
    };

    tryLogin();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.screen}
    >
      <View style={styles.authContainer}>
        <ScrollView>
          <View style={{ marginBottom: 20, alignItems: 'center' }}>
            <Image
              style={{ width: 150, height: 150, resizeMode: 'stretch' }}
              source={require('assets/images/logo.png')}
            />
          </View>
          <View style={styles.actionsContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <TouchableOpacity
                style={[styles.buttonContainer, { marginRight: 10 }]}
                onPress={() => {
                  props.navigation.navigate('Register');
                }}
              >
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Auth');
              }}
            >
              <Text style={styles.buttonText}>Have an account? Log in!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export const startupOptions = {
  headerShown: false,
};

export default StartupContainer;
