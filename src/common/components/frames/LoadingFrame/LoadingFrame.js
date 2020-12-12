import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import Colors from 'constants/Colors';
import {styles} from './LoadingFrameStyle';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default Loading;
