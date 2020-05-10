import React from 'react';
import {ScrollView, Text} from 'react-native';
/** IMPORTS FROM WITHIN THE MODULE */
import {weatherScreenStyle as styles} from './WeatherScreenStyle';

const WeatherScreen = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.text}>Weather</Text>
    </ScrollView>
  );
};

export default WeatherScreen;
