// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from 'react-native-push-notification';

class NotificationManager {
  configure = () => {
    /* PushNotification.createChannel({
      channelId: 'Weather', // (required)
      channelName: 'Weather',
      // (optional) See `soundName` parameter of `localNotification` function
      importance: 4,
      // (required)
      soundName: 'default', // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    });

    PushNotification.createChannel({
      channelId: 'Notes', // (required)
      channelName: 'Notes',
      // (optional) See `soundName` parameter of `localNotification` function
      importance: 4,
      // (required)
      soundName: 'default', // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    });

    PushNotification.createChannel({
      channelId: 'DepartureAlert', // (required)
      channelName: 'DepartureAlert',
      // (optional) See `soundName` parameter of `localNotification` function
      importance: 4,
      // (required)
      soundName: 'default', // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    });

    PushNotification.configure({
      onNotification: function (notification) {
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      requestPermissions: true,
    }); */
  };

  _buildAndroidNotifcation = (id, title, message, data = {}, options = {}) => {
    return {
      autoCancel: true,
      bigText: message || '',
      data: data,
      id: id,
      importance: options.importance || 'high',
      largeIcon: options.largeIcon || 'ic_launcher',
      priority: options.priority || 'high',
      smallIcon: options.smallIcon || 'ic_launcher',
      subText: title || '',
      vibrate: options.vibrate || false,
      vibration: options.vibration || 300,
    };
  };

  showNotification = (
    _channelId,
    _id,
    _title,
    _message,
    _data = {},
    _options = {},
  ) => {
    /*  PushNotification.localNotification({
      channelId,
      data,
      id,
      message,
      options,
      title,
    }); */
  };

  scheduleNotification = (
    _channelId,
    _id,
    _title,
    _message,
    _data = {},
    _options = {},
    _date,
  ) => {
    /* PushNotification.localNotificationSchedule({
      channelId,
      data,
      date,
      id,
      message,
      options,
      title,
    }); */
  };

  cancelAllLocalNotification = () => {
    /* PushNotification.cancelAllLocalNotifications(); */
  };

  cancelScheduledLocalNotification = (id) => {
    const _cancelId = id;
    /* PushNotification.cancelLocalNotifications({ id: cancelId }); */
  };

  unregister = () => {
    /* PushNotification.unregister(); */
  };
}

const notificationManager = new NotificationManager();

export default notificationManager;
