import PushNotification from 'react-native-push-notification'
import {Platform} from 'react-native'

class NotificationManger {
    configure = () => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("[NotificationManger]onRegister token:", token);
              },
              onNotification: function (notification) {
                console.log("[NotificationManger]onNotification:", notification);
            
                // process the notification
            
                // (required) Called when a remote is received or opened, or local notification is opened
                notification.finish(PushNotificationIOS.FetchResult.NoData);
              },
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

    showNotification = (id, title, message, data = {}, options ={}) => {
        PushNotification.localNotification({
            ...this._buildAndroidNotifcation(id, title, message,data,options),
        })
    }

    cancelAllLocalNotification = () => {
        PushNotification.cancelAllLocalNotifications()
    }

    unregister = () => {
        PushNotification.unregister();
    }
}