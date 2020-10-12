import React, {useEffect} from 'react';

import {View, ActivityIndicator, AsyncStorage} from 'react-native';

import {useDispatch} from 'react-redux';
import {StartupScreenStyle as styles} from './StartupScreenStyle';
import Colors from 'constants/Colors';

import * as authActions from 'user/state/Actions';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

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
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.white} />
    </View>
  );
};

export const StartupScreenOptions = {
  headerShown: false,
  //headerTitle: 'Authenticate',
};

export default StartupScreen;
