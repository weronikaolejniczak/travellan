import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import {Platform} from 'react-native'

class NotificationManager {
    configure = () => {
        /* *************************CHANNELS FOR NOTIFICATIONS******************************** */
        PushNotification.createChannel(
            {
              channelId: "Weather", // (required)
              channelName: "Weather", // (required)
              soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
              importance: 4, // (optional) default: 4. Int value of the Android notification importance
              vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
          );

          PushNotification.createChannel(
            {
              channelId: "Notes", // (required)
              channelName: "Notes", // (required)
              soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
              importance: 4, // (optional) default: 4. Int value of the Android notification importance
              vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
          );

          PushNotification.createChannel(
            {
              channelId: "DepartureAlert", // (required)
              channelName: "DepartureAlert", // (required)
              soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
              importance: 4, // (optional) default: 4. Int value of the Android notification importance
              vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
          );
        /* ********************************************************************************************* */
        
        PushNotification.configure({
            onRegister: function (token) {
                //console.log("[NotificationManager]onRegister token:", token);
              },
              onNotification: function (notification) {
                //console.log("[NotificationManager]onNotification:", notification);
            
            
                // process the notification
                
                // (required) Called when a remote is received or opened, or local notification is opened
                notification.finish(PushNotificationIOS.FetchResult.NoData);
              },
              popInitialNotification: true,
              requestPermissions: true,
        })
    }
    
    _buildAndroidNotifcation = (id, title, message, data ={}, options= {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_launcher",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || false,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || 'high',
            data: data
        }
    }

    showNotification = (channelId, id, title, message, data = {}, options ={}) => {
        PushNotification.localNotification({channelId, id, title, message, data, options
        })
    }

    scheduleNotification = (channelId, id, title, message, data = {}, options ={}, date) => {
        PushNotification.localNotificationSchedule({channelId, id, title, message, data, options, date
        })
    }

    cancelAllLocalNotification = () => {
        PushNotification.cancelAllLocalNotifications()
    }

    unregister = () => {
        PushNotification.unregister();
    }
}

export const notificationManager = new NotificationManager()