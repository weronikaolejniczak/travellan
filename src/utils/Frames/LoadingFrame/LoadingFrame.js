import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import Colors from 'constants/Colors';
import { styles } from './LoadingFrameStyle';

const LoadingFrame = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default LoadingFrame;
