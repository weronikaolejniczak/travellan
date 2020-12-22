import Colors from 'constants/Colors';
import React from 'react';
import styles from './LoadingFrameStyle';
import { ActivityIndicator, View } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default Loading;
