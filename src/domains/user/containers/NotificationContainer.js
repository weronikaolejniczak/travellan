import React, { useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { notificationManager } from 'services/manageNotifications';
import { styles } from './NotificationContainerStyle';

const NotificationContainer = (props) => {
  const localNotify = notificationManager;

  const handleNotificationDeletion = () => {
    localNotify.configure();
    localNotify.cancelAllLocalNotification();
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.itemlessContainer}>
        <Text style={[styles.text, styles.itemlessText, styles.marginTop]}>
          Tired of Travellan's notifications?
        </Text>

        <TouchableOpacity
          onPress={() => {
            handleNotificationDeletion();
          }}
        >
          <Text style={[styles.action, styles.callToAction]}>
            Delete all scheduled notifications
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NotificationContainer;
