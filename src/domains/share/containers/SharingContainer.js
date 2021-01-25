import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { styles } from './SharingContainerStyle';

const SharingContainer = (props) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.itemlessContainer}>
        <Text style={[styles.text, styles.itemlessText, styles.marginTop]}>
          Sharing
        </Text>
      </View>
    </ScrollView>
  );
};

export default SharingContainer;
