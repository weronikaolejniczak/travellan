import React, { useEffect } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Snackbar from 'react-native-snackbar';
import { notificationManager } from 'services';
import { styles } from './NotificationContainerStyle';

const NotificationContainer = (_props) => {
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
          onPress: () => {
            localNotify.configure();
            localNotify.cancelAllLocalNotification();
            Snackbar.show({
              action: {
                text: 'Ok',
                textColor: 'orange',
              },
              duration: Snackbar.LENGTH_LONG,
              text: 'You have deleted all scheduled notifications!',
            });
          },
          text: 'OK',
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
