import React, { useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { notificationManager } from 'services/manageNotifications';
import { styles } from './NotificationContainerStyle';
import Snackbar from 'react-native-snackbar';

const NotificationContainer = (props) => {
  const localNotify = notificationManager;

  const handleNotificationDeletion = () => {
    Alert.alert(
      'Delete notifications',
      'Are you sure to delete all your scheduled notifications?',
      [
        {
          style: 'cancel',
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            localNotify.configure();
            localNotify.cancelAllLocalNotification();
            Snackbar.show({
              text: 'You have deleted all scheduled notifications!',
              duration: Snackbar.LENGTH_LONG,
              action: {
                text: 'Ok',
                textColor: 'orange',
              },
            });
          },
        },
      ],
      { cancelable: true },
    );
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

        <TouchableOpacity onPress={() => handleNotificationDeletion()}>
          <Text style={[styles.action, styles.callToAction]}>
            Delete all scheduled notifications
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NotificationContainer;
