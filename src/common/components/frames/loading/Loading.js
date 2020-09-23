import React from 'react';
import {View, ActivityIndicator} from 'react-native';
/* imports from within the module */
import Colors from 'constants/Colors';
import {loadingStyle as styles} from './LoadingStyle';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

export default Loading;
