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

import { notificationManager } from 'services/manageNotifications';
import { styles } from './NotificationContainerStyle';
import Colors from 'constants/Colors';

const NotificationContainer = (props) => {
  return (
    <ScrollView style={styles.container}>
      <Text>fds</Text>
    </ScrollView>
  );
};

export default NotificationContainer;
