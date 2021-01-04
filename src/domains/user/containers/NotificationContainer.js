import React, { useState, useCallback, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { notificationManager } from 'services/manageNotifications';
import { styles } from './NotificationContainerStyle';
import Colors from 'constants/Colors';

const NotificationContainer = (props) => {
  const localNotify = notificationManager;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.itemlessContainer}>
        <Text style={[styles.text, styles.itemlessText, styles.marginTop]}>
          Tired of Travellan's notifications?
        </Text>

        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.action, styles.callToAction]}>
            Delete all scheduled notifications
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NotificationContainer;
