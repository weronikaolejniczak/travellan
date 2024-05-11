import React, { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Colors } from 'constants';
import { styles } from './LoadingFrameStyle';

const LoadingFrame = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
);

export default memo(LoadingFrame);
